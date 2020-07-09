NPM=pnpm
NPM_RUN=pnpm run
NPM_SCRIPTS=build start test

.PHONY: $(NPM_SCRIPTS) install-dependecies

all: build

install-dependecies:
	$(NPM) install

$(NPM_SCRIPTS): %:
	$(NPM_RUN) $@
