# docker-init
The initial studies about docker and docker images.

Using Python and Flask.
- python3 -m venv .venv
- venv is like a node_modules, the packages are installed only in this folder.
- source .venv/bin/activate
- to activate our venv, now our application will run with these packages
- python3 app.py
- pip is like the npm
- pip install flask

Docker
- create a DockerFile
- firstly, we catch an image using FROM
- if we search for python image, we will notice that have a lot of images, because there are tons of variants of python (different versions, for example)
- docker pull python:3.9-bullseye
- docker images | grep python
- your image was downloaded now
- docker works with subsequents commands
- FROM our-image
- WORKID /app is like: "this is our root directory, now we are here"
- to install the dependencies in python, we need a "package.json", and it is the freeze: 
- pip freeze > requirements.txt
- now we need to copy our requirements to our root with COPY
- RUN is the commands that docker will run, before our application
- EXPOSE port, ENV for envs
- COPY our app
- CMD is to start our application
- docker build -t name:tag .
- docker ps
- docker run name:tag
- docker run -d name:tag --------> background
- docker logs id
- docker logs id -f --------> real time
- docker exec to execute commands inside your docker container, you need the id first
- docker exec id ls /
- docker exec -it id bash to atach a terminal in your docker container