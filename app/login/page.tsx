"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/context/auth-context";
import { useRouter } from "next/navigation";
import { LoginHeader } from "@/app/components/login/header";
import { LoginForm } from "@/app/components/login/form";
import { LoginFooter } from "@/app/components/login/footer";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Redireciona se o usuário já estiver logado
  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-linear-to-tr from-zinc-100 via-white to-zinc-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 font-sans">
      <LoginHeader />

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-4 py-8 shadow-xl border border-zinc-200/50 dark:border-zinc-800/50 sm:rounded-2xl sm:px-10">
          <LoginForm />
          <LoginFooter />
        </div>
      </div>
    </div>
  );
}
