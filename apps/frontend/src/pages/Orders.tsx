import { mockOrders } from '../data/mockOrders'
import { OrdersKanban } from '../components/orders/OrdersKanban'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function Orders() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Pedidos</h1>
          <p className="text-sm text-slate-500">Acompanhe o pipeline de pedidos via WhatsApp</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700">
          <PlusIcon className="h-5 w-5" />
          Novo pedido
        </button>
      </div>

      <OrdersKanban orders={mockOrders} />
    </div>
  )
}
