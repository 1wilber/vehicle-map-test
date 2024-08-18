import { VehicleListDispatchContext } from "@/providers"
import { Vehicle } from "@/types"
import { Search } from "@mui/icons-material"
import { Autocomplete, TextField, InputAdornment } from "@mui/material"
import { useContext, useState } from "react"


export const VehicleInputSearch = () => {
  const [options, setOptions] = useState([])
  const dispatch = useContext(VehicleListDispatchContext)

  const searchVehicle = async (name: string) => {
    const searchParams = new URLSearchParams([
      ['q', name]
    ])

    try {
      const response = await fetch(`/api/v1/vehicles?${searchParams}`)
      const { vehicles = [] } = await response.json()
      setOptions(vehicles)
    } catch (error) {
      setOptions([])
      console.error(error)
    }

  }
  return (


    <Autocomplete
      options={options}
      getOptionLabel={(option: Vehicle) => option.patent}
      getOptionKey={(option: Vehicle) => option.id}
      noOptionsText="Escribe para empezar a buscar"
      onChange={(_, newSelectedVehicle) => dispatch({type: "select", id: newSelectedVehicle?.id})}
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

  )
}
