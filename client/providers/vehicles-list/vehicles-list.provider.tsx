import { createContext, PropsWithChildren, useReducer } from "react"
import { Vehicle } from "@/types"


const reducer = (state, action) => {
  if (action.type === 'select') {
    const newSelectedVehicle = state.vehicles.find(vehicle => vehicle.id === action.id)
    return {
      ...state,
      selected: newSelectedVehicle
    }

  }
}
type VehicleListContextProps = { vehicles: Vehicle[], selected: Vehicle | undefined }

export const VehicleListContext = createContext({} as VehicleListContextProps)
export const VehicleListDispatchContext = createContext(null)

type VehicleListProviderProps = {
  values: {
    vehicles: Vehicle[] | undefined
  }
}


export const VehicleListProvider: React.FC<PropsWithChildren<VehicleListProviderProps>> = (props) => {
  const { values, children } = props
  const { vehicles } = values
  const [state, dispatch] = useReducer(reducer, { vehicles, selected: null })

  return (
    <VehicleListContext.Provider value={state}>
      <VehicleListDispatchContext.Provider value={dispatch}>
        {children}
      </VehicleListDispatchContext.Provider>
    </VehicleListContext.Provider>
  )

}
