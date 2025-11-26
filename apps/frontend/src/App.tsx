import { Suspense } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import Layout from './layout/Layout'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Messages from './pages/Messages'
import Campaigns from './pages/Campaigns'
import Orders from './pages/Orders'
import Products from './pages/Products'
import WhatsAppConnect from './pages/WhatsAppConnect'
import { ErrorFallback } from './components/ErrorFallback'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorFallback />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'clientes', element: <Clients /> },
      { path: 'mensagens', element: <Messages /> },
      { path: 'campanhas', element: <Campaigns /> },
      { path: 'pedidos', element: <Orders /> },
      { path: 'produtos', element: <Products /> },
      { path: 'whatsapp', element: <WhatsAppConnect /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])

export default function App() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-slate-500">Carregando...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
