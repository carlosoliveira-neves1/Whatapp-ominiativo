import { useState } from 'react'
import { mockCampaigns } from '../data/mockCampaigns'
import type { CampaignStatus } from '../data/mockCampaigns'
import { CampaignCard } from '../components/campaigns/CampaignCard'
import { PlusIcon } from '@heroicons/react/24/outline'

const tabs: { value: CampaignStatus | ''; label: string }[] = [
  { value: '', label: 'Todas' },
  { value: 'ativa', label: 'Ativas' },
  { value: 'agendada', label: 'Agendadas' },
  { value: 'finalizada', label: 'Finalizadas' },
  { value: 'rascunho', label: 'Rascunhos' },
]

export default function Campaigns() {
  const [activeTab, setActiveTab] = useState<CampaignStatus | ''>('')

  const filteredCampaigns = activeTab
    ? mockCampaigns.filter((c) => c.status === activeTab)
    : mockCampaigns

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Campanhas</h1>
          <p className="text-sm text-slate-500">Crie e acompanhe campanhas de WhatsApp</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700">
          <PlusIcon className="h-5 w-5" />
          Nova campanha
        </button>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={[
              'rounded-lg px-4 py-2 text-sm font-medium transition',
              activeTab === tab.value
                ? 'bg-brand-600 text-white'
                : 'text-slate-600 hover:bg-slate-100',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-400">
          Nenhuma campanha encontrada nesta categoria.
        </div>
      )}
    </div>
  )
}
