JEKYLL=bundle exec jekyll

BUILD_OUTPUT_DIR=$(CURDIR)/build
PRODUCTION_DIST_DIR=$(BUILD_OUTPUT_DIR)/site
DEVELOPMENT_SERVER_DIR=$(BUILD_OUTPUT_DIR)/jekyll-dev
CONTENT_SOURCE_DIR=$(error CONTENT_SOURCE_DIR is not set)

all: $(PRODUCTION_DIST_DIR)

$(BUILD_OUTPUT_DIR):
	mkdir -p "$(BUILD_OUTPUT_DIR)"

.PHONY: clean
clean:
	-rm -r "$(BUILD_OUTPUT_DIR)"

.PHONY: install-dependecies
install-dependecies:
	bundle install

.PHONY: $(PRODUCTION_DIST_DIR)
$(PRODUCTION_DIST_DIR): | $(BUILD_OUTPUT_DIR)
	JEKYLL_ENV=production $(JEKYLL) build -s "$(CONTENT_SOURCE_DIR)" -d "$(PRODUCTION_DIST_DIR)"

.PHONY: watch
watch: | $(BUILD_OUTPUT_DIR)
	JEKYLL_ENV=development $(JEKYLL) build -w -s "$(CONTENT_SOURCE_DIR)" -d "$(DEVELOPMENT_SERVER_DIR)"