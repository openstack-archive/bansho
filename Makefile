all: build daemon

clean: kill remove

build:
	sudo docker build -t adg-fe .

rebuild:
	sudo docker build --no-cache -t adg-fe .

interactive:
	sudo docker run -p 8888:8888 --link surveil_surveil_1:surveil -v $(shell pwd)/app:/opt/adagios-frontend/dist -e BANSHO_ENV=false -i -t --name adg-fe adg-fe bash

daemon:
	sudo docker run -p 8888:8888 --link surveil_surveil_1:surveil -v $(shell pwd)/app:/opt/adagios-frontend/dist -e BANSHO_PROD=false -d -t --name adg-fe adg-fe
	grunt development:surveil

production:
	sudo docker run -p 8888:8888 --link surveil_surveil_1:surveil -d -t --name adg-fe adg-fe

kill:
	sudo docker kill adg-fe

remove:
	sudo docker rm -f adg-fe
