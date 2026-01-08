"use client";

import { useState, useEffect } from "react";
import { User } from "@/types";
import { authService } from "@/services/authService";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load user from localStorage or session
    const loadUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const userData = await authService.getCurrentUser(userId);
          setUser(userData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("userId", userData.id);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userId");
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
