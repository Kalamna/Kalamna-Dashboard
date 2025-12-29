// src/api/employeesApi.ts

import axios from "axios";
import type { AxiosInstance } from "axios";
import type { Employee, PendingInvitation } from "../types/employee";
import { getToken } from "../utils/authUtils";

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

/**
 * Get all employees
 */
export const getEmployees = async (): Promise<Employee[]> => {
  const response = await apiClient.get<Employee[]>("/employees");
  return response.data;
};

/**
 * Get pending invitations (Owner only)
 */
export const getPendingInvitations = async (): Promise<PendingInvitation[]> => {
  const response = await apiClient.get<PendingInvitation[]>(
    "/employees/invitations",
  );
  return response.data;
};

/**
 * Invite new employee
 */
export const inviteEmployee = async (data: {
  fullName: string;
  email: string;
  role: "owner" | "staff";
}): Promise<{ message: string }> => {
  const response = await apiClient.post("/employees/invite", data);
  return response.data;
};

/**
 * Resend invitation
 */
export const resendInvitation = async (
  invitationId: string,
): Promise<{ message: string }> => {
  const response = await apiClient.post(
    `/employees/invitations/${invitationId}/resend`,
  );
  return response.data;
};

/**
 * Delete invitation
 */
export const deleteInvitation = async (invitationId: string): Promise<void> => {
  await apiClient.delete(`/employees/invitations/${invitationId}`);
};

/**
 * Update employee
 */
export const updateEmployee = async (
  employeeId: string,
  data: Partial<Employee>,
): Promise<Employee> => {
  const response = await apiClient.put<Employee>(
    `/employees/${employeeId}`,
    data,
  );
  return response.data;
};

/**
 * Delete employee
 */
export const deleteEmployee = async (employeeId: string): Promise<void> => {
  await apiClient.delete(`/employees/${employeeId}`);
};

export default apiClient;
