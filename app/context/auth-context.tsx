"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserByEmail, type User } from "../data/users";


interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncUser = () => {
      try {
        const storedUser = localStorage.getItem("auth_user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch (error) {
        console.error("Erro ao ler usuário do localStorage:", error);
      } finally {
        setLoading(false);
      }
    };

    queueMicrotask(syncUser);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth_user") {
        syncUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const foundUser = await getUserByEmail(email);

      if (foundUser && foundUser.password === password) {
        const loggedUser: User = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
        };
        setUser(loggedUser);
        localStorage.setItem("auth_user", JSON.stringify(loggedUser));
        return { success: true };
      }
      return { success: false, message: "E-mail ou senha incorretos." };
    } catch (error) {
      console.error("Erro durante o login:", error);
      return {
        success: false,
        message: "Ocorreu um erro ao realizar o login.",
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
