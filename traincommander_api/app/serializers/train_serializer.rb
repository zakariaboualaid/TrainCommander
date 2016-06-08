class TrainSerializer < ActiveModel::Serializer
  attributes :id, :name, :capacity, :city
end