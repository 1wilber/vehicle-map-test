import { Autocomplete, Avatar, Box, Chip, Divider, Drawer, InputAdornment, List, ListItemAvatar, ListItemButton, ListItemText, ListSubheader, TextField, Typography } from "@mui/material"
import { useLoaderData, useNavigate, } from "react-router-dom";
import { Vehicle, VehicleListApiResponse } from "../../types";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Search } from "@mui/icons-material";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "../../constants";
import { Markers } from "../../components/markers";
import { LatLngLiteral } from "leaflet";


export const VehicleListView = () => {
  const { vehicles, meta } = useLoaderData() as VehicleListApiResponse
  const navigate = useNavigate()
  const [options, setOptions] = useState([])
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>({})



  const drawerWidth = 320

  const searchVehicle = async (name: string) => {
    const searchParams = new URLSearchParams([
      ['q', name]
    ])

    try {
      const response = await fetch(`/api/v1/vehicles?${searchParams}`)
      const { vehicles = [] } = await response.json()
      setOptions(vehicles)
    } catch (error) { }

  }

  const handleSelectedVehicle = (vehicle: Vehicle) => {
    if (selectedVehicle.id === vehicle.id) {
      setSelectedVehicle({})
    } else {
      setSelectedVehicle(vehicle)
    }
  }

  const getVehiclePosition: LatLngLiteral | undefined = (vehicle: Vehicle) => {
    if (!vehicle.recent_location?.longitude) return
    if (!vehicle.recent_location?.latitude) return

    return {
      lat: vehicle.recent_location?.latitude,
      lng: vehicle.recent_location?.longitude,
    }
  }

  const getVehiclePositions: LatLngLiteral[] | [] = (vehicles: Vehicle[]) => {
    const vehiclesWithRecentLocation = vehicles.filter(vehicle => Object.keys(vehicle?.recent_location || {}).length)
    if (!vehiclesWithRecentLocation.length) return []

    return vehiclesWithRecentLocation.map(vehicle => getVehiclePosition(vehicle))
  }

  return (
    <Box display='flex'>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, py: 1, px: 2 },
          }}
        >
          <Autocomplete
            options={options}
            getOptionLabel={(option: Vehicle) => option.patent}
            getOptionKey={(option: Vehicle) => option.id}
            onChange={(_, option) => option ? navigate(`/vehicles/${option.id}`) : navigate('/vehicles')}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                variant="outlined"
                placeholder="Buscar vehículos... "
                onChange={(evt) => searchVehicle(evt.target.value)}

                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start"><Search /></InputAdornment>
                  )
                }}
              />
            )}
          >
          </Autocomplete>
          <Divider />
          <List
            subheader={
              <ListSubheader component="div" disableSticky>
                Vehículos ({meta.total})
              </ListSubheader>
            }
          >
            {vehicles.map(vehicle => (
              <>
                <ListItemButton selected={selectedVehicle.id === vehicle.id} onClick={() => handleSelectedVehicle(vehicle)}>
                  <ListItemAvatar>
                    <Avatar>
                      <DirectionsCarIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={vehicle.patent} secondary={
                    <>
                      <Chip variant="outlined" color="success" label="En ruta" size="small" />
                      <Typography fontSize="0.8rem">Actualizado hace 20 minutos</Typography>
                    </>
                  }
                  />
                </ListItemButton>
                <Divider component="li" />
              </>
            ))
            }
          </List>
        </Drawer>
      </Box>


      <Box sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` }, height: "100vh" }}>
        <MapContainer
          style={{ height: '100%', width: "100%" }}
          zoom={DEFAULT_MAP_ZOOM}
          center={DEFAULT_MAP_CENTER}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Markers
            positions={getVehiclePositions(vehicles)}
            flyTo={getVehiclePosition(selectedVehicle)} 
	  />
        </MapContainer>
      </Box>
    </Box>
  )
}
