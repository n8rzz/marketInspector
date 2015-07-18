require 'bundler'
Bundler.require

require 'sinatra/base'
require 'active_record'
require 'sinatra/activerecord'

require './config/environments'
require './models/tickerSymbol'
require './models/dataPayload'


class MarketInspector < Sinatra::Application
    register Sinatra::ActiveRecordExtension

    get '/' do
      erb :index
    end


    ## PAYLOAD
    # get data payload
    get '/payload' do
        content_type :json

        @payload = DataPayload.last()
        @payload.to_json
    end


    ## TICKER
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


    # run! if app_file = $0
end
