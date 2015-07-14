class CreateTickerSymbol < ActiveRecord::Migration
  def change
    create_table :ticker_symbols do |t|
        t.string :ticker
        t.string :symbolType
    end
  end
end
