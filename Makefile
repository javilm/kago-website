# Makefile - builds the kago.tools website.
#
#   make          build the site into public/
#   make serve    preview it at http://localhost:1313, rebuilt on every change
#   make check    check every link in the built site (check-links.py)
#   make image    build the Docker image and push it to the registry
#
#   make manual   copy the English manual in from the Tsuzura repository
#
# The copy lands in content/ and is kept in git, so the site builds
# without the rest of the project folder. It only ever copies into the
# site, never out of it.

# The project folder: website/kago.tools/repo is three levels down.
PROJECT := ../../..

.PHONY: build serve check image manual

build:
	hugo --cleanDestinationDir

serve:
	hugo server --renderToMemory

check:
	python3 check-links.py public

REGISTRY_HOST := 192.168.1.16:5000
IMAGE := kago-tools
TAG := 1

image:
	docker buildx build \
		--builder lavnet-builder \
		--platform linux/amd64,linux/arm64 \
		-t $(REGISTRY_HOST)/$(IMAGE):$(TAG) \
		--no-cache \
		--push \
		.

# The English manual: repo/MANUAL.md less its first line (the title,
# which the front matter gives), into content/en/manual.md. A code block
# whose first line is an MSX-DOS prompt (A>) becomes a session, shown as
# an MSX-DOS2 screen. The Japanese manual, content/ja/manual.md, is
# translated by hand from the same file.
manual:
	@test -f $(PROJECT)/repo/MANUAL.md || { echo "not found: MANUAL.md"; exit 1; }
	{ printf -- '---\ntitle: "KAGO and UNKAGO user%ss manual"\n' "'"; \
	  printf -- 'description: "The complete description of KAGO and UNKAGO: every switch, every format, every message."\n'; \
	  printf -- 'layout: "manual"\naliases: ["../../manual/"]\n---\n'; \
	  tail -n +2 $(PROJECT)/repo/MANUAL.md | awk \
	    'h { print ($$0 ~ /^A>/ ? "```session" : "```"); print; h = 0; next } \
	     /^```$$/ && !b { h = 1; b = 1; next } \
	     /^```$$/ && b { b = 0 } { print }'; \
	} > content/en/manual.md
