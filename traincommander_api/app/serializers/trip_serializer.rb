class TripSerializer < ActiveModel::Serializer
  attributes :id, :departure_time, :total_travel_time, :price, :from, :to
  has_one :train
end
