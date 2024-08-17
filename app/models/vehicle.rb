class Vehicle < ApplicationRecord
  has_many :location_tracks

  scope :search, ->(q){where('LOWER(patent) like ?', "%#{q.downcase}%")}

  def recent_location
    location_tracks.order(sent_at: :desc).take
  end
end
