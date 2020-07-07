BUILD_OUTPUT_DIR=build

#############
#           #
#   build   #
#           #
#############

JEKYLL_DIST_DIR=$(BUILD_OUTPUT_DIR)/jekyll
SITE_DIST_DIR=$(BUILD_OUTPUT_DIR)/dist

.PHONY: $(SITE_DIST_DIR)
$(SITE_DIST_DIR): $(JEKYLL_DIST_DIR) | $(BUILD_OUTPUT_DIR)
	cd _js; JEKYLL_OUTPUT=$(realpath $(JEKYLL_DIST_DIR)) yarn build
	[ ! -d "$(SITE_DIST_DIR)" ] || rm -r $(SITE_DIST_DIR)
	mv _js/dist $(SITE_DIST_DIR)

.PHONY: $(JEKYLL_DIST_DIR)
$(JEKYLL_DIST_DIR): | $(BUILD_OUTPUT_DIR)
	[ ! -d "$(JEKYLL_DIST_DIR)" ] || rm -r $(JEKYLL_DIST_DIR)
	JEKYLL_ENV=production bundle exec jekyll build -d $(JEKYLL_DIST_DIR)

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

.PHONY: install-ruby-dependecies
install-ruby-dependecies:
	bundle install

.PHONY: watch-jekyll
watch-jekyll: | $(BUILD_OUTPUT_DIR)
	bundle exec jekyll s -w -d $(JEKYLL_DEV_SERVER_DIR)

.PHONY: watch-js
watch-js: | $(BUILD_OUTPUT_DIR)
	[ -d "$(JEKYLL_DEV_SERVER_DIR)" ] || { echo -e "\033[31mrun \`make watch-jekyll\` first\033[0m"; exit 1; }
	cd _js; JEKYLL_OUTPUT=$(realpath $(JEKYLL_DEV_SERVER_DIR)) yarn dev