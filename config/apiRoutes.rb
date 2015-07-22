require 'sinatra/base'
# require 'sinatra/contrib/all'

module Sinatra
  module ApiRoutes
    def self.registered( app )

      # app.get '/ticker' do
      #   erb :ticker
      # end


      ## TICKER
      #get all the Tickers
      app.get '/tickers' do
        content_type :json

        @tickers = TickerSymbol.all
        @tickers.to_json
      end


    end
  end
  register ApiRoutes
end
