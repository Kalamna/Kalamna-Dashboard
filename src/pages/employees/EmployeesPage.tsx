// src/pages/employees/EmployeesPage.tsx

import React, { useState, useEffect, useCallback } from "react";
import { Check, Shield, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Employee, PendingInvitation } from "../../types/employee";
import EmployeesSection from "../../components/employees/EmployeesSection";
import { getUser, isOwner } from "../../utils/authUtils";
// import {
//   getEmployees,
//   getPendingInvitations,
//   resendInvitation,
//   deleteInvitation,
//   deleteEmployee
// } from '../../api/employeesApi';

// Mock data - will be replaced with API calls
const mockEmployees: Employee[] = [
  {
    id: "1",
    fullName: "Ahmed Hassan",
    email: "ahmed@company.com",
    role: "owner",
    status: "active",
    joinDate: "2025-01-15",
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "2",
    fullName: "Sara Mohamed",
    email: "sara@company.com",
    role: "staff",
    status: "active",
    joinDate: "2025-02-20",
    createdAt: "2025-02-20T10:00:00Z",
    updatedAt: "2025-02-20T10:00:00Z",
  },
  {
    id: "3",
    fullName: "Omar Ali",
    email: "omar@company.com",
    role: "staff",
    status: "active",
    joinDate: "2025-03-10",
    createdAt: "2025-03-10T10:00:00Z",
    updatedAt: "2025-03-10T10:00:00Z",
  },
  {
    id: "4",
    fullName: "Layla Ibrahim",
    email: "layla@company.com",
    role: "staff",
    status: "active",
    joinDate: "2025-04-05",
    createdAt: "2025-04-05T10:00:00Z",
    updatedAt: "2025-04-05T10:00:00Z",
  },
  {
    id: "5",
    fullName: "Youssef Ahmed",
    email: "youssef@company.com",
    role: "staff",
    status: "inactive",
    joinDate: "2025-05-12",
    createdAt: "2025-05-12T10:00:00Z",
    updatedAt: "2025-05-12T10:00:00Z",
  },
  {
    id: "6",
    fullName: "Nour Khaled",
    email: "nour@company.com",
    role: "staff",
    status: "active",
    joinDate: "2025-06-18",
    createdAt: "2025-06-18T10:00:00Z",
    updatedAt: "2025-06-18T10:00:00Z",
  },
  {
    id: "7",
    fullName: "Mahmoud Yasser",
    email: "mahmoud@company.com",
    role: "staff",
    status: "active",
    joinDate: "2025-07-22",
    createdAt: "2025-07-22T10:00:00Z",
    updatedAt: "2025-07-22T10:00:00Z",
  },
  {
    id: "8",
    fullName: "Fatma Hassan",
    email: "fatma@company.com",
    role: "staff",
    status: "active",
    joinDate: "2025-08-30",
    createdAt: "2025-08-30T10:00:00Z",
    updatedAt: "2025-08-30T10:00:00Z",
  },
];

const mockPendingInvitations: PendingInvitation[] = [
  {
    id: "inv-1",
    fullName: "Amira Khaled",
    email: "amira@company.com",
    role: "staff",
    status: "pending",
    createdAt: "2025-11-20T10:00:00Z",
    expiresAt: "2025-11-27T10:00:00Z",
  },
  {
    id: "inv-2",
    fullName: "Karim Yasser",
    email: "karim@company.com",
    role: "staff",
    status: "pending",
    createdAt: "2025-11-21T10:00:00Z",
    expiresAt: "2025-11-28T10:00:00Z",
  },
  {
    id: "inv-3",
    fullName: "Hana Ibrahim",
    email: "hana@company.com",
    role: "owner",
    status: "pending",
    createdAt: "2025-11-22T10:00:00Z",
    expiresAt: "2025-11-29T10:00:00Z",
  },
];

