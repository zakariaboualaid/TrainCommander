FROM ubuntu:trusty
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs npm nodejs-legacy
RUN mkdir /frontend
RUN chown -R root:root /frontend
WORKDIR /frontend/
ADD . /frontend/
RUN npm install