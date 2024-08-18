import { useContext } from "react"
import { NotificationDispatchContext } from "."
import { AlertColor } from "@mui/material"

export const useNotification = () => {
  const dispatch = useContext(NotificationDispatchContext)


  return (type: AlertColor = 'warning', message: string) => dispatch({ type, message, open: true })
}
