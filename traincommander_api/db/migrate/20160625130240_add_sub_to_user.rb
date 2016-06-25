class AddSubToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :sub, :string
  end
end
