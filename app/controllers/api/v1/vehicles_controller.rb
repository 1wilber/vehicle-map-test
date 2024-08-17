class Api::V1::VehiclesController < ApplicationController
  before_action :set_vehicle, only: [:show]

  def index
    @vehicles = if params[:q]
      Vehicle.search(params[:q])
    else
      Vehicle.all
    end
    render json: {
      meta: {
        total: Vehicle.count
      },
      vehicles: @vehicles.as_json(include: [:recent_location])
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
