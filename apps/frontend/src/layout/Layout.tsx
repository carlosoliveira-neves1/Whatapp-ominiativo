import { NavLink, Outlet } from 'react-router-dom'
import {
  HomeIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  MegaphoneIcon,
  ShoppingBagIcon,
  RectangleStackIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { label: 'Dashboard', to: '/', icon: HomeIcon, exact: true },
  { label: 'Clientes', to: '/clientes', icon: UsersIcon },
  { label: 'Enviar Mensagens', to: '/mensagens', icon: ChatBubbleLeftRightIcon },
  { label: 'Campanhas', to: '/campanhas', icon: MegaphoneIcon },
  { label: 'Pedidos', to: '/pedidos', icon: ShoppingBagIcon },
  { label: 'Produtos', to: '/produtos', icon: RectangleStackIcon },
]

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="hidden w-72 flex-col bg-slate-900 px-6 py-8 text-white md:flex">
        <div className="mb-10 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400/20 text-2xl text-emerald-300">
            💬
          </span>
          <div>
            <h1 className="text-lg font-semibold">WhatsApp CRM</h1>
            <p className="text-xs text-slate-300">Gestão Omnichannel</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 text-sm">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-xl px-4 py-3 transition-colors',
                  isActive ? 'bg-white/10 text-white' : 'text-slate-200 hover:bg-white/5',
                ].join(' ')
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="mt-auto flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5">
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Sair
        </button>
      </aside>

      <div className="flex w-full flex-col">
        <header className="flex items-center justify-between bg-white/70 px-6 py-4 backdrop-blur md:px-10">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Back to Dashboard</p>
            <h2 className="text-lg font-semibold text-slate-700">Visão geral do seu negócio</h2>
          </div>
          <input
            className="hidden w-72 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 md:block"
            placeholder="Buscar em arquivos..."
          />
        </header>

        <main className="relative flex-1 overflow-y-auto">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 via-white to-slate-100" />
          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
