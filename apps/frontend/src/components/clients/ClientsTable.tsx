import type { Client, ClientStatus } from '../../data/mockClients'
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

const statusColors: Record<ClientStatus, string> = {
  vip: 'bg-amber-100 text-amber-700',
  ativo: 'bg-emerald-100 text-emerald-700',
  inativo: 'bg-slate-100 text-slate-500',
  novo: 'bg-indigo-100 text-indigo-700',
}

const statusLabels: Record<ClientStatus, string> = {
  vip: 'VIP',
  ativo: 'Ativo',
  inativo: 'Inativo',
  novo: 'Novo',
}

type ClientsTableProps = {
  clients: Client[]
  onSelect?: (client: Client) => void
}

export function ClientsTable({ clients, onSelect }: ClientsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-soft">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-100 bg-slate-50/50">
          <tr>
            <th className="px-6 py-4 font-semibold text-slate-600">Cliente</th>
            <th className="px-6 py-4 font-semibold text-slate-600">Contato</th>
            <th className="px-6 py-4 font-semibold text-slate-600">Tags</th>
            <th className="px-6 py-4 font-semibold text-slate-600">Status</th>
            <th className="px-6 py-4 font-semibold text-slate-600 text-right">Total gasto</th>
            <th className="px-6 py-4 font-semibold text-slate-600 text-right">Pedidos</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {clients.map((client) => (
            <tr
              key={client.id}
              onClick={() => onSelect?.(client)}
              className="cursor-pointer transition hover:bg-brand-50/40"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-600">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{client.name}</p>
                    <p className="text-xs text-slate-400">
                      {client.lastOrderAt
                        ? `Último pedido: ${new Date(client.lastOrderAt).toLocaleDateString('pt-BR')}`
                        : 'Sem pedidos'}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1 text-slate-600">
                  <span className="flex items-center gap-1">
                    <PhoneIcon className="h-4 w-4 text-slate-400" />
                    {client.phone}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <EnvelopeIcon className="h-3 w-3" />
                    {client.email}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {client.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[client.status]}`}
                >
                  {statusLabels[client.status]}
                </span>
              </td>
              <td className="px-6 py-4 text-right font-medium text-slate-800">
                R$ {client.totalSpent.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-right text-slate-600">{client.ordersCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
