all: build daemon

clean: kill remove

build:
	sudo docker build -t adg-fe .

rebuild:
	sudo docker build --no-cache -t adg-fe .

interactive:
	sudo docker run -p 8888:8888 --link surveil_surveil_1:surveil -v ${PWD}:/opt/adagios-frontend -i -t --name adg-fe adg-fe bash

daemon:
	sudo docker run -p 8888:8888 --link surveil_surveil_1:surveil -v ${PWD}:/opt/adagios-frontend -d -t --name adg-fe adg-fe
	grunt watch

kill:
	sudo docker kill adg-fe

remove:
	sudo docker rm adg-fe
