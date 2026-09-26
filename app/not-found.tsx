import Link from "next/link";
import { ThemeToggle } from "@/app/components/common/theme-toggle";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12 bg-linear-to-tr from-zinc-100 via-white to-zinc-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 font-sans text-zinc-900 dark:text-white">
      {/* Botão de alternância de tema no topo */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md animate-fade-in text-center">
        {/* Card Glassmorphism */}
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-6 py-12 shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl sm:px-10">
          {/* Badge 404 */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Erro 404
          </div>

          {/* Ícone estilizado */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-tr from-indigo-500 to-violet-600 text-white shadow-xl shadow-indigo-500/25">
            <svg
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
            Página não encontrada
          </h1>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
            O endereço que você tentou acessar não existe, foi removido ou está temporariamente indisponível.
          </p>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Voltar ao Início
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-all duration-150 active:scale-95 cursor-pointer"
            >
              Tela de Login
            </Link>
          </div>
        </div>

        {/* Rodapé sutil */}
        <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-500">
          AuthBoilerplate • Navegação Segura
        </p>
      </div>
    </div>
  );
}
