require File.expand_path '../../spec_helper.rb', __FILE__

describe 'Ticker API' do
  describe 'GET "index"' do

    before { get '/tickers' }

    it { expect(last_response.status).to eq 200 }
  end


  describe 'GET id' do
    it 'must return a single row'
  end


  describe 'POST' do
    before do
        # @newticker = attributes_for(:tickerSymbol)
        post '/tickers/add',
             { ticker: "CAT",
               symbolType: "Stock"
             },
             "CONTENT_TYPE" => 'application/json'
    end

    let(:response) { (last_response.body).to_json }

    it 'must be a successful POST'
    # it { expect(last_response.status).to eq 200 }
    it 'must add a ticker'
    # it { response[:ticker].must_equal "CAT" }
    it 'must add a symbolType'
    # it { response[:symbolType].must_equal "Stock" }
  end


  describe 'DELETE' do
    it 'must remove a ticker'
  end


end
