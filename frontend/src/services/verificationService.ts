import apiClient from "./api";
import { User, VerificationStatus } from "@/types";

export interface VerificationRequest {
  userId: string;
  verificationType: string;
}

export const verificationService = {
  async verifyUser(
    userId: string,
    verificationType: string
  ): Promise<User> {
    const response = await apiClient.post("/verification/verify", {
      userId,
      verificationType,
    });
    return response.data;
  },

  async getVerificationStatus(userId: string): Promise<VerificationStatus> {
    const response = await apiClient.get(`/verification/status/${userId}`);
    return response.data;
  },
};
