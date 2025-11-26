import type { Product } from '../../data/mockProducts'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock === 0

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-soft transition hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60">
            <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-800">
              Esgotado
            </span>
          </div>
        )}
        {!product.active && !isOutOfStock && (
          <div className="absolute right-2 top-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
            Inativo
          </div>
        )}
      </div>

      <div className="p-4">
        <span className="text-xs font-medium text-slate-400">{product.category}</span>
        <h3 className="mt-1 font-semibold text-slate-800">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">{product.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-800">R$ {product.price.toFixed(2)}</span>
          <span className="text-xs text-slate-400">{product.stock} em estoque</span>
        </div>

        <button
          disabled={isOutOfStock}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
        >
          <ChatBubbleLeftRightIcon className="h-4 w-4" />
          Enviar via WhatsApp
        </button>
      </div>
    </div>
  )
}
