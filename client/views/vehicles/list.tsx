import { Autocomplete, Avatar, Box, Chip, Divider, Drawer, InputAdornment, List, ListItemAvatar, ListItemButton, ListItemText, ListSubheader, TextField, Typography } from "@mui/material"
import { NavLink, Outlet, useLoaderData, useLocation, useNavigate, } from "react-router-dom";
import { Vehicle, VehicleListApiResponse } from "../../types";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Search } from "@mui/icons-material";
import { useState } from "react";
import { VehiclesOnMap } from "../../components";


export const VehicleListView = () => {
  const { vehicles, meta } = useLoaderData() as VehicleListApiResponse
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isParentRoute = pathname === '/vehicles'
  const [options, setOptions] = useState([])



  const drawerWidth = 320

  const searchVehicle = async (name) => {
    const searchParams = new URLSearchParams([
      ['q', name]
    ])

    try {
      const response = await fetch(`/api/v1/vehicles?${searchParams}`)
      const { vehicles = [], meta = {} } = await response.json()
      console.log(vehicles)
      setOptions(vehicles)
    } catch (error) { }

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
            onChange={(_, option ) => option ? navigate(`/vehicles/${option.id}`) : navigate('/vehicles')}
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
              <NavLink to={`/vehicles/${vehicle.id}`}>
                {({ isActive }) => (
                  <>
                    <ListItemButton selected={isActive} >
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
                )}
              </NavLink>
            ))
            }
          </List>
        </Drawer>
      </Box>

      <>
        < Box sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` }, height: "100vh" }}>
          {isParentRoute ? <VehiclesOnMap vehicles={vehicles} /> : <Outlet />}
        </Box>
      </>
    </Box >
  )
}
