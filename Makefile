all: build run

build:
	sudo docker build -t adg-fe container

run:
	sudo docker run -p 80:80 -p 8000:8000 -v ${PWD}:/opt/adagios-frontend -d -t adg-fe bash
