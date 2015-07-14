require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/base'
require '../config/environments'
require '../models/tickerSymbol'

# for each symbolType === Index || ETF
# get 1yr daily historical data
# OHLC + volume
# calc averages and store in the db

# for each symbolType === Stock
# get daily data
# OHLC + volume
# avg volume, 52wk high/low