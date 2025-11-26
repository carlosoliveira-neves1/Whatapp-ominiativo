import type { Order, OrderStatus } from '../../data/mockOrders'
import { orderStatusLabels, orderStatusColors } from '../../data/mockOrders'
import { OrderCard } from './OrderCard'

const columns: OrderStatus[] = ['novo', 'analise', 'pago', 'enviado', 'concluido']

type OrdersKanbanProps = {
  orders: Order[]
}

export function OrdersKanban({ orders }: OrdersKanbanProps) {
  const ordersByStatus = columns.reduce(
    (acc, status) => {
      acc[status] = orders.filter((o) => o.status === status)
      return acc
    },
    {} as Record<OrderStatus, Order[]>
  )

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((status) => (
        <div key={status} className="min-w-[280px] flex-1">
          <div
            className={`mb-4 flex items-center justify-between rounded-xl border px-4 py-2 ${orderStatusColors[status]}`}
          >
            <span className="text-sm font-semibold">{orderStatusLabels[status]}</span>
            <span className="rounded-full bg-white/60 px-2 py-0.5 text-xs font-bold">
              {ordersByStatus[status].length}
            </span>
          </div>

          <div className="space-y-3">
            {ordersByStatus[status].map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}

            {ordersByStatus[status].length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">
                Nenhum pedido
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
