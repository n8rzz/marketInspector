class TickerSymbol < ActiveRecord::Base
    validates :ticker, :symbolType, presence: true
    validates_uniqueness_of :ticker
    validates_length_of :ticker, :minimum => 1, :allow_blank => false
end