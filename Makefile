OUTPUT=build
JEKYLL=$(OUTPUT)/jekyll
JEKYLL_DEV=$(OUTPUT)/jekyll-dev
DIST=$(OUTPUT)/dist

.PHONY: $(DIST) $(JEKYLL) clean dev-jekyll dev-webpack

$(DIST): build $(JEKYLL)
	cd _js; JEKYLL_OUTPUT=$(realpath $(JEKYLL)) yarn build
	[ ! -d $(DIST) ] || rm -r $(DIST)
	mv _js/dist $(DIST)

$(JEKYLL): build
	-rm -r $(JEKYLL)
	JEKYLL_ENV=production bundle exec jekyll build -d $(JEKYLL)

$(JEKYLL_DEV): build
	bundle exec jekyll build -d $(JEKYLL_DEV)

build:
	mkdir build

clean:
	-rm -r $(OUTPUT)

dev-jekyll:
	bundle exec jekyll build -w -d $(JEKYLL_DEV)

dev-webpack: $(JEKYLL_DEV)
	cd _js; JEKYLL_OUTPUT=$(realpath $(JEKYLL_DEV)) yarn dev
