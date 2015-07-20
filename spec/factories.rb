FactoryGirl.define do

  factory :tickerSymbol, :class => TickerSymbol do
    id 1
    ticker "LPPA"
    symbolType "Stock"
  end
end
