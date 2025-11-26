import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

type ClientFiltersProps = {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
}

const statuses = [
  { value: '', label: 'Todos' },
  { value: 'vip', label: 'VIP' },
  { value: 'ativo', label: 'Ativos' },
  { value: 'inativo', label: 'Inativos' },
  { value: 'novo', label: 'Novos' },
]

export function ClientFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: ClientFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative flex-1 min-w-[240px]">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar cliente por nome, telefone ou email..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div className="flex gap-2">
        {statuses.map((s) => (
          <button
            key={s.value}
            onClick={() => onStatusChange(s.value)}
            className={[
              'rounded-xl px-4 py-2 text-sm font-medium transition',
              statusFilter === s.value
                ? 'bg-brand-600 text-white shadow-soft'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200',
            ].join(' ')}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
