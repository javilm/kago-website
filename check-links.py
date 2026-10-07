#!/usr/bin/env python3
"""check-links.py - checks every link in the built site, public/.

For every page in public/, every href and src that stays on the site
(relative, or starting with / or https://kago.tools/) must lead to a
file in public/, and a link with #name must lead to an element with
that id (or name) in the page it points to. A link from an /en/ page to
a /ja/ page, or the other way round, must be one meant to change
language: an <a> with a lang or hreflang attribute, or a
<link rel="alternate">.

Prints each problem as "page: link (what is wrong)" and a summary.
Exits 1 if there was any problem. Run by "make check".
"""
import os, sys
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit, unquote

ROOT = sys.argv[1] if len(sys.argv) > 1 else "public"
SITE = "https://kago.tools"

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links, self.ids = [], set()
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        for k in ("id", "name"):
            if a.get(k): self.ids.add(a[k])
        for k in ("href", "src"):
            if a.get(k) is not None:
                switch = (tag == "a" and ("lang" in a or "hreflang" in a)) or \
                         (tag == "link" and a.get("rel") == "alternate")
                self.links.append((a[k], switch))

def file_for(path):
    """The file in public/ for a site path, or None. A directory without
    the final / counts too ("/download"): the web server answers it
    with a move to "/download/", as nginx and hugo server both do."""
    f = os.path.join(ROOT, unquote(path).lstrip("/"))
    if os.path.isdir(f): f = os.path.join(f, "index.html")
    return f if os.path.isfile(f) else None

def lang(path):
    p = path.lstrip("/").split("/", 1)[0]
    return p if p in ("en", "ja") else None

pages, problems, count = {}, [], 0
for d, _, files in os.walk(ROOT):
    for n in files:
        if n.endswith(".html"):
            f = os.path.join(d, n)
            p = Page(); p.feed(open(f, encoding="utf-8").read())
            pages[os.path.relpath(f, ROOT)] = p

if not pages:
    sys.exit(f"no pages in {ROOT}: run make first")

def ids_of(f):
    return pages[os.path.relpath(f, ROOT)].ids

for name, p in sorted(pages.items()):
    base = "/" + name.replace(os.sep, "/")
    for link, switch in p.links:
        if link.startswith(SITE): link = link[len(SITE):] or "/"
        u = urlsplit(urljoin(base, link))
        if u.scheme or u.netloc: continue          # another site, mailto:
        count += 1
        f = file_for(u.path) if u.path else os.path.join(ROOT, name)
        if not f:
            problems.append(f"{name}: {link} (no such file)"); continue
        if u.fragment and f.endswith(".html") and unquote(u.fragment) not in ids_of(f):
            problems.append(f"{name}: {link} (no #{u.fragment} in that page)")
        a, b = lang(base), lang(u.path or base)
        if a and b and a != b and not switch:
            problems.append(f"{name}: {link} (leads to the other language)")

for line in problems: print(line)
print(f"{len(pages)} pages, {count} links, {len(problems)} problems")
sys.exit(1 if problems else 0)
