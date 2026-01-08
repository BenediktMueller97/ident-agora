import apiClient from "./api";

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  verificationStatus: string;
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
