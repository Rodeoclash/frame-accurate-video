.PHONY: bash-app bash-app-root setup

bash-app:
	docker-compose run --rm app bash

bash-app-root:
	docker-compose run --user=root:root --rm app bash

setup:
	docker-compose run --user=root:root --rm app mkdir -p /home/server; \
	docker-compose run --user=root:root --rm app chown -R 1000:1000 /home/server; \
