import { useState } from 'react'
import {
  PaperAirplaneIcon,
  PhotoIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'
import { useWhatsApp } from '../hooks/useWhatsApp'
import { mockClients } from '../data/mockClients'

const templates = [
  { id: '1', name: 'Boas-vindas', preview: 'Olá {nome}! Seja bem-vindo(a) à nossa loja...' },
  { id: '2', name: 'Promoção', preview: 'Aproveite! Desconto especial de {desconto}% em...' },
  { id: '3', name: 'Lembrete de carrinho', preview: 'Oi {nome}, você deixou itens no carrinho...' },
  { id: '4', name: 'Pós-venda', preview: 'Obrigado pela compra, {nome}! Como foi sua experiência?' },
]

type SendStatus = 'idle' | 'sending' | 'success' | 'error'

export default function Messages() {
  const { status: whatsappStatus, sendMessage } = useWhatsApp()
  const [message, setMessage] = useState('')
  const [recipient, setRecipient] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [sendStatus, setSendStatus] = useState<SendStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleTemplateClick = (template: typeof templates[0]) => {
    setSelectedTemplate(template.id)
    setMessage(template.preview)
  }

  const handleSend = async () => {
    if (!recipient || !message) {
      setErrorMessage('Preencha o destinatário e a mensagem')
      setSendStatus('error')
      return
    }

    if (whatsappStatus !== 'connected') {
      setErrorMessage('WhatsApp não está conectado. Vá para Conexão WhatsApp.')
      setSendStatus('error')
      return
    }

    setSendStatus('sending')
    setErrorMessage('')

    try {
      await sendMessage(recipient, message)
      setSendStatus('success')
      setMessage('')
      setRecipient('')
      setSelectedTemplate(null)

      // Reset status after 3 seconds
      setTimeout(() => setSendStatus('idle'), 3000)
    } catch (error) {
      setErrorMessage((error as Error).message)
      setSendStatus('error')
    }
  }

  const isConnected = whatsappStatus === 'connected'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Enviar Mensagens</h1>
          <p className="text-sm text-slate-500">Envie mensagens rápidas ou use templates prontos</p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`h-2.5 w-2.5 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-slate-300'}`}
          />
          <span className="text-sm text-slate-600">
            {isConnected ? 'WhatsApp conectado' : 'WhatsApp desconectado'}
          </span>
        </div>
      </div>

      {!isConnected && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800">
            <strong>Atenção:</strong> Conecte seu WhatsApp primeiro para enviar mensagens.{' '}
            <a href="/whatsapp" className="underline hover:no-underline">
              Ir para Conexão WhatsApp
            </a>
          </p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Composer */}
        <div className="rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="mb-4 font-semibold text-slate-800">Compor mensagem</h2>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-slate-600">Destinatário</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Número com DDD (ex: 11999998888)"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {mockClients.slice(0, 3).map((client) => (
                <button
                  key={client.id}
                  onClick={() => setRecipient(client.phone.replace(/\D/g, ''))}
                  className="rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-600 hover:bg-slate-200"
                >
                  {client.name}
                </button>
              ))}
            </div>
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

          {sendStatus === 'error' && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
              <ExclamationCircleIcon className="h-5 w-5" />
              {errorMessage}
            </div>
          )}

          {sendStatus === 'success' && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">
              <CheckCircleIcon className="h-5 w-5" />
              Mensagem enviada com sucesso!
            </div>
          )}

          <button
            onClick={handleSend}
            disabled={sendStatus === 'sending' || !isConnected}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
            {sendStatus === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
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
