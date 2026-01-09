"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardHeader, CardBody } from "@/components/ui";

export default function VerificationPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Verifizierung</h1>
          <p className="text-gray-600 mt-1">
            Starten Sie hier Ihre Identitätsverifizierung.
          </p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              Verifizierungsprozess
            </h2>
          </CardHeader>
          <CardBody>
            <p className="text-gray-600">
              Der Verifizierungsprozess wird in einem zukünftigen Update
              implementiert.
            </p>
          </CardBody>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
