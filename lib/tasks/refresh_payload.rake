# encoding: utf-8
require 'net/http'
require './config/environments'
require './models/tickerSymbol'
require './models/dataPayload'

desc 'Gather TickerSymbols, ping Yahoo Finance APi, temporarily store response'
task :refreshPayload do
  def assemble_symbols(type)
    if type == 'All' || type.nil?
      @ticker_list = TickerSymbol.all
    else
      @ticker_list = TickerSymbol.where(symbolType: type)
    end

    @ticker_list
  end

  def build_url(tickers)
    # build list of tickers
    # should be < 100 and of type 'Stock'
    i = 0
    s = []
    @ticker_list = tickers
    @ticker_list.each do |t|
      s.push(t.ticker)

      i += 1
      break if i > 100
    end

    base_query = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20'
    query_tail = '&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
    escaped_query = ERB::Util.url_encode(s.join(','))

    base_query + '(%22' + escaped_query + '%22)' + query_tail
  end

  def fetch
    @t = assemble_symbols('Stock')

    resp = Net::HTTP.get_response(URI.parse(build_url(@t)))
    response = JSON.parse(resp.body)

    puts response
    @payload = DataPayload.create(payload: response)
  end

  fetch
end
