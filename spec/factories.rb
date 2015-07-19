FactoryGirl.define do

  factory :stockticker do |f|
    f.ticker "AAPL"
    f.symbolType "Stock"
  end

  factory :etfticker do |f|
    f.ticker "XLF"
    f.symbolType "ETF"
  end

  factory :indexticker do |f|
    f.ticker "SPY"
    f.symbolType "Index"
  end

end
