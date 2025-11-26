import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export function ErrorFallback() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-2xl text-brand-600">
          ⚠️
        </div>
        <h1 className="text-2xl font-semibold text-slate-800">{error.status} — {error.statusText}</h1>
        <p className="mt-2 text-sm text-slate-500">
          {typeof error.data === 'string'
            ? error.data
            : 'Algo inesperado aconteceu. Tente voltar para o dashboard.'}
        </p>
        <a
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
        >
          Voltar ao dashboard
        </a>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl text-orange-500">
        🤖
      </div>
      <h1 className="text-2xl font-semibold text-slate-800">Ops! Algo deu errado.</h1>
      <p className="mt-2 text-sm text-slate-500">
        Não conseguimos carregar essa página agora. Atualize a página ou volte para o dashboard.
      </p>
      <a
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
      >
        Ir para o dashboard
      </a>
    </div>
  )
}
