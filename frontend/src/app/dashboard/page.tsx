"use client";

import { useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardHeader, CardBody, Badge, StatusBadge } from "@/components/ui";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Willkommen zurück, {user?.username || user?.email}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Verification Status Card */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                Verifizierungsstatus
              </h2>
            </CardHeader>
            <CardBody>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status</span>
                <StatusBadge status={user?.verificationStatus || "UNVERIFIED"} />
              </div>
              {user?.verifiedAt && (
                <div className="mt-2 text-sm text-gray-500">
                  Verifiziert am:{" "}
                  {new Date(user.verifiedAt).toLocaleDateString("de-DE")}
                </div>
              )}
            </CardBody>
          </Card>

          {/* DID Card */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                Dezentrale Identität
              </h2>
            </CardHeader>
            <CardBody>
              {user?.did ? (
                <div className="space-y-2">
                  <Badge variant="success">DID erstellt</Badge>
                  <p className="text-sm text-gray-600 break-all font-mono">
                    {user.did}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">
                  Noch keine DID erstellt. Bitte zuerst verifizieren.
                </p>
              )}
            </CardBody>
          </Card>

          {/* Credentials Card */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                Verifiable Credentials
              </h2>
            </CardHeader>
            <CardBody>
              {user?.hasVC ? (
                <Badge variant="success">VC ausgestellt</Badge>
              ) : (
                <p className="text-gray-500">
                  Noch keine Credentials vorhanden.
                </p>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              Schnellaktionen
            </h2>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-4">
              <a
                href="/verification"
                className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                Verifizierung starten
              </a>
              <a
                href="/credentials"
                className="inline-flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Credentials anzeigen
              </a>
            </div>
          </CardBody>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
