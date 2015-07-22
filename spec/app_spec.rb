# encoding: utf-8
require_relative 'spec_helper.rb'

describe 'Root path' do
  describe 'GET index' do
    before { get '/' }

    it { expect(last_response.status).to eq 200 }
  end
end
