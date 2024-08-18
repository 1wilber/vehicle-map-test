import { useContext } from "react"
import { useNotification, VehicleListContext, VehicleListDispatchContext } from "@/providers"
import { Position, Vehicle } from "@/types"
import { Markers } from "./markers"

export const VehicleMarkers = () => {
  const { vehicles, selected: selectedVehicle } = useContext(VehicleListContext)
  const dispatch = useContext(VehicleListDispatchContext)
  const notification = useNotification()

  const getVehiclePosition = (vehicle: Vehicle): Position => {
    return {
      lat: vehicle.recent_location?.latitude,
      lng: vehicle.recent_location?.longitude,
    }
  }

  const onNotFound = () => {
    dispatch({
      type: "select",
      id: null
    })

    notification(
      "warning",
      "No se ha encontrado informacion del vehiculo"
    )
  }

  const getVehiclePositions = (vehicles: Vehicle[]): Position[] => {
    const vehiclesWithRecentLocation = vehicles.filter(vehicle => Object.keys(vehicle?.recent_location || {}).length)
    if (!vehiclesWithRecentLocation.length) return []

    return vehiclesWithRecentLocation.map(vehicle => getVehiclePosition(vehicle))
  }

  return <Markers
    positions={getVehiclePositions(vehicles)}
    flyTo={selectedVehicle?.id ? getVehiclePosition(selectedVehicle) : undefined}
    onNotFound={onNotFound}
  />
}
