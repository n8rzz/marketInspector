require File.expand_path '../spec_helper.rb', __FILE__

describe 'Root path' do
  describe 'GET index' do
    before { get '/' }

    it { expect(last_response.status).to eq 200 }
  end
end
