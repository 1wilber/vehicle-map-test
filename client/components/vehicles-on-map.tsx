import { MapContainer, TileLayer } from "react-leaflet"
import { VehicleMarker } from "./vehicle-marker"

export const VehiclesOnMap = (props) => {
  const { vehicles } = props
  const recentLocation = vehicles[0].recent_location
  const defaultCenter = { lat: -33.441171123929294, lng: -70.67172854257201 }
  const center = recentLocation?.id ? { lat: recentLocation.latitude, lng: recentLocation.longitude } : defaultCenter
  return (
    <MapContainer
      style={{ height: '100%', width: "100%" }}
      zoom={15}
      center={center}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {vehicles.length && vehicles.map(vehicle => <VehicleMarker vehicle={vehicle} />)}

    </MapContainer>
  )
}
