import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import Layout from './layout/Layout'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Messages from './pages/Messages'
import Campaigns from './pages/Campaigns'
import Orders from './pages/Orders'
import Products from './pages/Products'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'clientes', element: <Clients /> },
      { path: 'mensagens', element: <Messages /> },
      { path: 'campanhas', element: <Campaigns /> },
      { path: 'pedidos', element: <Orders /> },
      { path: 'produtos', element: <Products /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
