class AddValidToOrders < ActiveRecord::Migration[5.0]
  def change
    add_column :orders, :valid, :boolean
  end
end
