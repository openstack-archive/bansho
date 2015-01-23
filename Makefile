all: build daemon

clean: kill remove

build:
	sudo docker build -t adg-fe container

interactive:
	sudo docker run -p 80:80 -p 8000:8000 -v ${PWD}:/opt/adagios-frontend -i -t --name adg-fe adg-fe bash

daemon:
	sudo docker run -p 80:80 -p 8000:8000 -v ${PWD}:/opt/adagios-frontend -d -t --name adg-fe adg-fe

kill:
	sudo docker kill adg-fe

remove:
	sudo docker rm adg-fe

