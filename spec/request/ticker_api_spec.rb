require File.expand_path '../../spec_helper.rb', __FILE__

describe 'Ticker API', :type => :request do

  describe 'GET "index" ' do
    it 'returns a successful 200 response'
    it 'Responds with a list of Tickers'
  end

  it 'Adds a Ticker'
  it 'Removes a Ticker'
end
