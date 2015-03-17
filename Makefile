all: build daemon

clean: kill remove

build:
	sudo docker build -t adg-fe container

rebuild:
	sudo docker build --no-cache -t adg-fe container

interactive:
	sudo docker run -p 8080:8080 -v ${PWD}:/opt/adagios-frontend -i -t --name adg-fe adg-fe bash

daemon:
	sudo docker run -p 8080:8080 -v ${PWD}:/opt/adagios-frontend -d -t --name adg-fe adg-fe

kill:
	sudo docker kill adg-fe

remove:
	sudo docker rm adg-fe

