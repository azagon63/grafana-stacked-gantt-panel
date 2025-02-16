.PHONY: default
default: build

node_modules:
	docker run --rm -v $(shell pwd):/src --user $(shell id -u) --entrypoint /bin/bash node:22 -c 'corepack enable --install-directory /tmp && /tmp/yarn --cwd /src install'

build: node_modules
	rm -f grafana-stacked-gantt-panel.zip
	docker run --rm -v $(shell pwd):/src --user $(shell id -u) --entrypoint /bin/bash node:22 -c 'corepack enable --install-directory /tmp && /tmp/yarn --cwd /src build'
	mv dist grafana-stacked-gantt-panel
	zip grafana-stacked-gantt-panel.zip grafana-stacked-gantt-panel -r
	rm -rf grafana-stacked-gantt-panel coverage
