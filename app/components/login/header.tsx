export function LoginHeader() {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      {/* Logo Mock */}
      <div className="mx-auto h-12 w-12 rounded-xl bg-linear-to-tr from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-400">
        Entrar na sua conta
      </h2>
      <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
        Boilerplate de Autenticação Next.js
      </p>
    </div>
  );
}
