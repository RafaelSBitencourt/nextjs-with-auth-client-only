import { User } from "@/app/context/auth-context";
import { AdminUserList } from "@/app/components/home/admin-user-list";

interface HomeMainProps {
  user: User | null;
}

export function HomeMain({ user }: HomeMainProps) {
  if (!user) {
    return null;
  }
  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8  flex flex-col justify-center ">
      <div
        className={`mx-auto w-full  ${user?.role === "admin" && "flex gap-5"} `}
      >
        <div
          className={`bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-6 py-10 shadow-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl sm:px-12  ${user?.role === "admin" && "flex-1"} `}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-zinc-200/65 dark:border-zinc-850">
            {/* Avatar */}
            <div className="h-20 w-20 rounded-full bg-linear-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-3xl font-extrabold text-white shadow-lg shadow-indigo-500/20">
              {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  Olá, {user?.name}!
                </h1>
                <span
                  className={`mx-auto sm:mx-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                    user?.role === "admin"
                      ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50"
                      : "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/50"
                  }`}
                >
                  {user?.role === "admin" ? "Administrador" : "Usuário Comum"}
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Bem-vindo de volta ao seu painel privado.
              </p>
            </div>
          </div>

          {/* Informações da conta */}
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-base font-semibold leading-6 text-zinc-900 dark:text-white">
                Informações da Sessão Ativa
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-zinc-500 dark:text-zinc-400">
                Estes dados estão sendo gerenciados e persistidos no lado do
                cliente.
              </p>
            </div>

            <div className="border-t border-zinc-200/50 dark:border-zinc-850/50 pt-4">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Identificador (ID)
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-900 dark:text-white font-mono bg-zinc-50 dark:bg-zinc-950 px-2 py-1 rounded-md border border-zinc-200/30 dark:border-zinc-800/30 w-fit">
                    {user?.id}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Endereço de E-mail
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-900 dark:text-white">
                    {user?.email}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Nível de Acesso (Role)
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-900 dark:text-white capitalize">
                    {user?.role}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Persistência
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-900 dark:text-white flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    localStorage
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 p-5 border border-indigo-100 dark:border-indigo-900/50">
            <div className="flex gap-3">
              <svg
                className="h-5 w-5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h4 className="text-sm font-semibold text-indigo-900 dark:text-indigo-250">
                  Como funciona essa proteção de rota?
                </h4>
                <p className="mt-1 text-xs text-indigo-700/90 dark:text-indigo-350 leading-relaxed">
                  Se você tentar abrir uma aba anônima e acessar diretamente
                  esta página, o wrapper{" "}
                  <code className="font-mono bg-indigo-100/50 dark:bg-indigo-900/40 px-1 rounded">
                    ProtectedRoute
                  </code>{" "}
                  detectará a ausência do usuário autenticado no{" "}
                  <code className="font-mono">AuthContext</code> e o
                  redirecionará imediatamente para a tela de login.
                </p>
              </div>
            </div>
          </div>
        </div>
        {user?.role === "admin" && (
          <AdminUserList admin={user?.role === "admin"} />
        )}
      </div>
    </main>
  );
}
