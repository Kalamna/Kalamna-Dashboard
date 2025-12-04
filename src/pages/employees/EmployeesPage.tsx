// src/pages/employees/EmployeesPage.tsx

import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Employee, PendingInvitation } from "../../types/employee";
import EmployeesSection from "../../components/employees/EmployeesSection";

// TODO: Replace with actual API imports
// import { getEmployees, getPendingInvitations, resendInvitation, deleteInvitation, deleteEmployee } from '../../api/employees';

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

  // Get user from localStorage
  const [currentUser, setCurrentUser] = useState<{
    role: "owner" | "staff";
  } | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [pendingInvitations, setPendingInvitations] = useState<
    PendingInvitation[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Get current user from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("current_user");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error reading user from localStorage:", error);
    }
  }, []);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // TODO: Replace with actual API calls
        // const [employeesData, invitationsData] = await Promise.all([
        //   getEmployees(),
        //   currentUser?.role === 'owner' ? getPendingInvitations() : Promise.resolve([])
        // ]);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        setEmployees(mockEmployees);
        if (currentUser?.role === "owner") {
          setPendingInvitations(mockPendingInvitations);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
        showAlert(t("errorFetchingData") || "Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    // Always fetch data, even if currentUser is null (will be set shortly)
    fetchData();
  }, [currentUser, t]);

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
      // TODO: Replace with actual API call
      // await resendInvitation(invitationId);
      console.log("Resending invitation:", invitationId);
      showAlert(t("invitationResent") || "Invitation resent successfully");
    } catch (error) {
      console.error("Error resending invitation:", error);
      showAlert(t("errorResendingInvitation") || "Error resending invitation");
    }
  };

  const handleDeleteInvitation = async (invitationId: string) => {
    try {
      // TODO: Replace with actual API call
      // await deleteInvitation(invitationId);

      setPendingInvitations((prev) =>
        prev.filter((inv) => inv.id !== invitationId),
      );
      showAlert(t("invitationDeleted") || "Invitation deleted successfully");
    } catch (error) {
      console.error("Error deleting invitation:", error);
      showAlert(t("errorDeletingInvitation") || "Error deleting invitation");
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
      // TODO: Replace with actual API call
      // await deleteEmployee(employeeId);

      setEmployees((prev) => prev.filter((emp) => emp.id !== employeeId));
      showAlert(t("employeeDeleted") || "Employee deleted successfully");
    } catch (error) {
      console.error("Error deleting employee:", error);
      showAlert(t("errorDeletingEmployee") || "Error deleting employee");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No User Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please log in to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-color-specific dark:text-white">
          {t("employeeManagement") || "Employee Management"}
        </h2>
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="bg-success/10 border border-success/30 text-success px-4 py-3 rounded-lg text-sm flex items-center">
          <Check className="w-5 h-5 mr-2" />
          {alertMessage}
        </div>
      )}

      {/* Main Content */}
      <EmployeesSection
        employees={employees}
        pendingInvitations={pendingInvitations}
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
