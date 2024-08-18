import { ListItemButton, ListItemAvatar, Avatar, ListItemText, Chip, Typography } from "@mui/material"

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import dayjs from 'dayjs'
import { Vehicle } from "@/types";
import { useContext } from "react";
import { VehicleListContext, VehicleListDispatchContext } from "@/providers";

type VehicleListItemProps = {
  vehicle: Vehicle
}

export const VehicleListItem: React.FC<VehicleListItemProps> = (props) => {
  const { vehicle } = props
  const dispatch = useContext(VehicleListDispatchContext)
  const state = useContext(VehicleListContext)
  const { selected } = state


  const humanizeTime = (date: string | undefined) => {
    if (date) {
      return dayjs().to(date)
    } else {
      return "-"
    }
  }

  const handleSelectedVehicleChange = (vehicle: Vehicle) => {
    dispatch({ type: "select", id: vehicle.id })
  }

  return (
    <ListItemButton onClick={() => handleSelectedVehicleChange(vehicle)} selected={selected?.id === vehicle.id} >
      <ListItemAvatar>
        <Avatar>
          <DirectionsCarIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={vehicle.patent} secondary={
        <>
          <Chip variant="outlined" color="success" label="En ruta" size="small" />
          <Typography fontSize="0.8rem">{humanizeTime(vehicle?.recent_location?.sent_at)}</Typography>
        </>
      }
      />
    </ListItemButton>
  )

}
