export type VerificationStatusType = "UNVERIFIED" | "PENDING" | "VERIFIED" | "REJECTED" | "VC_ISSUED";

export interface User {
  id: string;
  email: string;
  username: string;
  verificationStatus: VerificationStatusType;
  did?: string;
  hasVC: boolean;
  verifiedAt?: string;
  createdAt: string;
}

export interface VerificationStatus {
  userId: string;
  status: VerificationStatusType;
  verifiedAt?: string;
  hasVC: boolean;
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
