import { Divider, List, ListSubheader } from "@mui/material"
import { VehicleListItem } from "./vehicle-list-item"
import { useContext } from "react"
import { VehicleListContext } from "@/providers"

export const VehicleList: React.FC = () => {
  const total = 1
  const { vehicles } = useContext(VehicleListContext)


  return (
    <List
      subheader={
        total &&
        <ListSubheader component="div" disableSticky>
          Vehículos ({total})
        </ListSubheader>
      }
    >
      {vehicles.map(vehicle => (
        <>
          <VehicleListItem
            vehicle={vehicle}
          />
          <Divider component="li" />
        </>
      ))
      }
    </List>
  )
}
