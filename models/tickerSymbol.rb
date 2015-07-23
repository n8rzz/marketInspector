# encoding: utf-8
class TickerSymbol < ActiveRecord::Base
  validates :ticker, :symbolType, presence: true, length: { maximum: 6 }
  # validates :TickerSymbol, format: { with: /[A-Z]/ }
  validates_uniqueness_of :ticker
  validates_length_of :ticker, minimum: 1, allow_blank: false
end
