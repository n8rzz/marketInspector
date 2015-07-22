# encoding: utf-8
require 'bundler'
Bundler.require

require 'sinatra/base'
require 'sinatra/contrib/all'
require 'active_record'
require 'sinatra/activerecord'
require './config/environments'
require_relative 'config/routes'

Dir[File.dirname(__FILE__) + '/models/*.rb'].each { |file| require file }

class MarketInspector < Sinatra::Application
  register Sinatra::ActiveRecordExtension
  register Sinatra::Contrib
  register Sinatra::Routes

  after do
    ActiveRecord::Base.connection.close
  end
end
