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

signed: node_modules
	rm -f grafana-stacked-gantt-panel-signed.zip
	docker run -e GRAFANA_ACCESS_POLICY_TOKEN --rm -v $(shell pwd):/src --user $(shell id -u) --entrypoint /bin/bash node:22 -c 'corepack enable --install-directory /tmp && /tmp/yarn --cwd /src build && cd /src && npx @grafana/sign-plugin@latest --rootUrls $(GRAFANA_PLUGIN_ROOT_URLS)'
	mv dist grafana-stacked-gantt-panel
	zip grafana-stacked-gantt-panel-signed.zip grafana-stacked-gantt-panel -r
	rm -rf grafana-stacked-gantt-panel coverage
