class OrderSerializer < ActiveModel::Serializer
  attributes :id, :order_time
  has_one :trip_id
  has_one :user_id
end
