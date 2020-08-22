CONCURRENTLY = concurrently
RSYNC				 = rsync

# settings
SITE_DIST_DIR = dist

# modules
MODULE_JEKYLL  = jekyll
MODULE_JS_APP  = app
MODULE_CONTENT = content

# dist build
all: $(SITE_DIST_DIR)

.PHONY: $(MODULE_JEKYLL)/dist
$(MODULE_JEKYLL)/dist:
	$(MAKE) -C $(MODULE_JEKYLL) CONTENT_SOURCE_DIR=$(CURDIR)/$(MODULE_CONTENT) dist

.PHONY: $(MODULE_JS_APP)/dist
$(MODULE_JS_APP)/dist: $(MODULE_JEKYLL)/dist
	$(MAKE) -C $(MODULE_JS_APP) PUBLIC_DIR=$(CURDIR)/$(MODULE_JEKYLL)/dist dist
	@echo -e "\033[32mBuild successfully.\033[0m"

$(SITE_DIST_DIR): $(MODULE_JS_APP)/dist
	rm -rf '$@'
	cp -R '$<' '$@'

# dev build
.PHONY: watch
watch:
	mkdir -p '$(CURDIR)/$(MODULE_JEKYLL)/build'
	$(CONCURRENTLY) -k \
		-n 'jekyll,js-app' \
		-c 'green,blue' \
		'$(MAKE) -C $(MODULE_JEKYLL) CONTENT_SOURCE_DIR=$(CURDIR)/$(MODULE_CONTENT) watch' \
		'$(MAKE) -C $(MODULE_JS_APP) PUBLIC_DIR=$(CURDIR)/$(MODULE_JEKYLL)/build start'

# misc
.PHONY: clean install-dependecies
clean:
	-rm -rf $(SITE_DIST_DIR)
	-$(MAKE) -C $(MODULE_JS_APP) clean
	-$(MAKE) -C $(MODULE_JEKYLL) clean

install-dependecies:
	$(MAKE) -C $(MODULE_JS_APP) install-dependecies
	$(MAKE) -C $(MODULE_JEKYLL) install-dependecies