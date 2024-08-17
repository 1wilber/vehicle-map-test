
import { useMap } from 'react-leaflet'
import { MarkerLayer, Marker } from "react-leaflet-marker";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { LatLngLiteral } from 'leaflet';
import { useEffect } from 'react';
import { DEFAULT_MAP_ZOOM } from '../constants';

interface IMarkers {
  positions: LatLngLiteral[],
  flyTo: LatLngLiteral | undefined
}

export const Markers: React.FC<IMarkers> = (props) => {
  const map = useMap()
  const {
    positions,
    flyTo
  } = props

  useEffect(() => {
    console.log({ flyTo })
    if (!(flyTo?.lat && flyTo?.lng)) {
      const currentCenter = map.getCenter()
      map.flyTo(currentCenter, DEFAULT_MAP_ZOOM)
      return
    }

    map.flyTo(flyTo, DEFAULT_MAP_ZOOM + 2)
  }, [flyTo])

  return (
    <>
      {positions.map((position, index) => (
        <MarkerLayer key={index}>
          <Marker position={position}>
            <DirectionsCarIcon />
          </Marker>
        </MarkerLayer>
      ))}
    </>
  )

}
