class Order < ApplicationRecord
  belongs_to :trip
  belongs_to :user
end
