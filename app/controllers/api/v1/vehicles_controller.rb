class Api::V1::VehiclesController < ApplicationController
  before_action :set_vehicle, only: [:show]

  def index
    @vehicles = if params[:q]
      Vehicle.with_recent_location.search(params[:q])
    else
    Vehicle.with_recent_location
    end

    serialization = ActiveModelSerializers::SerializableResource.new(@vehicles)   

    render json: {
      meta: {
        total: Vehicle.count
      },
      vehicles: serialization
    }
  end

  def show
    sleep 1
    render json: {
    vehicle: @vehicle.as_json(include: [:recent_location])
    }
  end

  private

  def set_vehicle
    @vehicle = Vehicle.find(params[:id])
  end
end
