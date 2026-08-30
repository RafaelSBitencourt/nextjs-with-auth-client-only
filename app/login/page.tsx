"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/auth-context";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redireciona se o usuário já estiver logado
  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.message || "Credenciais inválidas.");
      } else {
        router.replace("/");
      }
    } catch (err) {
      setError("Ocorreu um erro ao processar sua solicitação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-linear-to-tr from-zinc-100 via-white to-zinc-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 font-sans">
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

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-4 py-8 shadow-xl border border-zinc-200/50 dark:border-zinc-800/50 sm:rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4 border border-red-200/50 dark:border-red-900/50 animate-shake">
                <div className="flex">
                  <div className="shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400 dark:text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-850 dark:text-red-400">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Endereço de E-mail
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 sm:text-sm transition-all duration-200"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Senha
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 sm:text-sm transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-xl bg-linear-to-r from-indigo-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:from-indigo-600 hover:to-violet-750 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
                    <span>Verificando...</span>
                  </div>
                ) : (
                  "Entrar"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 border-t border-zinc-200 dark:border-zinc-800 pt-6">
            <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950 p-4 border border-zinc-150 dark:border-zinc-900 text-xs text-zinc-500 dark:text-zinc-400 space-y-1">
              <p className="font-semibold text-zinc-700 dark:text-zinc-300">Usuários de teste:</p>
              <p>🔑 Administrador: <code className="font-mono text-indigo-600 dark:text-indigo-400">admin@example.com</code> / <code className="font-mono">password123</code></p>
              <p>🔑 Comum: <code className="font-mono text-indigo-600 dark:text-indigo-400">user@example.com</code> / <code className="font-mono">password123</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
