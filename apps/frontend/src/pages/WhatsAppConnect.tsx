import { useWhatsApp } from '../hooks/useWhatsApp'
import {
  CheckCircleIcon,
  ArrowPathIcon,
  ArrowRightOnRectangleIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline'

export default function WhatsAppConnect() {
  const { status, qrCode, user, logout } = useWhatsApp()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Conexão WhatsApp</h1>
        <p className="text-sm text-slate-500">Conecte seu WhatsApp para enviar e receber mensagens</p>
      </div>

      <div className="mx-auto max-w-lg">
        <div className="rounded-2xl bg-white p-8 shadow-soft">
          {/* Status indicator */}
          <div className="mb-6 flex items-center justify-center gap-2">
            <div
              className={[
                'h-3 w-3 rounded-full',
                status === 'connected' ? 'bg-emerald-500' : '',
                status === 'connecting' ? 'bg-amber-500 animate-pulse' : '',
                status === 'disconnected' || status === 'logged_out' ? 'bg-slate-300' : '',
              ].join(' ')}
            />
            <span className="text-sm font-medium text-slate-600">
              {status === 'connected' && 'Conectado'}
              {status === 'connecting' && 'Aguardando leitura do QR Code...'}
              {status === 'disconnected' && 'Desconectado'}
              {status === 'logged_out' && 'Sessão encerrada'}
            </span>
          </div>

          {/* Connected state */}
          {status === 'connected' && user && (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircleIcon className="h-10 w-10 text-emerald-600" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800">WhatsApp Conectado!</h2>
              <p className="mt-2 text-sm text-slate-500">
                Conectado como: <strong>{user.name || user.id}</strong>
              </p>
              <p className="mt-1 text-xs text-slate-400">{user.id}</p>

              <button
                onClick={logout}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Desconectar
              </button>
            </div>
          )}

          {/* QR Code state */}
          {status === 'connecting' && qrCode && (
            <div className="text-center">
              <div className="mx-auto mb-4 overflow-hidden rounded-2xl border-4 border-brand-100 bg-white p-2">
                <img src={qrCode} alt="QR Code" className="h-64 w-64" />
              </div>

              <h2 className="text-lg font-semibold text-slate-800">Escaneie o QR Code</h2>
              <p className="mt-2 text-sm text-slate-500">
                Abra o WhatsApp no seu celular, vá em{' '}
                <strong>Configurações → Aparelhos conectados → Conectar aparelho</strong>
              </p>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ArrowPathIcon className="h-4 w-4 animate-spin" />
                O QR Code atualiza automaticamente
              </div>
            </div>
          )}

          {/* Disconnected state */}
          {(status === 'disconnected' || status === 'logged_out') && !qrCode && (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                <DevicePhoneMobileIcon className="h-10 w-10 text-slate-400" />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">
                {status === 'logged_out' ? 'Sessão encerrada' : 'Conectando...'}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                {status === 'logged_out'
                  ? 'Sua sessão foi encerrada. Aguarde o QR Code para reconectar.'
                  : 'Aguarde enquanto preparamos a conexão...'}
              </p>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ArrowPathIcon className="h-4 w-4 animate-spin" />
                Carregando...
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-6 rounded-2xl bg-brand-50 p-6">
          <h3 className="font-semibold text-brand-800">Como funciona?</h3>
          <ol className="mt-3 space-y-2 text-sm text-brand-700">
            <li>1. Abra o WhatsApp no seu celular</li>
            <li>2. Toque em Menu (⋮) ou Configurações</li>
            <li>3. Selecione "Aparelhos conectados"</li>
            <li>4. Toque em "Conectar um aparelho"</li>
            <li>5. Aponte a câmera para o QR Code acima</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
