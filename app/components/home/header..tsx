interface HomeHeaderProps {
  onLogout: () => void;
}

export function HomeHeader({ onLogout }: HomeHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-linear-to-tr from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/10">
            <svg
              className="h-5 w-5 text-white"
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
          <span className="font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-400">
            AuthBoilerplate
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onLogout}
            className="inline-flex items-center justify-center rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-all duration-150 active:scale-95 cursor-pointer"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
