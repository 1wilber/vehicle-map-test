class Api::V1::GpsController < ApplicationController

  def index
  end

  def create
    @location_track = LocationTrack.new(location_track_params)

    if @location_track.save
      render json: @location_track, status: :created
    else
      render json: create_error_api_response(@location_track), status: :unprocessable_entity
    end
    
  end

  def show
  end

  private

  def location_track_params
    params.require(:location_track).permit(
      :latitude,
      :longitude,
      :sent_at,
      :vehicle_id
    )
  end
end
