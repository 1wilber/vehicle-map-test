
import { useMap } from 'react-leaflet'
import { MarkerLayer, Marker } from "react-leaflet-marker";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useEffect } from 'react';
import { DEFAULT_MAP_ZOOM } from '../constants';
import { Position } from '../types';
import { LatLngLiteral } from 'leaflet';

interface IMarkers {
  positions: Position[],
  flyTo: Position | undefined,
  onNotFound: () => void
}

export const Markers: React.FC<IMarkers> = (props) => {
  const map = useMap()
  const {
    positions,
    flyTo,
    onNotFound
  } = props

  useEffect(() => {
    if (flyTo === undefined) return

    if (flyTo.lat && flyTo.lng) {
      map.flyTo(flyTo as LatLngLiteral, DEFAULT_MAP_ZOOM + 2)
      return
    }


    const currentCenter = map.getCenter()
    map.flyTo(currentCenter, DEFAULT_MAP_ZOOM)
    onNotFound()
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
