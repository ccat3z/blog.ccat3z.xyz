NPM=pnpm

BUILD_OUTPUT=dist
PUBLIC_DIR=$(error PUBLIC_DIR is not set)

.PHONY: all
all: $(BUILD_OUTPUT)
$(BUILD_OUTPUT): build

# npm scripts
.PHONY: build start test
start test: %:
	$(NPM) run $@
build:
	BUILD_OUTPUT=$(CURDIR)/$(BUILD_OUTPUT) $(NPM) run $@

# misc
.PHONY: install-dependencies clean
install-dependencies:
	$(NPM) install

clean:
	-rm -rf $(BUILD_OUTPUT)