"use client";

import { useAuth } from "@/app/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-900 dark:border-zinc-800 dark:border-t-zinc-100"></div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 animate-pulse">
            Carregando sua sessão...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Evita mostrar a página protegida brevemente antes do redirect
  }

  return <>{children}</>;
}