const EmployeesPage: React.FC = () => {
  const { t } = useTranslation();

  // Demo mode: Toggle between Owner and Staff view
  const [demoRole, setDemoRole] = useState<"owner" | "staff">("owner");

  // Get validated user from cookies (will be used in production)
  const [currentUser, setCurrentUser] = useState(getUser());
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [pendingInvitations, setPendingInvitations] = useState<
    PendingInvitation[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Use demo role for now (in production, use currentUser?.role)
  const effectiveRole = currentUser?.role || demoRole;

  // Validate and get current user
  useEffect(() => {
    const user = getUser();
    setCurrentUser(user);
  }, []);

  // Fetch data on mount
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      // Use Axios API service
      // const employeesData = await getEmployees();
      // const invitationsData = isOwner(currentUser)
      //   ? await getPendingInvitations()
      //   : [];

      // TODO: Remove mock data when API is ready
      await new Promise((resolve) => setTimeout(resolve, 500));

      setEmployees(mockEmployees);
      // In demo mode, show pending invitations if demoRole is owner
      if (demoRole === "owner" || isOwner(currentUser)) {
        setPendingInvitations(mockPendingInvitations);
      }
    } catch (error: any) {
      console.error("Error fetching employee data:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        t("errorFetchingData") ||
        "Error fetching data";
      showAlert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [demoRole, currentUser, t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  const handleInviteSuccess = (message: string) => {
    showAlert(message);
    // TODO: Refresh pending invitations list
    // const invitations = await getPendingInvitations();
    // setPendingInvitations(invitations);
  };

  const handleResendInvitation = async (invitationId: string) => {
    try {
      // Use Axios API service
      // await resendInvitation(invitationId);

      // TODO: Remove mock when API is ready
      console.log("Resending invitation:", invitationId);
      showAlert(t("invitationResent") || "Invitation resent successfully");
    } catch (error: any) {
      console.error("Error resending invitation:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        t("errorResendingInvitation") ||
        "Error resending invitation";
      showAlert(errorMessage);
    }
  };

  const handleDeleteInvitation = async (invitationId: string) => {
    try {
      // Use Axios API service
      // await deleteInvitation(invitationId);

      // TODO: Remove mock when API is ready
      setPendingInvitations((prev) =>
        prev.filter((inv) => inv.id !== invitationId),
      );
      showAlert(t("invitationDeleted") || "Invitation deleted successfully");
    } catch (error: any) {
      console.error("Error deleting invitation:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        t("errorDeletingInvitation") ||
        "Error deleting invitation";
      showAlert(errorMessage);
    }
  };

  const handleEditEmployee = (employeeId: string) => {
    // TODO: Implement edit modal or navigate to edit page
    console.log("Editing employee:", employeeId);
    // You can either:
    // 1. Open a modal with edit form
    // 2. Navigate to /employees/:id/edit
    // 3. Show inline editing
  };

  const handleDeleteEmployee = async (employeeId: string) => {
    try {
      // Use Axios API service
      // await deleteEmployee(employeeId);

      // TODO: Remove mock when API is ready
      setEmployees((prev) => prev.filter((emp) => emp.id !== employeeId));
      showAlert(t("employeeDeleted") || "Employee deleted successfully");
    } catch (error: any) {
      console.error("Error deleting employee:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        t("errorDeletingEmployee") ||
        "Error deleting employee";
      showAlert(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00d4ff]"></div>
      </div>
    );
  }

  // In demo mode, always allow access with demoRole
  // In production, check currentUser only
  if (!currentUser && !demoRole) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Unauthorized Access
          </h2>
          <p className="text-gray-400">
            You don't have permission to access this page. Please log in with
            valid credentials.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white dark:bg-transparent">
      {/* Header with View Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          {t("employeeManagement") || "Employee Management"}
        </h2>

        {/* Demo View Switcher - Remove in production */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#0d1f2d] p-1 rounded-lg border border-gray-300 dark:border-[#1e3a5f]">
          <button
            onClick={() => setDemoRole("owner")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              demoRole === "owner"
                ? "bg-[#0066cc] dark:bg-[#00d4ff] text-white dark:text-[#0a1929] shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Shield className="w-4 h-4" />
            Owner View
          </button>
          <button
            onClick={() => setDemoRole("staff")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              demoRole === "staff"
                ? "bg-[#0066cc] dark:bg-[#00d4ff] text-white dark:text-[#0a1929] shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Shield className="w-4 h-4" />
            Staff View
          </button>
        </div>
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="bg-green-50 dark:bg-green-500/20 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg text-sm flex items-center">
          <Check className="w-5 h-5 mr-2" />
          {alertMessage}
        </div>
      )}

      {/* Main Content */}
      <EmployeesSection
        employees={employees}
        pendingInvitations={pendingInvitations}
        currentRole={effectiveRole}
        currentUserEmail={currentUser?.email || "demo@example.com"}
        onInviteSuccess={handleInviteSuccess}
        onResendInvitation={handleResendInvitation}
        onDeleteInvitation={handleDeleteInvitation}
        onEditEmployee={handleEditEmployee}
        onDeleteEmployee={handleDeleteEmployee}
      />
    </div>
  );
};

export default EmployeesPage;
