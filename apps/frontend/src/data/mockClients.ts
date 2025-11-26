export type ClientStatus = 'ativo' | 'inativo' | 'vip' | 'novo'

export type Client = {
  id: string
  name: string
  phone: string
  email: string
  tags: string[]
  status: ClientStatus
  lastOrderAt: string | null
  totalSpent: number
  ordersCount: number
}

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'João Silva',
    phone: '(11) 98765-4321',
    email: 'joao.silva@email.com',
    tags: ['VIP', 'Aniversariante'],
    status: 'vip',
    lastOrderAt: '2024-11-19',
    totalSpent: 1250.0,
    ordersCount: 8,
  },
  {
    id: '2',
    name: 'Maria Santos',
    phone: '(11) 98888-7777',
    email: 'maria.santos@email.com',
    tags: ['Frequente'],
    status: 'ativo',
    lastOrderAt: '2024-11-15',
    totalSpent: 890.5,
    ordersCount: 5,
  },
  {
    id: '3',
    name: 'Ana Oliveira',
    phone: '(11) 97777-6666',
    email: 'ana.oliveira@email.com',
    tags: ['Novo'],
    status: 'novo',
    lastOrderAt: '2024-11-20',
    totalSpent: 179.7,
    ordersCount: 1,
  },
  {
    id: '4',
    name: 'Carlos Pereira',
    phone: '(11) 96666-5555',
    email: 'carlos.pereira@email.com',
    tags: ['Inativo'],
    status: 'inativo',
    lastOrderAt: '2024-09-10',
    totalSpent: 450.0,
    ordersCount: 3,
  },
  {
    id: '5',
    name: 'Fernanda Lima',
    phone: '(11) 95555-4444',
    email: 'fernanda.lima@email.com',
    tags: ['VIP', 'Frequente'],
    status: 'vip',
    lastOrderAt: '2024-11-18',
    totalSpent: 2100.0,
    ordersCount: 12,
  },
  {
    id: '6',
    name: 'Roberto Costa',
    phone: '(11) 94444-3333',
    email: 'roberto.costa@email.com',
    tags: ['Aniversariante'],
    status: 'ativo',
    lastOrderAt: '2024-11-12',
    totalSpent: 320.0,
    ordersCount: 2,
  },
]
