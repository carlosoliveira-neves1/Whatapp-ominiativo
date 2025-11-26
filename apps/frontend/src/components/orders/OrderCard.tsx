import type { Order } from '../../data/mockOrders'
import { orderStatusColors, orderStatusLabels } from '../../data/mockOrders'

type OrderCardProps = {
  order: Order
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-slate-800">{order.customer}</p>
          <p className="text-xs text-slate-400">{order.phone}</p>
        </div>
        <span
          className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${orderStatusColors[order.status]}`}
        >
          {orderStatusLabels[order.status]}
        </span>
      </div>

      <div className="mt-3 text-sm text-slate-600">
        {order.items.join(', ')}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-lg font-bold text-slate-800">R$ {order.total.toFixed(2)}</span>
        <span className="text-xs text-slate-400">
          {new Date(order.createdAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>

      {order.campaign && (
        <div className="mt-2 text-xs text-brand-600">
          via {order.campaign}
        </div>
      )}
    </div>
  )
}
