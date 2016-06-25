class TripSerializer < ActiveModel::Serializer
  attributes :id, :departure_time, :total_travel_time, :price, :from, :to, :train
end