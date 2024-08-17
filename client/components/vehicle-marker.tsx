
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { Vehicle } from '../types';
import { MarkerLayer, Marker } from "react-leaflet-marker";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
type VehicleMarker = {
  vehicle: Vehicle;
  flyToPosition: boolean | undefined;
}

export const VehicleMarker: React.FC<VehicleMarker> = (props) => {
  const map = useMap()
  const {
    vehicle,
    flyToPosition = false
  } = props
  const recentLocation = vehicle.recent_location
  if (!recentLocation) {
    return null
  }
  const position = [recentLocation?.latitude, recentLocation?.longitude]

  useEffect(() => {
    if (!flyToPosition) return

    map.flyTo(position, 18)
  }, [position])

  return (
    <MarkerLayer>
      <Marker position={position}>
        <DirectionsCarIcon />
      </Marker>
    </MarkerLayer>
  )

}
