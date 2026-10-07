# kago.tools

The website of KAGO and UNKAGO, the archivers for MSX-DOS2 that create
and extract ZIP, LZH and PMA archives: https://kago.tools. A static
site built with Hugo, in English (`/en/`) and Japanese (`/ja/`).

## Requirements

Hugo 0.167.0 extended. Older versions may not build it: the
configuration uses `label`, `hugo.Sites` and `hugo.Data`.

## Building

    make            build the site into public/
    make serve      preview at http://localhost:1313
    make check      check every link in the built site
    make image      build the Docker image and push it to the registry
    make manual     copy the English manual in from the Tsuzura repository

`public/` is what the Docker image serves. Run `make` before
`make image`, so that `public/` holds the current build.
`make serve` keeps its pages in memory and does not touch `public/`.

`make image` puts `public/` as it stands into an nginx image
(`Dockerfile`, `nginx.conf`), for amd64 and arm64, and pushes it to
the registry as `kago-tools:1`. It does not run Hugo.

## A new release

The version and the sizes of the two programs are set once, in
`hugo.toml`: `params.version`, `params.kagoSize` and
`params.unkagoSize` (in bytes). The Download page links to
`kago.com` and `unkago.com` in the GitHub release of that version, so
the release must be published, with those two files, before the site
is. Every banner in the terminal sessions shows the same version.

Then:

1. `make manual` copies `repo/MANUAL.md` from the Tsuzura project into
   `content/en/manual.md`.
2. The Japanese manual, `content/ja/manual.md`, is translated by hand
   from the same file: bring it into line with whatever changed.
3. If the tools print something differently, change the sessions in
   `data/sessions.yaml` to match.

## The manual

The manual is one page per language, its sections listed beside it
(`layouts/_default/manual.html`). `make manual` takes `MANUAL.md`
less its title line, which the front matter gives, and turns each
code block that starts with an MSX-DOS prompt (`A>`) into a session,
shown as an MSX-DOS2 screen.

## The terminal sessions

`data/sessions.yaml` holds the MSX-DOS2 sessions: what each command
prints, less the banner, which the templates add to every command
without `/Q`, as the tools do. The home page's hero plays the sessions
marked `hero: true`, typing each command and printing its output
(`static/js/hero.js`); the Examples page shows every session whole.
Each session's title, caption and description are in both languages;
the output is the same in both, because it is what the MSX prints.

## Layout

    hugo.toml           site settings, languages, menus, version, sizes
    content/en, ja      page text: home, Download, Examples, Manual
    data/sessions.yaml  the MSX-DOS2 sessions of the hero and Examples
    layouts/            page templates, partials, shortcodes
    i18n/               interface strings for each language
    assets/img/         the mark (a plain weave), inlined into pages
    static/             CSS, the hero's script, images, favicon, and
                        the previews for shared links (img/preview-*.jpg)
    public/             the built site

## Missing pages

Hugo writes a "page not found" page for each language:
`public/en/404.html` and `public/ja/404.html`. The web server should
send `/ja/404.html` for a missing address under `/ja/`, and
`/en/404.html` for any other, with status 404. `make serve` does this
already (`server.redirects` in `hugo.toml`), and `nginx.conf` does it
in the Docker image.

`/`, `/download/`, `/examples/` and `/manual/` lead to the English or
Japanese page by the browser's first language.

## Analytics

Every page loads Plausible from `analytics.lavnet.org`
(`layouts/partials/plausible.html`), except the four pages above that
only lead elsewhere.

## History

See [CHANGELOG.md](CHANGELOG.md).
