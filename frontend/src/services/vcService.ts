import apiClient from "./api";
import { VerifiableCredential } from "@/types";

export interface VCIssueRequest {
  userId: string;
}

export interface VCResponse {
  id: string;
  issuer: string;
  userDid: string;
  issuanceDate: string;
  expirationDate?: string;
  credential: VerifiableCredential;
}

export interface VerifyPresentationRequest {
  presentationJson: string;
}

export interface VerifyResponse {
  valid: boolean;
}

export const vcService = {
  async issueCredential(userId: string): Promise<VCResponse> {
    const response = await apiClient.post("/vc/issue", { userId });
    return response.data;
  },

  async verifyPresentation(presentationJson: string): Promise<VerifyResponse> {
    const response = await apiClient.post("/vc/verify", { presentationJson });
    return response.data;
  },
};
