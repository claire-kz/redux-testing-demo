class Listing < ActiveRecord::Base
  validates :title, presence: true
end
