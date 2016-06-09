FROM ruby:2.3.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir -p /backend
RUN chown -R root:root /backend
ADD Gemfile /backend/Gemfile
ADD Gemfile.lock /backend/Gemfile.lock
WORKDIR /backend
ENV RAILS_ENV production
ENV RACK_ENV production
RUN bundle install --without development test
ADD . /backend
CMD bundle exec puma -C config/puma.rb