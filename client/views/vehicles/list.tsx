import { Alert, Autocomplete, Avatar, Box, Chip, Divider, Drawer, InputAdornment, List, ListItemAvatar, ListItemButton, ListItemText, ListSubheader, Snackbar, TextField, Typography } from "@mui/material"
import { useLoaderData, useNavigate, } from "react-router-dom";
import { Position, Vehicle, VehicleListApiResponse } from "../../types";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Search } from "@mui/icons-material";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "../../constants";
import { Markers } from "../../components/markers";


export const VehicleListView = () => {
  const initialSelectedVehicle: Vehicle = {
    id: 0,
    model: "",
    brand: "",
    patent: "",
    year: "",
    created_at: "",
    updated_at: "",
    recent_location: undefined
  }
  const { vehicles, meta } = useLoaderData() as VehicleListApiResponse
  const navigate = useNavigate()
  const [options, setOptions] = useState([])
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(initialSelectedVehicle)
  const [open, setOpen] = useState<boolean>(false)



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
      setSelectedVehicle(initialSelectedVehicle)
    } else {
      setSelectedVehicle(vehicle)
    }
  }

  const getVehiclePosition = (vehicle: Vehicle): Position => {
    return {
      lat: vehicle.recent_location?.latitude,
      lng: vehicle.recent_location?.longitude,
    }
  }

  const getVehiclePositions = (vehicles: Vehicle[]): Position[] => {
    const vehiclesWithRecentLocation = vehicles.filter(vehicle => Object.keys(vehicle?.recent_location || {}).length)
    if (!vehiclesWithRecentLocation.length) return []

    return vehiclesWithRecentLocation.map(vehicle => getVehiclePosition(vehicle))
  }

  const onNotFound = () => {
    setSelectedVehicle(initialSelectedVehicle)
    setOpen(true)
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
                <ListItemButton selected={selectedVehicle?.id === vehicle.id} onClick={() => handleSelectedVehicle(vehicle)}>
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

        <Snackbar
          open={open}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setOpen(false)}
        >
          <Alert
            severity="warning"
            variant="filled"
            sx={{ width: '100%' }}
          >
            No hay ubicacion reciente para el vehiculo seleccionado
          </Alert>
        </Snackbar>
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
            flyTo={selectedVehicle.id ? getVehiclePosition(selectedVehicle) : undefined}
            onNotFound={onNotFound}
          />
        </MapContainer>
      </Box>
    </Box>
  )
}
