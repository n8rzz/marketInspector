# encoding: utf-8
FactoryGirl.define do
  chars = Random.rand(2..4)

  factory :tickerSymbol, class: TickerSymbol do
    ticker { Faker::Lorem.characters(chars).upcase }
    symbolType 'Stock'
  end
end
