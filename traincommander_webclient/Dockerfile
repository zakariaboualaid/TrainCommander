FROM ubuntu:trusty
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs npm nodejs-legacy
RUN mkdir -p /frontend
RUN chown -R root:root /frontend
ADD . /frontend/
ENV NODE_ENV production
RUN npm install
CMD npm start
