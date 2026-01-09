"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardHeader, CardBody } from "@/components/ui";

export default function CredentialsPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meine Credentials</h1>
          <p className="text-gray-600 mt-1">
            Verwalten Sie hier Ihre Verifiable Credentials.
          </p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              Credentials-Liste
            </h2>
          </CardHeader>
          <CardBody>
            <p className="text-gray-600">
              Ihre Verifiable Credentials werden hier angezeigt, sobald sie
              ausgestellt wurden.
            </p>
          </CardBody>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
