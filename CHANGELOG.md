# Changelog

## 2026-10-07 — First version

- Hugo project with English (`/en/`) and Japanese (`/ja/`) pages, on
  the layout of tatara.tools: the same hero (MSX logo, version, heading,
  lead, buttons), header, footer and light/dark button.
- Bamboo colours, light and dark; the hero's background picture; the
  MSX logo with a glow, to stand out from the picture.
- The mark: a plain weave, as in a basket, in the header, on the program
  cards and as the favicon.
- Home page: an animated MSX-DOS2 screen in the hero that plays six
  sessions of KAGO and UNKAGO, in ZIP, LZH and PMA, one after another;
  a band with the three formats ("one tool, all three formats"); the
  two programs; what they can do; requirements; the name.
- Examples page: twelve sessions with the full output of every command.
- Manual on one page per language, its contents beside it: the English
  copied from the Tsuzura repository by `make manual`, the Japanese
  translated from it.
- Download page: `KAGO.COM` and `UNKAGO.COM` from the GitHub release of
  v1.0.1, with their sizes, and how to install them.
- "Page not found" in each language; `/`, `/download/`, `/examples/`
  and `/manual/` follow the browser's language.
- A shared link shows a preview: title, description and a picture of
  the home page's hero, in the page's language (Open Graph);
  `robots.txt` and the sitemap; the home pages describe the tools for
  search engines (schema.org).
- Plausible Analytics on every page.
- `make check` checks every link; `make image` builds the Docker image
  (`Dockerfile`, `nginx.conf`).
- README.md and CHANGELOG.md added.
