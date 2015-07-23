# encoding: utf-8
source 'https://rubygems.org'
ruby '2.2.0'

gem 'sinatra', '1.3.6' # , require: 'sinatra/base'
gem 'sinatra-contrib', '1.3.1'
gem 'activerecord', '4.2.3'
gem 'sinatra-activerecord', '2.0.6'
gem 'pg', '0.18.2'
gem 'rake', '10.4.2'
gem 'rack-test'
gem 'rspec', '3.3.0'

group :development do
  gem 'guard', '2.12.8'
  gem 'guard-bundler', '2.1.0'
  gem 'guard-rspec', '4.6.2'
  gem 'shotgun', '0.9.1'
  gem 'rubocop', '0.32.1', require: false
end

group :test do
  gem 'factory_girl', '~> 4.5.0'
  gem 'shoulda-matchers', '2.8.0', require: false
  gem 'database_cleaner', '1.4.1', :git => 'git://github.com/bmabey/database_cleaner.git'
  gem 'faker', '1.4.3'
end
