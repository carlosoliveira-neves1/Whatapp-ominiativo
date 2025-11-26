import type { Client } from '../../data/mockClients'
import { XMarkIcon, PhoneIcon, EnvelopeIcon, ShoppingBagIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

type ClientDrawerProps = {
  client: Client | null
  onClose: () => void
}

export function ClientDrawer({ client, onClose }: ClientDrawerProps) {
  if (!client) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-800">Detalhes do Cliente</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-2xl font-bold text-brand-600">
              {client.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800">{client.name}</h3>
              <div className="mt-1 flex flex-wrap gap-1">
                {client.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact */}
          <section className="mt-8">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Contato</h4>
            <div className="space-y-2 text-sm text-slate-700">
              <p className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 text-slate-400" />
                {client.phone}
              </p>
              <p className="flex items-center gap-2">
                <EnvelopeIcon className="h-4 w-4 text-slate-400" />
                {client.email}
              </p>
            </div>
          </section>

          {/* Stats */}
          <section className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-emerald-50 p-4">
              <div className="flex items-center gap-2 text-emerald-600">
                <CurrencyDollarIcon className="h-5 w-5" />
                <span className="text-xs font-medium uppercase">Total gasto</span>
              </div>
              <p className="mt-2 text-xl font-bold text-emerald-700">R$ {client.totalSpent.toFixed(2)}</p>
            </div>
            <div className="rounded-xl bg-brand-50 p-4">
              <div className="flex items-center gap-2 text-brand-600">
                <ShoppingBagIcon className="h-5 w-5" />
                <span className="text-xs font-medium uppercase">Pedidos</span>
              </div>
              <p className="mt-2 text-xl font-bold text-brand-700">{client.ordersCount}</p>
            </div>
          </section>

          {/* Last order */}
          <section className="mt-8">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Último pedido</h4>
            <p className="text-sm text-slate-600">
              {client.lastOrderAt
                ? new Date(client.lastOrderAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'Nenhum pedido registrado'}
            </p>
          </section>

          {/* Placeholder for history */}
          <section className="mt-8">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Histórico de interações
            </h4>
            <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400">
              Em breve: timeline de mensagens e pedidos.
            </div>
          </section>
        </div>

        <footer className="border-t border-slate-100 p-4">
          <button className="w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700">
            Enviar mensagem
          </button>
        </footer>
      </aside>
    </>
  )
}
