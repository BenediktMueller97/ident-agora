export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  verificationStatus: "UNVERIFIED" | "PENDING" | "VERIFIED" | "REJECTED";
}

export interface VerificationStatus {
  userId: string;
  status: "UNVERIFIED" | "PENDING" | "VERIFIED" | "REJECTED";
  timestamp: string;
}

export interface VerifiableCredential {
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: string;
  credentialSubject: Record<string, unknown>;
}

export interface ApiError {
  message: string;
  status: number;
  details?: string;
}
