class Vehicle < ApplicationRecord
  has_many :location_tracks

  scope :search, ->(q){where('LOWER(patent) like ?', "%#{q.downcase}%")}

  def self.with_recent_location
    Vehicle.joins("LEFT JOIN LATERAL (
      SELECT * FROM location_tracks
      WHERE location_tracks.vehicle_id = vehicles.id 
      ORDER BY location_tracks.sent_at DESC 
      LIMIT 1
    ) AS recent_location ON true")
      .select("
        vehicles.*,
        recent_location.id AS recent_location_id,
        recent_location.latitude AS recent_location_latitude,
        recent_location.longitude AS recent_location_longitude,
        recent_location.sent_at AS recent_location_sent_at
      ")
  end

  def recent_location
    return nil unless recent_location_id.present?

    {
      id: recent_location_id,
      latitude: recent_location_latitude,
      longitude: recent_location_longitude,
      sent_at: recent_location_sent_at
    }
  end
end
