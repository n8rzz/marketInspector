# require 'sinatra'
# require 'sinatra/activerecord'
# require 'sinatra/base'
require 'bundler'
Bundler.require

require './config/environments'
require './models/tickerSymbol'
require './models/dataPayload'

# class MarketInspector < Sinatra::Base
    get '/' do
      "Hello World"
    end

    # get data payload
    get '/payload' do
        content_type :json

        @payload = DataPayload.all
        @payload.to_json
    end


    #get all the Tickers
    get '/tickers' do
        content_type :json

        @tickers = TickerSymbol.all
        @tickers.to_json
    end

    # add a new ticker
    post '/tickers/add' do
        content_type :json

        @ticker = TickerSymbol.new(params)

        if @ticker.save
            @ticker.to_json
        else
            halt 500
        end
    end

    # get a single ticker
    get '/tickers/:id' do
        content_type :json

        @ticker = TickerSymbol.find_by_id(params[:id])

        if @ticker
            @ticker.to_json
        else
            halt 404
        end
    end

    # update a single ticker
    put '/tickers/:id' do
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
    delete '/tickers/:id' do
        content_type :json

        @ticker = TickerSymbol.find_by_id(params[:id].to_i)
        if @ticker.destroy
            {:success => "success"}.to_json
        else
            halt 500
        end
    end



    after do
        ActiveRecord::Base.connection.close
    end

# end