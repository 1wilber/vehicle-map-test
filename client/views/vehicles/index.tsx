import { VehicleInputSearch, VehicleList, VehicleMarkers } from "@/components";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "@/constants";
import { VehicleListProvider } from "@/providers";
import { VehicleListApiResponse } from "@/types";
import { MenuOutlined } from "@mui/icons-material";
import { Alert, AppBar, Box, Divider, Drawer, IconButton, Snackbar, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router-dom";

export const VehiclesView = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const drawerWidth = 320
  const { vehicles, meta } = useLoaderData() as VehicleListApiResponse
  const [open, setOpen] = useState<boolean>(false)
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)


  return (
    <VehicleListProvider values={{ vehicles }}>
      <Box display='flex'>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            open={drawerOpen}
            variant={isMobile ? "temporary" : "permanent"}
            onClose={() => setDrawerOpen(false)}
            sx={{
              display: { sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, py: 1, px: 2 },
            }}
          >
            <VehicleInputSearch />
            <Divider />
            <VehicleList />
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
          <AppBar position="static" sx={{ display: { sm: "none" } }}>
            <Toolbar>
              <IconButton
                onClick={() => setDrawerOpen(true)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuOutlined />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Vehículos
              </Typography>
            </Toolbar>
          </AppBar>
          <MapContainer
            style={{ height: '100%', width: "100%" }}
            zoom={DEFAULT_MAP_ZOOM}
            center={DEFAULT_MAP_CENTER}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <VehicleMarkers />
          </MapContainer>
        </Box>
      </Box>
    </VehicleListProvider >
  )
}
