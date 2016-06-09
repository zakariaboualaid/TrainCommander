class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
      t.references :trip_id, foreign_key: true
      t.references :user_id, foreign_key: true
      t.datetime :order_time

      t.timestamps
    end
  end
end
