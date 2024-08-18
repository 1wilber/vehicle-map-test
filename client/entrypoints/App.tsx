import { createBrowserRouter, Navigate, Outlet, RouteObject, RouterProvider } from "react-router-dom"
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { VehiclesView } from "@/views/vehicles";

dayjs.extend(relativeTime)
dayjs.locale('es')

const Layout = () => {
  return (
    <Outlet />
  )
}

const VehicleListLoader = () => {
  return fetch('/api/v1/vehicles')
}

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/vehicles' />
      },
      {
        path: '/vehicles',
        element: <VehiclesView />,
        loader: VehicleListLoader,
      },
    ]
  }
]

const router = createBrowserRouter(routes)

export const App = () => {
  return <RouterProvider router={router} />
}

export default App
