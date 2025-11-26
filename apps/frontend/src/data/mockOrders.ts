export type OrderStatus = 'novo' | 'analise' | 'pago' | 'enviado' | 'concluido'

export type Order = {
  id: string
  customer: string
  phone: string
  items: string[]
  total: number
  status: OrderStatus
  createdAt: string
  campaign?: string
}

export const mockOrders: Order[] = [
  {
    id: '1',
    customer: 'João Silva',
    phone: '(11) 98765-4321',
    items: ['Camiseta P', 'Calça M'],
    total: 229.7,
    status: 'pago',
    createdAt: '2024-11-19T11:55:00',
    campaign: 'Black Friday 2024',
  },
  {
    id: '2',
    customer: 'Maria Santos',
    phone: '(11) 98888-7777',
    items: ['Vestido G'],
    total: 199.9,
    status: 'enviado',
    createdAt: '2024-11-19T10:30:00',
  },
  {
    id: '3',
    customer: 'Ana Oliveira',
    phone: '(11) 97777-6666',
    items: ['Blusa M'],
    total: 179.7,
    status: 'novo',
    createdAt: '2024-11-19T09:15:00',
    campaign: 'Black Friday 2024',
  },
  {
    id: '4',
    customer: 'Carlos Pereira',
    phone: '(11) 96666-5555',
    items: ['Tênis 42', 'Meia'],
    total: 320.0,
    status: 'analise',
    createdAt: '2024-11-18T16:00:00',
  },
  {
    id: '5',
    customer: 'Fernanda Lima',
    phone: '(11) 95555-4444',
    items: ['Jaqueta M', 'Cachecol'],
    total: 450.0,
    status: 'concluido',
    createdAt: '2024-11-17T14:20:00',
  },
]

export const orderStatusLabels: Record<OrderStatus, string> = {
  novo: 'Novo',
  analise: 'Em análise',
  pago: 'Pago',
  enviado: 'Enviado',
  concluido: 'Concluído',
}

export const orderStatusColors: Record<OrderStatus, string> = {
  novo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  analise: 'bg-amber-100 text-amber-700 border-amber-200',
  pago: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  enviado: 'bg-blue-100 text-blue-700 border-blue-200',
  concluido: 'bg-slate-100 text-slate-600 border-slate-200',
}
