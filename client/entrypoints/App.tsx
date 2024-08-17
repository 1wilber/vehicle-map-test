import { createBrowserRouter, LoaderFunctionArgs, Navigate, Outlet, RouteObject, RouterProvider } from "react-router-dom"
import { VehicleListView, VehicleShowView } from "../views/vehicles"

const Layout = () => {
  return (
    <Outlet />
  )
}

const VehicleListLoader = () => {
  return fetch('/api/v1/vehicles')
}

const VehicleShowLoader = (request: LoaderFunctionArgs) => {
  const vehicleId = request.params.id
  return fetch(`/api/v1/vehicles/${vehicleId}`)
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
        children: [
          {
            path: ':id',
            element: <VehicleShowView />,
            loader: VehicleShowLoader
          }
        ]
      },
    ]
  }
]

const router = createBrowserRouter(routes)

export const App = () => {
  return <RouterProvider router={router} />
}

export default App
