"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button, Spinner } from "@/components/ui";

export default function Header() {
  const { isAuthenticated, user, loading, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-indigo-600">
            Ident Agora
          </a>
        </div>
        <nav className="flex items-center gap-6">
          <a
            href="/"
            className="text-gray-600 hover:text-indigo-600 font-medium transition"
          >
            Home
          </a>
          {loading ? (
            <Spinner size="sm" />
          ) : isAuthenticated ? (
            <>
              <span className="text-gray-700 font-medium">
                {user?.username || user?.email}
              </span>
              <Button variant="secondary" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <a
                href="/register"
                className="text-gray-600 hover:text-indigo-600 font-medium transition"
              >
                Register
              </a>
              <a
                href="/login"
                className="text-gray-600 hover:text-indigo-600 font-medium transition"
              >
                Login
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
