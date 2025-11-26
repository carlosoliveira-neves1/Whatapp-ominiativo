import type { ReactNode } from 'react'

type MetricCardProps = {
  title: string
  value: string
  changeLabel?: string
  icon?: ReactNode
  accentColor?: string
}

export function MetricCard({ title, value, changeLabel, icon, accentColor = 'bg-brand-100' }: MetricCardProps) {
  return (
    <div className="flex flex-1 items-start gap-4 rounded-2xl bg-white p-6 shadow-soft">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${accentColor}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
        {changeLabel ? <p className="mt-1 text-xs font-medium text-success">{changeLabel}</p> : null}
      </div>
    </div>
  )
}
