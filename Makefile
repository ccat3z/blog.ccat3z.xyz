BUILD_OUTPUT_DIR=$(CURDIR)/_build
SITE_SOURCE_DIR=$(CURDIR)
JEKYLL_BUILDER_DIR=$(CURDIR)/_jekyll
JS_LIBRARY_SOURCE_DIR=$(CURDIR)/_js

#############
#           #
#   build   #
#           #
#############

JEKYLL_DIST_DIR=$(BUILD_OUTPUT_DIR)/jekyll
SITE_DIST_DIR=$(BUILD_OUTPUT_DIR)/site

.PHONY: $(SITE_DIST_DIR)
$(SITE_DIST_DIR): $(JEKYLL_DIST_DIR) | $(BUILD_OUTPUT_DIR)
	cd $(JS_LIBRARY_SOURCE_DIR); PUBLIC_DIR=$(realpath $(JEKYLL_DIST_DIR)) pnpm run build
	[ ! -d "$(SITE_DIST_DIR)" ] || rm -r $(SITE_DIST_DIR)
	mv $(JS_LIBRARY_SOURCE_DIR)/build $(SITE_DIST_DIR)

.PHONY: $(JEKYLL_DIST_DIR)
$(JEKYLL_DIST_DIR): | $(BUILD_OUTPUT_DIR)
	[ ! -d "$(JEKYLL_DIST_DIR)" ] || rm -r $(JEKYLL_DIST_DIR)
	cd $(JEKYLL_BUILDER_DIR); JEKYLL_ENV=production bundle exec jekyll build -s $(SITE_SOURCE_DIR) -d $(JEKYLL_DIST_DIR)

$(BUILD_OUTPUT_DIR):
	mkdir -p $(BUILD_OUTPUT_DIR)

###############
#             #
#   cleanup   #
#             #
###############

.PHONY: clean
clean:
	-rm -r $(BUILD_OUTPUT_DIR)

##################
#                #
#   dev server   #
#                #
##################

JEKYLL_DEV_SERVER_DIR=$(BUILD_OUTPUT_DIR)/jekyll-dev

.PHONY: install-dependecies
install-dependecies:
	cd $(JEKYLL_BUILDER_DIR); bundle install
	cd $(JS_LIBRARY_SOURCE_DIR); yarn install

.PHONY: watch-jekyll
watch-jekyll: | $(BUILD_OUTPUT_DIR)
	cd $(JEKYLL_BUILDER_DIR); JEKYLL_ENV=development bundle exec jekyll serve -w -s $(SITE_SOURCE_DIR) -d $(JEKYLL_DEV_SERVER_DIR)

.PHONY: $(JEKYLL_DEV_SERVER_DIR)
$(JEKYLL_DEV_SERVER_DIR): | $(BUILD_OUTPUT_DIR)
	cd $(JEKYLL_BUILDER_DIR); JEKYLL_ENV=development bundle exec jekyll build -s $(SITE_SOURCE_DIR) -d $(JEKYLL_DEV_SERVER_DIR)

.PHONY: watch-js
watch-js: $(JEKYLL_DEV_SERVER_DIR) | $(BUILD_OUTPUT_DIR)
	cd $(JS_LIBRARY_SOURCE_DIR); PUBLIC_DIR=$(realpath $(JEKYLL_DEV_SERVER_DIR)) pnpm run start