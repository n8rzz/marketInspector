require './app'
require 'sinatra'
require 'rspec'
require 'rack/test'

require File.expand_path '../../app.rb', __FILE__

ENV['RACK_ENV'] = 'test'

module RSpecMixin
  include Rack::Test::Methods
  def app() MarketInspector end
end

RSpec.configure do |config|
  config.include RSpecMixin

  # Use color in STDOUT
  config.color = true

  # Use color not only in STDOUT but also in pagers and files
  # config.tty = true

  # Use the specified formatter
  # config.formatter = :documentation # :progress, :html, :textmate

  config.order = "random"

end
