JEKYLL=bundle exec jekyll

PRODUCTION_BUILD_OUTPUT=dist
DEVELOPMENT_BUILD_OUTPUT=build
CONTENT_SOURCE_DIR=$(error CONTENT_SOURCE_DIR is not set)

all: $(PRODUCTION_BUILD_OUTPUT)

# prod build
.PHONY: $(PRODUCTION_BUILD_OUTPUT)
$(PRODUCTION_BUILD_OUTPUT):
	mkdir -p '$@'
	JEKYLL_ENV=production $(JEKYLL) build -s "$(CONTENT_SOURCE_DIR)" -d "$@"

# dev build
.PHONY: watch $(DEVELOPMENT_BUILD_OUTPUT)
watch: $(DEVELOPMENT_BUILD_OUTPUT)
$(DEVELOPMENT_BUILD_OUTPUT):
	mkdir -p '$@'
	JEKYLL_ENV=development $(JEKYLL) build -w -s "$(CONTENT_SOURCE_DIR)" -d "$@"

# misc
.PHONY: clean
clean:
	-rm -r "$(PRODUCTION_BUILD_OUTPUT)"
	-rm -r "$(DEVELOPMENT_BUILD_OUTPUT)"

.PHONY: install-dependencies
install-dependencies:
	bundle install