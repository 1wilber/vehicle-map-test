class CreateLocationTracks < ActiveRecord::Migration[7.1]
  def change
    create_table :location_tracks do |t|
      t.float :latitude
      t.float :longitude
      t.datetime :sent_at
      t.references :vehicle, null: false, foreign_key: true

      t.timestamps
    end
  end
end
