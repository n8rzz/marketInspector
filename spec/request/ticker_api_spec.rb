require File.expand_path '../../spec_helper.rb', __FILE__

describe 'Ticker API', :type => :request do
    it "has a valid factroy" do
        expect(build(:tickerSymbol)).to be_instance_of(TickerSymbol)
    end

  describe 'GET /tickers' do
    before { get '/tickers' }

    it { expect(last_response.status).to eq 200 }
  end


  describe 'Empty GET /tickers/id' do
    before { get '/tickers/.'}
    it { expect(last_response.status).to eq 404 }
  end

  describe 'GET /tickers/id' do
    it 'must return a single record'
  end


  describe 'Empty POST /tickers/add' do
    before { post '/tickers/add' }
    it { expect(last_response.status).to eq 500 }
  end

  describe 'POST /tickers/add' do
    # let(:body) { FactoryGirl.create(:tickerSymbol).to_json }
    # before do
    #   post '/tickers/add', body, { 'Content-Type' => 'application/json' }
    # end
    # subject { last_response }
    # it { should be_ok }

    it 'must add a ticker'
    # it { response[:ticker].must_equal "CAT" }
    # it 'must add a symbolType'
    # it { response[:symbolType].must_equal "Stock" }
  end


  describe 'Empty DELETE /tickers/id' do
    before { delete '/tickers/.'}
    it { expect(last_response.status).to eq 404 }
  end

  describe 'DELETE' do
    it 'must remove a ticker'
  end


end
