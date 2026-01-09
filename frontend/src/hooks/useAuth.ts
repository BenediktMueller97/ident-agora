"use client";

import { useAuthContext } from "@/context/AuthContext";

export function useAuth() {
  const { user, isLoading, isAuthenticated, login, logout, token } =
    useAuthContext();

  return {
    user,
    loading: isLoading,
    error: null,
    login,
    logout,
    isAuthenticated,
    token,
  };
}
