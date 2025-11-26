type UnderConstructionProps = {
  title: string
  description: string
}

export function UnderConstruction({ title, description }: UnderConstructionProps) {
  return (
    <div className="rounded-2xl border border-dashed border-brand-200 bg-white/70 p-10 text-center shadow-soft">
      <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  )
}
