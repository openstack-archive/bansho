all: build daemon

clean: kill remove

build:
	sudo docker build -t bansho .

rebuild:
	sudo docker build --no-cache -t bansho .

interactive:
	sudo docker run -p 8888:8888 --link surveil_surveil_1:surveil -v $(shell pwd)/app:/opt/bansho/dist -e BANSHO_ENV=false -i -t --name bansho bansho bash

daemon:
	sudo docker run -p 8888:8888 --link surveil_surveil_1:surveil -v $(shell pwd)/app:/opt/bansho/dist -e BANSHO_PROD=false -d -t --name bansho bansho
	grunt development:surveil

production:
	sudo docker run -p 8888:8888 --link surveil_surveil_1:surveil -d -t --name bansho bansho

kill:
	sudo docker kill bansho

remove:
	sudo docker rm -f bansho
