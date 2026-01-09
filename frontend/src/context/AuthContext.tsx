"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import keycloak from "@/lib/keycloak";
import { User } from "@/types";
import { authService } from "@/services/authService";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserFromBackend = useCallback(async (keycloakUserId: string) => {
    try {
      const userData = await authService.getCurrentUser(keycloakUserId);
      setUser(userData);
    } catch (error) {
      console.error("Failed to load user from backend:", error);
    }
  }, []);

  useEffect(() => {
    const kc = keycloak;
    if (!kc) {
      setIsLoading(false);
      return;
    }

    const initKeycloak = async () => {
      try {
        const authenticated = await kc.init({
          onLoad: "check-sso",
          silentCheckSsoRedirectUri:
            typeof window !== "undefined"
              ? `${window.location.origin}/silent-check-sso.html`
              : undefined,
          pkceMethod: "S256",
        });

        setIsAuthenticated(authenticated);

        if (authenticated && kc.token) {
          setToken(kc.token);
          localStorage.setItem("token", kc.token);

          if (kc.subject) {
            await loadUserFromBackend(kc.subject);
          }
        }

        kc.onTokenExpired = () => {
          kc.updateToken(30)
            .then((refreshed) => {
              if (refreshed && kc.token) {
                setToken(kc.token);
                localStorage.setItem("token", kc.token);
              }
            })
            .catch(() => {
              console.error("Failed to refresh token");
              setIsAuthenticated(false);
              setUser(null);
              setToken(null);
              localStorage.removeItem("token");
            });
        };

        kc.onAuthSuccess = async () => {
          if (kc.token) {
            setToken(kc.token);
            localStorage.setItem("token", kc.token);
            setIsAuthenticated(true);

            if (kc.subject) {
              await loadUserFromBackend(kc.subject);
            }
          }
        };

        kc.onAuthLogout = () => {
          setIsAuthenticated(false);
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        };
      } catch (error) {
        console.error("Keycloak initialization failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initKeycloak();
  }, [loadUserFromBackend]);

  const login = useCallback(() => {
    if (keycloak) {
      keycloak.login();
    }
  }, []);

  const logout = useCallback(() => {
    if (keycloak) {
      keycloak.logout({ redirectUri: window.location.origin });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
