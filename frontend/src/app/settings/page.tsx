"use client";

import { useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardHeader, CardBody } from "@/components/ui";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Einstellungen</h1>
          <p className="text-gray-600 mt-1">
            Verwalten Sie hier Ihre Kontoeinstellungen.
          </p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              Kontoinformationen
            </h2>
          </CardHeader>
          <CardBody>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Benutzername
                </dt>
                <dd className="mt-1 text-gray-900">
                  {user?.username || "-"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">E-Mail</dt>
                <dd className="mt-1 text-gray-900">{user?.email || "-"}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Erstellt am
                </dt>
                <dd className="mt-1 text-gray-900">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("de-DE")
                    : "-"}
                </dd>
              </div>
            </dl>
          </CardBody>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
