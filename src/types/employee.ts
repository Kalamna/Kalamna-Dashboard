export type EmployeeRole = "owner" | "staff";
export type EmployeeStatus = "active" | "inactive" | "pending";
export type InvitationStatus = "pending" | "expired" | "accepted";

export interface Employee {
  id: string;
  fullName: string;
  email: string;
  role: EmployeeRole;
  status: EmployeeStatus;
  joinDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface PendingInvitation {
  id: string;
  fullName: string;
  email: string;
  role: EmployeeRole;
  status: InvitationStatus;
  createdAt: string;
  expiresAt: string;
}

export interface InviteEmployeeFormData {
  fullName: string;
  email: string;
  role: EmployeeRole;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}
