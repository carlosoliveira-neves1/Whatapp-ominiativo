import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type SalesChartProps = {
  data: { day: string; value: number }[]
}

export function SalesChart({ data }: SalesChartProps) {
  return (
    <div className="flex h-80 flex-col rounded-2xl bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Vendas dos Últimos 7 Dias</p>
          <p className="text-base font-semibold text-slate-900">Total diário em R$</p>
        </div>
      </div>
      <div className="mt-6 h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, bottom: 0, left: 0, right: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="8 8" stroke="#e2e8f0" />
            <XAxis dataKey="day" stroke="#94a3b8" axisLine={false} tickLine={false} />
            <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} tickFormatter={(value) => `R$ ${value}`} />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 8px 20px rgba(15, 23, 42, 0.08)' }}
              formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Vendas']}
              labelFormatter={(label) => `Dia ${label}`}
            />
            <Area type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={3} fill="url(#colorSales)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
