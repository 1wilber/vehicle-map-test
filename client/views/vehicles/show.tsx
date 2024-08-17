import { MapContainer, TileLayer } from "react-leaflet"
import { Navigate, useLoaderData } from "react-router-dom"
import { VehicleShowApiResponse } from "../../types";
import { VehicleMarker } from "../../components";


export const VehicleShowView = () => {
  const { vehicle } = useLoaderData() as VehicleShowApiResponse
  const recentLocation = vehicle.recent_location


  if (!recentLocation) {
    return <Navigate to='/vehicles'/>
  }

  const vehiclePosition = {
    lat: recentLocation.latitude,
    lng: recentLocation.longitude
  }
  return (
    <MapContainer
      style={{ height: '100%', width: "100%" }}
      center={vehiclePosition}
      zoom={17}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <VehicleMarker vehicle={vehicle} flyToPosition />

    </MapContainer>
  )

}
