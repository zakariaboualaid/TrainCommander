class CreateTrips < ActiveRecord::Migration[5.0]
  def change
    create_table :trips do |t|

      t.datetime :departure_time
      t.integer :total_travel_time
      t.float :price
      t.references :train, foreign_key: true
      t.references :from, references: :stations
      t.references :to, references: :stations

      t.timestamps
    end
  end
end
