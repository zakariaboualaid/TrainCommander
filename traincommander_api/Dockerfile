FROM ruby:2.3.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

ENV APP_HOME /backend
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME
RUN chown -R root:root $APP_HOME

ADD Gemfile* $APP_HOME/

ENV RAILS_ENV production
ENV RACK_ENV production
ENV SECRET_KEY_BASE="323k12jkdsds0d09s90d0s89dsa8d87s897d798as98a897d8as31lk23jlk12l31k23k1ljk3jl2k1"

ENV BUNDLE_GEMFILE=$APP_HOME/Gemfile \
  BUNDLE_JOBS=2 \
  BUNDLE_PATH=/bundle

RUN bundle install
ADD . $APP_HOME