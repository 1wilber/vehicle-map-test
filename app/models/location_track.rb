class LocationTrack < ApplicationRecord
  belongs_to :vehicle

  with_options presence: true do
    validates :latitude
    validates :longitude
    validates :sent_at
  end
end
