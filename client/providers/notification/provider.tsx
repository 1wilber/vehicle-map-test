import { Snackbar, Alert } from "@mui/material"
import { PropsWithChildren, useReducer } from "react"
import { initialNotficationState, NotificationContext, NotificationDispatchContext, notificationReducer } from "."


export const NotificationProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props
  const [state, dispatch] = useReducer(notificationReducer, initialNotficationState)

  return (
    <NotificationContext.Provider value={state}>
      <NotificationDispatchContext.Provider value={dispatch}>
        <Snackbar
          open={state.open}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => dispatch(initialNotficationState)}
        >
          <Alert
            severity={state.type}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {state.message}
          </Alert>
        </Snackbar>
        {children}
      </NotificationDispatchContext.Provider>
    </NotificationContext.Provider>
  )
}

