import type { Campaign, CampaignStatus } from '../../data/mockCampaigns'
import {
  CalendarIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline'

const statusColors: Record<CampaignStatus, string> = {
  agendada: 'bg-amber-100 text-amber-700',
  ativa: 'bg-emerald-100 text-emerald-700',
  finalizada: 'bg-slate-100 text-slate-600',
  rascunho: 'bg-indigo-100 text-indigo-700',
}

const statusLabels: Record<CampaignStatus, string> = {
  agendada: 'Agendada',
  ativa: 'Ativa',
  finalizada: 'Finalizada',
  rascunho: 'Rascunho',
}

type CampaignCardProps = {
  campaign: Campaign
  onClick?: () => void
}

export function CampaignCard({ campaign, onClick }: CampaignCardProps) {
  const deliveryRate = campaign.sentCount > 0 ? (campaign.deliveredCount / campaign.sentCount) * 100 : 0
  const readRate = campaign.deliveredCount > 0 ? (campaign.readCount / campaign.deliveredCount) * 100 : 0

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl bg-white p-6 shadow-soft transition hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{campaign.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{campaign.segment}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[campaign.status]}`}>
          {statusLabels[campaign.status]}
        </span>
      </div>

      {campaign.scheduledAt && (
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <CalendarIcon className="h-4 w-4" />
          {new Date(campaign.scheduledAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      )}

      {campaign.status !== 'rascunho' && campaign.sentCount > 0 && (
        <div className="mt-6 grid grid-cols-4 gap-4 border-t border-slate-100 pt-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400">
              <PaperAirplaneIcon className="h-4 w-4" />
            </div>
            <p className="mt-1 text-lg font-semibold text-slate-800">{campaign.sentCount}</p>
            <p className="text-xs text-slate-400">Enviadas</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-500">
              <CheckCircleIcon className="h-4 w-4" />
            </div>
            <p className="mt-1 text-lg font-semibold text-slate-800">{deliveryRate.toFixed(0)}%</p>
            <p className="text-xs text-slate-400">Entregues</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-brand-500">
              <EyeIcon className="h-4 w-4" />
            </div>
            <p className="mt-1 text-lg font-semibold text-slate-800">{readRate.toFixed(0)}%</p>
            <p className="text-xs text-slate-400">Lidas</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-purple-500">
              <ChatBubbleLeftIcon className="h-4 w-4" />
            </div>
            <p className="mt-1 text-lg font-semibold text-slate-800">{campaign.repliedCount}</p>
            <p className="text-xs text-slate-400">Respostas</p>
          </div>
        </div>
      )}
    </div>
  )
}
