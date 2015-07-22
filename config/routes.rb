# encoding: utf-8

require 'sinatra/base'
require 'sinatra/contrib/all'

module Sinatra
  module Routes
    def self.registered(app)
      app.get '/' do
        erb :index
      end

      ## PAYLOAD
      # get data payload
      app.get '/payload' do
        content_type :json

        @payload = DataPayload.last
        @payload.to_json
      end

      ## TICKER
      # get all the Tickers
      app.get '/tickers' do
        content_type :json

        @tickers = TickerSymbol.all
        if @tickers
          status 200
          @tickers.to_json
        else
          halt 404
        end
      end

      # add a new ticker
      app.post '/tickers/add' do
        content_type :json

        @ticker = TickerSymbol.new(params)

        if @ticker.save
          @ticker.to_json
        else
          halt 500
        end
      end

      # get a single ticker
      app.get '/tickers/:id' do
        content_type :json

        @ticker = TickerSymbol.find_by_id(params[:id])

        if @ticker
          @ticker.to_json
        else
          halt 404
        end
      end

      # update a single ticker
      app.put '/tickers/:id' do
        content_type :json

        @ticker = TickerSymbol.find_by_id(params[:id])
        @ticker.update(params)

        if @ticker.save
          @ticker.to_json
        else
          halt 500
        end
      end

      # delete a single ticker
      app.delete '/tickers/:id' do
        content_type :json

        @ticker = TickerSymbol.find_by_id(params[:id].to_i)
        if @ticker.destroy
          { success: 'success' }.to_json
        else
          halt 500
        end
      end
    end
  end
  register Routes
end
