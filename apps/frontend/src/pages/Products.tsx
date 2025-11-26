import { useState } from 'react'
import { mockProducts } from '../data/mockProducts'
import { ProductCard } from '../components/products/ProductCard'
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const categories = ['Todos', 'Roupas', 'Calçados', 'Acessórios']

export default function Products() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todos')

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'Todos' || product.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Produtos</h1>
          <p className="text-sm text-slate-500">Gerencie seu catálogo e envie via WhatsApp</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700">
          <PlusIcon className="h-5 w-5" />
          Novo produto
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={[
                'rounded-xl px-4 py-2 text-sm font-medium transition',
                category === cat
                  ? 'bg-brand-600 text-white shadow-soft'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-400">
          Nenhum produto encontrado.
        </div>
      )}
    </div>
  )
}
