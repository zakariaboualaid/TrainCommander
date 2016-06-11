class OrderSerializer < ActiveModel::Serializer
  attributes :id, :order_time, :transaction_id, :trip, :user
  has_one :trip_id
  has_one :user_id
end
