"use client";

import { useAuth } from "@/app/context/auth-context";
import { ProtectedRoute } from "@/app/components/common/protected-route";
import { HomeHeader } from "./components/home/header.";
import { HomeMain } from "./components/home/main";

export default function Home() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-linear-to-tr from-zinc-100 via-white to-zinc-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 font-sans text-zinc-900 dark:text-white">
        <HomeHeader onLogout={handleLogout} />
        <HomeMain user={user} />
      </div>
    </ProtectedRoute>
  );
}
