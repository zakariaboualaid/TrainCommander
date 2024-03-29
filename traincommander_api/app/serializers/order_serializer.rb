class OrderSerializer < ActiveModel::Serializer
  attributes :id, :order_time, :transaction_id, :trip, :user, :title, :processed
  has_one :trip_id
  has_one :user_id

  def title
    "From #{object.trip.from.name} to #{object.trip.to.name}"
  end


end
