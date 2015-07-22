# encoding: utf-8

class DataPayloads < ActiveRecord::Migration
  def change
    create_table :data_payloads do |t|
      t.json :payload
      t.timestamps null: false
    end
  end
end
