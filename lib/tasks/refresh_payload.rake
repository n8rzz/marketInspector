require 'net/http'
require './config/environments'
require './models/tickerSymbol'
require './models/dataPayload'

desc "Gather TickerSymbols, assemble url parameters, ping Yahoo Finance APi, temporarily store JSON response"
task :refreshPayload do
    def assemble_symbols(type)
        if type == 'All' || type.nil?
            @tickerList = TickerSymbol.all
        else
            @tickerList = TickerSymbol.where(symbolType: type)
        end

        return @tickerList
    end

    def buildURL(tickers)
        # build list of tickers
        # should be < 100 and of type 'Stock'
        $i = 0
        s = []
        @tickerList = tickers
        @tickerList.each do |t|
            s.push(t.ticker)

            $i +=1
            if $i > 100
                break
            end
        end

        baseQuery = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20'
        queryTail = '&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
        escapedQuery = ERB::Util.url_encode(s.join(','))

        return baseQuery + '(%22' + escapedQuery + '%22)' + queryTail
    end

    def fetch
        @t = assemble_symbols('Stock')

        resp = Net::HTTP.get_response(URI.parse(buildURL(@t)))
        response = JSON.parse(resp.body)

        puts response
        @payload = DataPayload.create(:payload => response)

    end

    fetch

end