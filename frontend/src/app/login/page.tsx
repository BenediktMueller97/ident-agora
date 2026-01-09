"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button, Spinner } from "@/components/ui";

export default function LoginPage() {
  const { isAuthenticated, loading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Login</h1>
        <p className="text-gray-600 mb-6">
          Melden Sie sich mit Ihrem Keycloak-Konto an, um fortzufahren.
        </p>
        <Button onClick={login} className="w-full" size="lg">
          Mit Keycloak anmelden
        </Button>
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Zur\u00fcck zur Startseite
          </a>
        </div>
      </div>
    </div>
  );
}
