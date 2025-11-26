import { useState } from 'react'
import { PaperAirplaneIcon, PhotoIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

const templates = [
  { id: '1', name: 'Boas-vindas', preview: 'Olá {nome}! Seja bem-vindo(a) à nossa loja...' },
  { id: '2', name: 'Promoção', preview: 'Aproveite! Desconto especial de {desconto}% em...' },
  { id: '3', name: 'Lembrete de carrinho', preview: 'Oi {nome}, você deixou itens no carrinho...' },
  { id: '4', name: 'Pós-venda', preview: 'Obrigado pela compra, {nome}! Como foi sua experiência?' },
]

export default function Messages() {
  const [message, setMessage] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const handleTemplateClick = (template: typeof templates[0]) => {
    setSelectedTemplate(template.id)
    setMessage(template.preview)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Enviar Mensagens</h1>
        <p className="text-sm text-slate-500">Envie mensagens rápidas ou use templates prontos</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Composer */}
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="mb-4 font-semibold text-slate-800">Compor mensagem</h2>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-slate-600">Destinatários</label>
            <input
              type="text"
              placeholder="Selecione clientes ou segmentos..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-slate-600">Mensagem</label>
            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem aqui..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div className="mb-6 flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50">
              <PhotoIcon className="h-4 w-4" />
              Imagem
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50">
              <DocumentTextIcon className="h-4 w-4" />
              Documento
            </button>
          </div>

          <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700">
            <PaperAirplaneIcon className="h-5 w-5" />
            Enviar mensagem
          </button>
        </div>

        {/* Templates */}
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="mb-4 font-semibold text-slate-800">Templates rápidos</h2>
          <div className="space-y-3">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateClick(template)}
                className={[
                  'w-full rounded-xl border p-4 text-left transition',
                  selectedTemplate === template.id
                    ? 'border-brand-400 bg-brand-50'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50',
                ].join(' ')}
              >
                <p className="font-medium text-slate-800">{template.name}</p>
                <p className="mt-1 line-clamp-2 text-xs text-slate-500">{template.preview}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-slate-200 p-4 text-center">
            <p className="text-xs text-slate-400">
              Em breve: editor de templates com variáveis dinâmicas
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
