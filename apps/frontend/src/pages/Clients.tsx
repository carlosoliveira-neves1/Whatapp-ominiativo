import { useState, useMemo } from 'react'
import { mockClients } from '../data/mockClients'
import type { Client } from '../data/mockClients'
import { ClientsTable } from '../components/clients/ClientsTable'
import { ClientFilters } from '../components/clients/ClientFilters'
import { ClientDrawer } from '../components/clients/ClientDrawer'
import { UserPlusIcon } from '@heroicons/react/24/outline'

export default function Clients() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  const filteredClients = useMemo(() => {
    return mockClients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.phone.includes(search) ||
        client.email.toLowerCase().includes(search.toLowerCase())

      const matchesStatus = statusFilter === '' || client.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Clientes</h1>
          <p className="text-sm text-slate-500">Gerencie sua base de clientes e acompanhe o histórico</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700">
          <UserPlusIcon className="h-5 w-5" />
          Novo cliente
        </button>
      </div>

      <ClientFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <ClientsTable clients={filteredClients} onSelect={setSelectedClient} />

      <ClientDrawer client={selectedClient} onClose={() => setSelectedClient(null)} />
    </div>
  )
}
