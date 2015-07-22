require 'sinatra/base'

module Sinatra
  module ApiRoutes
    def self.registered( app )

      app.get '/ticker' do
        erb :ticker
      end

    end
  end
  register ApiRoutes
end