FROM ubuntu:trusty
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs npm nodejs-legacy

ENV APP_HOME /frontend
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME
RUN chown -R root:root $APP_HOME

ADD . $APP_HOME/

ENV NODE_ENV production
ENV NODE_PATH $APP_HOME/node_modules
RUN npm install --production