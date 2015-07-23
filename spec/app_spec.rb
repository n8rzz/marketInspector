# encoding: utf-8
require_relative 'spec_helper.rb'

describe MarketInspector do
  describe 'default attributes' do

  end

  describe 'Root path' do
    describe 'GET index' do
      before { get '/' }

      it { expect(last_response.status).to eq 200 }
    end
  end
end
