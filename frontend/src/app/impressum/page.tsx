import { Card, CardHeader, CardBody } from "@/components/ui";

export default function ImpressumPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-gray-900">Impressum</h1>
        </CardHeader>
        <CardBody>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600">
              Angaben gemäß § 5 TMG werden hier eingefügt.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
