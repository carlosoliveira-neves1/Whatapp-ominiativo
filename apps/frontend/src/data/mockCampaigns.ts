export type CampaignStatus = 'agendada' | 'ativa' | 'finalizada' | 'rascunho'

export type Campaign = {
  id: string
  name: string
  status: CampaignStatus
  scheduledAt: string | null
  sentCount: number
  deliveredCount: number
  readCount: number
  repliedCount: number
  segment: string
}

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Black Friday 2024',
    status: 'finalizada',
    scheduledAt: '2024-11-24T10:00:00',
    sentCount: 1200,
    deliveredCount: 1180,
    readCount: 890,
    repliedCount: 145,
    segment: 'Todos os clientes',
  },
  {
    id: '2',
    name: 'Promoção de Natal',
    status: 'agendada',
    scheduledAt: '2024-12-20T09:00:00',
    sentCount: 0,
    deliveredCount: 0,
    readCount: 0,
    repliedCount: 0,
    segment: 'Clientes VIP',
  },
  {
    id: '3',
    name: 'Recuperação de inativos',
    status: 'ativa',
    scheduledAt: '2024-11-18T14:00:00',
    sentCount: 350,
    deliveredCount: 340,
    readCount: 210,
    repliedCount: 45,
    segment: 'Inativos 30+ dias',
  },
  {
    id: '4',
    name: 'Aniversariantes do mês',
    status: 'rascunho',
    scheduledAt: null,
    sentCount: 0,
    deliveredCount: 0,
    readCount: 0,
    repliedCount: 0,
    segment: 'Aniversariantes',
  },
]
