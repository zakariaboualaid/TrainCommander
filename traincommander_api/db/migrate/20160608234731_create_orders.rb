class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
      t.references :trip, foreign_key: true
      t.references :user, foreign_key: true
      t.datetime :order_time

      t.timestamps
    end
  end
end
