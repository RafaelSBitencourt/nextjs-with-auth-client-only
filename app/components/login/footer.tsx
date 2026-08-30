export function LoginFooter() {
  return (
    <div className="mt-6 border-t border-zinc-200 dark:border-zinc-800 pt-6">
      <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950 p-4 border border-zinc-150 dark:border-zinc-900 text-xs text-zinc-500 dark:text-zinc-400 space-y-1">
        <p className="font-semibold text-zinc-700 dark:text-zinc-300">Usuários de teste:</p>
        <p>🔑 Administrador: <code className="font-mono text-indigo-600 dark:text-indigo-400">admin@example.com</code> / <code className="font-mono">password123</code></p>
        <p>🔑 Comum: <code className="font-mono text-indigo-600 dark:text-indigo-400">user@example.com</code> / <code className="font-mono">password123</code></p>
      </div>
    </div>
  );
}
