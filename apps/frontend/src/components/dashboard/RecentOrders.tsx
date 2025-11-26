type OrderStatus = 'Pago' | 'Enviado' | 'Novo'

type RecentOrder = {
  id: string
  customer: string
  phone: string
  status: OrderStatus
  total: number
  items: number
  timestamp: string
}

const statusColors: Record<OrderStatus, string> = {
  Pago: 'bg-emerald-100 text-emerald-600',
  Enviado: 'bg-orange-100 text-orange-600',
  Novo: 'bg-indigo-100 text-indigo-600',
}

type RecentOrdersProps = {
  orders: RecentOrder[]
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="flex h-80 flex-col rounded-2xl bg-white p-6 shadow-soft">
      <div>
        <p className="text-sm font-medium text-slate-500">Pedidos Recentes</p>
        <p className="text-base font-semibold text-slate-900">Últimas conversões via WhatsApp</p>
      </div>
      <div className="mt-6 space-y-4 overflow-y-auto pr-2">
        {orders.map((order) => (
          <div key={order.id} className="grid grid-cols-[auto_1fr_auto] gap-3 rounded-xl bg-gradient-to-r from-white to-brand-50/40 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-600">
              {order.customer[0]}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">{order.customer}</p>
              <p className="text-xs text-slate-500">{order.phone}</p>
              <p className="text-[11px] text-slate-400">{order.timestamp}</p>
            </div>
            <div className="text-right text-sm font-semibold text-slate-800">
              R$ {order.total.toFixed(2)}
              <p className="text-[11px] font-medium text-slate-400">{order.items} itens</p>
              <span className={`mt-2 inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
