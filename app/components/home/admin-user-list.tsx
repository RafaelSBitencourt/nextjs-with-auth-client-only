"use client";

import { users } from "@/app/data/users";

interface AdminUserListProps {
  admin: boolean;
}

export function AdminUserList({ admin }: AdminUserListProps) {
  return (
    <div
      className={`bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-6 py-10 shadow-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl sm:px-12 animate-fade-in ${admin && "flex-1"} `}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200/65 dark:border-zinc-850">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-red-500/10 dark:bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Painel de Administração
            </h2>
          </div>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Visualização restrita de todos os usuários cadastrados no sistema.
          </p>
        </div>
        <span className="self-start sm:self-center inline-flex items-center rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-semibold text-red-600 dark:text-red-400 border border-red-500/20">
          Acesso Admin
        </span>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200/60 dark:divide-zinc-800">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pr-3 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
              >
                Usuário
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
              >
                E-mail
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
              >
                Nível de Acesso
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
              >
                ID
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/40 dark:divide-zinc-800/40">
            {users.map((item) => {
              const isItemAdmin = item.role === "admin";
              return (
                <tr
                  key={item.id}
                  className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors duration-150"
                >
                  <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-xs ${
                          isItemAdmin
                            ? "bg-linear-to-tr from-rose-500 to-red-600"
                            : "bg-linear-to-tr from-emerald-500 to-teal-600"
                        }`}
                      >
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-zinc-900 dark:text-zinc-150 font-medium">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                    {item.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border ${
                        isItemAdmin
                          ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50"
                          : "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/50"
                      }`}
                    >
                      {isItemAdmin ? "Administrador" : "Usuário Comum"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-400 font-mono text-xs">
                    {item.id}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
