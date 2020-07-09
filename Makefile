###############
#             #
#   modules   #
#             #
###############

CONCURRENTLY=concurrently

###############
#             #
#   modules   #
#             #
###############

MODULE_JEKYLL=$(CURDIR)/jekyll
MODULE_JS_APP=$(CURDIR)/app
CONTENT_DIR=$(CURDIR)/content

MAKE_JEKYLL=$(MAKE) -C "$(MODULE_JEKYLL)"
MAKE_JS_APP=$(MAKE) -C "$(MODULE_JS_APP)"

################
#              #
#   settings   #
#              #
################

BUILD_OUTPUT_DIR=$(CURDIR)/build
SITE_DIST_DIR=$(BUILD_OUTPUT_DIR)/site
JS_APP_PUBLIC_DIR=$(BUILD_OUTPUT_DIR)/public
JS_APP_PUBLIC_DIR_DEVELOPMENT=$(BUILD_OUTPUT_DIR)/public-dev

#############
#           #
#   build   #
#           #
#############

.PHONY: $(SITE_DIST_DIR) $(JS_APP_PUBLIC_DIR)
$(SITE_DIST_DIR): $(JS_APP_PUBLIC_DIR) | $(BUILD_OUTPUT_DIR)
	$(MAKE_JS_APP) PUBLIC_DIR=$(JS_APP_PUBLIC_DIR) BUILD_OUTPUT=$(SITE_DIST_DIR) build
	@echo -e "\033[32mBuild successfully.\033[0m"
	@echo -e "Ouput dir: \033[34m$(SITE_DIST_DIR)\033[0m"

$(JS_APP_PUBLIC_DIR): | $(BUILD_OUTPUT_DIR)
	$(MAKE_JEKYLL) CONTENT_SOURCE_DIR=$(CONTENT_DIR) PRODUCTION_DIST_DIR=$(JS_APP_PUBLIC_DIR) $(JS_APP_PUBLIC_DIR)

##################
#                #
#   dev server   #
#                #
##################

.PHONY: watch
watch: | $(BUILD_OUTPUT_DIR) $(JS_APP_PUBLIC_DIR_DEVELOPMENT)
	$(CONCURRENTLY) -k \
		-n 'jekyll,node' \
		'$(MAKE_JEKYLL) CONTENT_SOURCE_DIR=$(CONTENT_DIR) DEVELOPMENT_SERVER_DIR=$(JS_APP_PUBLIC_DIR_DEVELOPMENT) watch' \
		'$(MAKE_JS_APP) PUBLIC_DIR=$(JS_APP_PUBLIC_DIR_DEVELOPMENT) start'

############
#          #
#   misc   #
#          #
############

$(BUILD_OUTPUT_DIR) $(JS_APP_PUBLIC_DIR_DEVELOPMENT): %:
	mkdir -p $@

.PHONY: clean
clean:
	-rm -r $(BUILD_OUTPUT_DIR)

.PHONY: install-dependecies
install-dependecies:
	$(MAKE_JS_APP) install-dependecies
	$(MAKE_JEKYLL) install-dependecies