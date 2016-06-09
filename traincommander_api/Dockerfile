FROM ruby:2.3.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir -p /backend
RUN chown -R root:root /backend
ADD Gemfile /backend/Gemfile
ADD Gemfile.lock /backend/Gemfile.lock
RUN bundle install --without development test
ENV RAILS_ENV production
ENV RACK_ENV production
ADD . /backend
CMD bundle exec puma -C config/puma.rb