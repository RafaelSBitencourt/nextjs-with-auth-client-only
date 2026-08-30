"use client";

import { useState, useEffect } from "react";
import {
  User,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/app/data/users";

interface AdminUserListProps {
  admin: boolean;
}

export function AdminUserList({ admin }: AdminUserListProps) {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Estados do formulário de criação
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [submitting, setSubmitting] = useState(false);

  // Estados de processamento (para mostrar loading spinner por usuário)
  const [pendingDeletes, setPendingDeletes] = useState<string[]>([]);
  const [pendingUpdates, setPendingUpdates] = useState<string[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsersList(data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setSubmitting(true);
    try {
      const newUser = await createUser({
        name,
        email,
        password,
        role,
      });
      setUsersList((prev) => [...prev, newUser]);
      setName("");
      setEmail("");
      setPassword("");
      setRole("user");
      setIsFormOpen(false);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleRole = async (user: User) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    setPendingUpdates((prev) => [...prev, user.id]);
    try {
      const updated = await updateUser(user.id, { role: newRole });
      if (updated) {
        setUsersList((prev) =>
          prev.map((u) => (u.id === user.id ? updated : u)),
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar cargo do usuário:", error);
    } finally {
      setPendingUpdates((prev) => prev.filter((id) => id !== user.id));
    }
  };

  const handleDelete = async (id: string) => {
    setPendingDeletes((prev) => [...prev, id]);
    try {
      const success = await deleteUser(id);
      if (success) {
        setUsersList((prev) => prev.filter((u) => u.id !== id));
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    } finally {
      setPendingDeletes((prev) => prev.filter((pid) => pid !== id));
    }
  };

  return (
    <div
      className={`bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-6 py-10 shadow-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl sm:px-12 animate-fade-in ${
        admin && "flex-1"
      } `}
    >
      {/* Cabeçalho */}
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
            Gerenciamento assíncrono de usuários (simulando requisições HTTP).
          </p>
        </div>

        <div className="flex items-center justify-center sm:justify-end">
          <span className="inline-flex items-center justify-center rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 border border-red-500/20 whitespace-nowrap text-center">
            Acesso Admin
          </span>
        </div>
      </div>

      {/* Botão de Novo Usuário (Linha abaixo) */}
      <div className="mt-6 flex justify-start">
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-semibold shadow-md shadow-indigo-500/15 hover:shadow-indigo-500/25 transition-all duration-150 active:scale-95 cursor-pointer whitespace-nowrap"
        >
          {isFormOpen ? "Cancelar" : "+ Novo Usuário"}
        </button>
      </div>

      {/* Formulário de Criação (Toggled) */}
      {isFormOpen && (
        <form
          onSubmit={handleCreate}
          className="mt-6 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/50 dark:border-zinc-800/50 space-y-4 animate-slide-down"
        >
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
            Cadastrar Novo Usuário
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                Nome completo
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-zinc-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/25"
                placeholder="Ex: Carlos Silva"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                E-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-zinc-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/25"
                placeholder="carlos@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                Senha
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-zinc-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/25"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                Nível de acesso
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-zinc-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/25"
              >
                <option value="user">Usuário Comum</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <div className="flex items-center gap-1.5">
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
                  <span>Criando...</span>
                </div>
              ) : (
                "Salvar Usuário"
              )}
            </button>
          </div>
        </form>
      )}

      {/* Tabela de Usuários */}
      <div className="mt-6 overflow-x-auto">
        {loading ? (
          /* Skeleton Loader */
          <div className="space-y-4 py-2">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="flex items-center justify-between py-3.5 border-b border-zinc-150 dark:border-zinc-800 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-zinc-200 dark:bg-zinc-850"></div>
                  <div className="space-y-1.5">
                    <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-850 rounded-sm"></div>
                    <div className="h-3 w-16 bg-zinc-150 dark:bg-zinc-850/80 rounded-sm"></div>
                  </div>
                </div>
                <div className="h-5 w-20 bg-zinc-200 dark:bg-zinc-850 rounded-full"></div>
                <div className="h-4 w-8 bg-zinc-150 dark:bg-zinc-850 rounded-sm"></div>
                <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-850 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
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
                  Nível de Acesso (Clique p/ alternar)
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="relative py-3.5 pl-3 pr-4 text-right text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/40 dark:divide-zinc-800/40">
              {usersList.map((item) => {
                const isItemAdmin = item.role === "admin";
                const isDeleting = pendingDeletes.includes(item.id);
                const isUpdating = pendingUpdates.includes(item.id);

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors duration-150 ${
                      isDeleting && "opacity-45 pointer-events-none"
                    }`}
                  >
                    {/* Informações básicas */}
                    <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-xs select-none ${
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

                    {/* Email */}
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                      {item.email}
                    </td>

                    {/* Role (Permissão) - Clique para alterar */}
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <button
                        onClick={() => handleToggleRole(item)}
                        disabled={isUpdating}
                        title="Clique para alternar permissão"
                        className="inline-flex items-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
                      >
                        {isUpdating ? (
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border border-zinc-200 dark:border-zinc-850 animate-pulse`}
                          >
                            <div className="h-3 w-3 animate-spin rounded-full border-2 border-zinc-400 border-t-zinc-600 dark:border-zinc-700 dark:border-t-zinc-300"></div>
                            Alterando...
                          </span>
                        ) : (
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border transition-colors ${
                              isItemAdmin
                                ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50 hover:bg-red-100/50 dark:hover:bg-red-900/40"
                                : "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/50 hover:bg-green-100/50 dark:hover:bg-green-900/40"
                            }`}
                          >
                            {isItemAdmin ? "Administrador" : "Usuário Comum"}
                          </span>
                        )}
                      </button>
                    </td>

                    {/* ID */}
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-400 font-mono text-xs">
                      {item.id}
                    </td>

                    {/* Botões de Ação */}
                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={isDeleting}
                        title="Excluir Usuário"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-zinc-400 hover:text-red-650 dark:hover:text-red-400 transition-colors cursor-pointer"
                      >
                        {isDeleting ? (
                          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-zinc-350 border-t-red-600 dark:border-zinc-700 dark:border-t-red-400"></div>
                        ) : (
                          <svg
                            className="h-4.5 w-4.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 0v3M4 7h16"
                            />
                          </svg>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
