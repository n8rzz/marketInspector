# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150714232319) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "data_payloads", force: :cascade do |t|
    t.json     "payload"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ticker_datas", id: :bigserial, force: :cascade do |t|
    t.string   "symbol"
    t.string   "ask"
    t.string   "AverageDailyVolume"
    t.string   "Bid"
    t.string   "AskRealtime"
    t.string   "BidRealtime"
    t.string   "BookValue"
    t.string   "Change_PercentChange"
    t.string   "Change"
    t.string   "Commission"
    t.string   "Currency"
    t.string   "ChangeRealtime"
    t.string   "AfterHoursChangeRealtime"
    t.string   "DividendShare"
    t.string   "LastTradeDate"
    t.string   "TradeDate"
    t.string   "EarningsShare"
    t.string   "ErrorIndicationreturnedforsymbolchangedinvalid"
    t.string   "EPSEstimateCurrentYear"
    t.string   "EPSEstimateNextYear"
    t.string   "EPSEstimateNextQuarter"
    t.string   "DaysLow"
    t.string   "DaysHigh"
    t.string   "YearLow"
    t.string   "YearHigh"
    t.string   "HoldingsGainPercent"
    t.string   "AnnualizedGain"
    t.string   "HoldingsGain"
    t.string   "HoldingsGainPercentRealtime"
    t.string   "HoldingsGainRealtime"
    t.string   "MoreInfo"
    t.string   "OrderBookRealtime"
    t.string   "MarketCapitalization"
    t.string   "MarketCapRealtime"
    t.string   "EBITDA"
    t.string   "ChangeFromYearLow"
    t.string   "PercentChangeFromYearLow"
    t.string   "LastTradeRealtimeWithTime"
    t.string   "ChangePercentRealtime"
    t.string   "ChangeFromYearHigh"
    t.string   "PercebtChangeFromYearHigh"
    t.string   "LastTradeWithTime"
    t.string   "LastTradePriceOnly"
    t.string   "HighLimit"
    t.string   "LowLimit"
    t.string   "DaysRange"
    t.string   "DaysRangeRealtime"
    t.string   "FiftydayMovingAverage"
    t.string   "TwoHundreddayMovingAverage"
    t.string   "ChangeFromTwoHundreddayMovingAverage"
    t.string   "PercentChangeFromTwoHundreddayMovingAverage"
    t.string   "ChangeFromFiftydayMovingAverage"
    t.string   "PercentChangeFromFiftydayMovingAverage"
    t.string   "Name"
    t.string   "Notes"
    t.string   "Open"
    t.string   "PreviousClose"
    t.string   "PricePaid"
    t.string   "ChangeinPercent"
    t.string   "PriceSales"
    t.string   "PriceBook"
    t.string   "ExDividendDate"
    t.string   "PERatio"
    t.string   "DividendPayDate"
    t.string   "PERatioRealtime"
    t.string   "PEGRatio"
    t.string   "PriceEPSEstimateCurrentYear"
    t.string   "PriceEPSEstimateNextYear"
    t.string   "Symbol"
    t.string   "SharesOwned"
    t.string   "ShortRatio"
    t.string   "LastTradeTime"
    t.string   "TickerTrend"
    t.string   "OneyrTargetPrice"
    t.string   "Volume"
    t.string   "HoldingsValue"
    t.string   "HoldingsValueRealtime"
    t.string   "YearRange"
    t.string   "DaysValueChange"
    t.string   "DaysValueChangeRealtime"
    t.string   "StockExchange"
    t.string   "DividendYield"
    t.string   "PercentChange"
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
  end

  create_table "ticker_symbols", force: :cascade do |t|
    t.string "ticker"
    t.string "symbolType"
  end

end
