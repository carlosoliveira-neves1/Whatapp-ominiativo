export type Customer = {
  id: string
  name: string
  phone: string
  email?: string
  tags: string[]
  lastOrderAt?: string
  status?: 'novo' | 'ativo' | 'inativo' | 'vip'
}
