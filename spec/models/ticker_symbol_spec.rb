# encoding: utf-8
require File.expand_path '../../spec_helper.rb', __FILE__

describe TickerSymbol do
  it 'has a valid factroy' do
    expect(build(:tickerSymbol)).to be_instance_of(TickerSymbol)
  end

  let(:row) { FactoryGirl.create(:tickerSymbol) }

  describe 'data and associations' do
    it { should have_db_column(:ticker) }
    it { should have_db_column(:symbolType) }
  end

  describe 'validations' do
    it { expect(row).to validate_presence_of(:ticker) }
    it { expect(row).to_not allow_value(' ').for(:ticker) }
    it { expect(row).to_not allow_value('aaaaaaa').for(:ticker) }
    it { expect(row).to validate_presence_of(:symbolType) }
    it { expect(row).to_not allow_value(' ').for(:symbolType) }
    it { expect(row).to_not allow_value('aaaaaaa').for(:symbolType) }
    # it { expect(row).to_not allow_value('123456').for(:symbolType) }
    # it { expect(row).to_not allow_value('1a3b5c').for(:symbolType) }
  end
end
