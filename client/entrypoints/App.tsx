import { createBrowserRouter, Navigate, Outlet, RouteObject, RouterProvider } from "react-router-dom"
import { VehicleListView } from "../views/vehicles"

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
        element: <VehicleListView />,
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
