class Trip < ApplicationRecord
  belongs_to :train
  belongs_to :from, class_name: 'Station'
  belongs_to :to, class_name: 'Station'
end
