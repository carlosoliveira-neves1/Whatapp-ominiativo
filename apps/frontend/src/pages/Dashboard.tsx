import { lazy, Suspense } from 'react'
import { MetricCard } from '../components/MetricCard'
import {
  CurrencyDollarIcon,
  UsersIcon,
  ShoppingCartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline'

const SalesChart = lazy(() => import('../components/dashboard/SalesChart').then((module) => ({ default: module.SalesChart })))
const RecentOrders = lazy(() => import('../components/dashboard/RecentOrders').then((module) => ({ default: module.RecentOrders })))

const metrics = [
  {
    title: 'Receita Total',
    value: 'R$ 609,30',
    changeLabel: '+12% este mês',
    icon: <CurrencyDollarIcon className="h-6 w-6 text-brand-600" />,
    accentColor: 'bg-emerald-100',
  },
  {
    title: 'Clientes Ativos',
    value: '3',
    changeLabel: '+8 novos',
    icon: <UsersIcon className="h-6 w-6 text-brand-600" />,
    accentColor: 'bg-brand-100',
  },
  {
    title: 'Pedidos do Mês',
    value: '3',
    icon: <ShoppingCartIcon className="h-6 w-6 text-brand-600" />,
    accentColor: 'bg-purple-100',
  },
  {
    title: 'Campanhas Ativas',
    value: '1',
    icon: <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-brand-600" />,
    accentColor: 'bg-orange-100',
  },
]

const salesData = [
  { day: 'qui', value: 120 },
  { day: 'sex', value: 180 },
  { day: 'sáb', value: 240 },
  { day: 'dom', value: 210 },
  { day: 'seg', value: 320 },
  { day: 'ter', value: 450 },
  { day: 'qua', value: 680 },
]

const recentOrders = [
  {
    id: '1',
    customer: 'João Silva',
    phone: '(11) 98765-4321',
    status: 'Pago' as const,
    total: 229.7,
    items: 2,
    timestamp: '19 de novembro às 11:55',
  },
  {
    id: '2',
    customer: 'Maria Santos',
    phone: '(11) 98888-7777',
    status: 'Enviado' as const,
    total: 199.9,
    items: 1,
    timestamp: '19 de novembro às 11:55',
  },
  {
    id: '3',
    customer: 'Ana Oliveira',
    phone: '(11) 97777-6666',
    status: 'Novo' as const,
    total: 179.7,
    items: 1,
    timestamp: '19 de novembro às 11:55',
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Visão geral do seu negócio</p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Suspense fallback={<div className="h-80 rounded-2xl bg-white/60">Carregando gráfico...</div>}>
          <SalesChart data={salesData} />
        </Suspense>
        <Suspense fallback={<div className="h-80 rounded-2xl bg-white/60">Carregando pedidos...</div>}>
          <RecentOrders orders={recentOrders} />
        </Suspense>
      </section>
    </div>
  )
}
