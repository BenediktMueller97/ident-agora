// Export all services from a single entry point
export { authService } from "./authService";
export type { RegisterRequest } from "./authService";

export { verificationService } from "./verificationService";
export type { VerificationRequest } from "./verificationService";

export { vcService } from "./vcService";
export type {
  VCIssueRequest,
  VCResponse,
  VerifyPresentationRequest,
  VerifyResponse,
} from "./vcService";

export { apiClient as default } from "./api";
