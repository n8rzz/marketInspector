require 'rubygems'
require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/base'
require 'net/http'
require './config/environments'
require './models/tickerSymbol'
require './models/dataPayload'

set :run, false

# for each symbolType === Index || ETF
# get 1yr daily historical data
# OHLC + volume
# calc averages and store in the db

# for each symbolType === Stock
# get daily data
# OHLC + volume
# avg volume, 52wk high/low

class RefreshPayload < ActiveRecord::Base
    def init
        # log action to refreshPayloadHistory
    end

    def RefreshPayload.buildURL
        # build list of tickers
        # should be < 100 and of type 'Stock'
        s = []
        @tickerList = TickerSymbol.where(symbolType: 'Stock')
        @tickerList.each do |t|
            s.push(t.ticker)
        end

        baseQuery = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20'
        queryTail = '&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
        escapedQuery = ERB::Util.url_encode(s.join(','))

        return baseQuery + '(%22' + escapedQuery + '%22)' + queryTail
    end

    def RefreshPayload.fetch()
        url = RefreshPayload.buildURL
        resp = Net::HTTP.get_response(URI.parse(url))
        data = resp.body
        response = JSON.parse(data)

        puts response
        @payload = DataPayload.create(:payload => response)

    end


    RefreshPayload.fetch()

end