import type { AlertColor } from "@mui/material";
import { createContext, Dispatch } from "react";

type NotificationState = {
  type: AlertColor;
  message: string;
  open: boolean;
}

type NotificationAction = NotificationState

export const initialNotficationState: NotificationState = { type: "warning", message: "", open: false }
export const NotificationContext = createContext<NotificationState>(initialNotficationState)
export const NotificationDispatchContext = createContext<Dispatch<NotificationAction>>(() => { })
export const notificationReducer = (_state: NotificationState, action: NotificationState) => {
  return { type: action.type, message: action.message, open: action.open }
}
