import apiClient from "./api";
import { User } from "@/types";

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

export const authService = {
  async register(data: RegisterRequest): Promise<User> {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },

  async getCurrentUser(userId: string): Promise<User> {
    const response = await apiClient.get("/auth/me", {
      headers: {
        "X-Keycloak-User-Id": userId,
      },
    });
    return response.data;
  },
};
