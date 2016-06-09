FROM ruby:2.3.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir -p /backend
RUN chown -R root:root /backend
ADD Gemfile /backend/Gemfile
ADD Gemfile.lock /backend/Gemfile.lock
WORKDIR /backend
ENV RAILS_ENV production
ENV RACK_ENV production
ENV SECRET_KEY_BASE="323k12jkdsds0d09s90d0s89dsa8d87s897d798as98a897d8as31lk23jlk12l31k23k1ljk3jl2k1"
RUN bundle install
ADD . /backend