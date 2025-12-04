// src/components/employees/EmployeesSection.tsx

import React, { useState, useEffect } from "react";
import { Users, UserPlus, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Employee, PendingInvitation } from "../../types/employee";
import InviteEmployeeForm from "./InviteEmployeeForm";
import PendingInvitationsTable from "./PendingInvitationsTable";
import AllEmployeesTable from "./AllEmployeesTable";

interface EmployeesSectionProps {
  employees: Employee[];
  pendingInvitations: PendingInvitation[];
  onInviteSuccess: (_message: string) => void;
  onResendInvitation: (_invitationId: string) => void;
  onDeleteInvitation: (_invitationId: string) => void;
  onEditEmployee: (_employeeId: string) => void;
  onDeleteEmployee: (_employeeId: string) => void;
}

const EmployeesSection: React.FC<EmployeesSectionProps> = ({
  employees,
  pendingInvitations,
  onInviteSuccess,
  onResendInvitation,
  onDeleteInvitation,
  onEditEmployee,
  onDeleteEmployee,
}) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language as "en" | "ar";

  // Get user from localStorage
  const [currentUser, setCurrentUser] = useState<{
    role: "owner" | "staff";
  } | null>(null);

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

  const [activeSection, setActiveSection] = useState<
    "invite" | "pending" | "all"
  >("all");

  const isOwner = currentUser?.role === "owner";

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
        {isOwner && (
          <button
            onClick={() => setActiveSection("invite")}
            className={`flex items-center px-4 py-2 rounded-t-lg transition-colors text-sm sm:text-base ${
              activeSection === "invite"
                ? "bg-primary text-white font-semibold"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <UserPlus
              className={`w-4 h-4 ${language === "ar" ? "ml-2" : "mr-2"}`}
            />
            {t("inviteEmployee") || "Invite Employee"}
          </button>
        )}

        {isOwner && (
          <button
            onClick={() => setActiveSection("pending")}
            className={`flex items-center px-4 py-2 rounded-t-lg transition-colors text-sm sm:text-base ${
              activeSection === "pending"
                ? "bg-primary text-white font-semibold"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Clock
              className={`w-4 h-4 ${language === "ar" ? "ml-2" : "mr-2"}`}
            />
            <span className="hidden sm:inline">
              {t("pendingInvitations") || "Pending Invitations"}
            </span>
            <span className="sm:hidden">{t("pending") || "Pending"}</span>
            {pendingInvitations.length > 0 && (
              <span className="ml-2 bg-warning text-white text-xs px-2 py-0.5 rounded-full">
                {pendingInvitations.length}
              </span>
            )}
          </button>
        )}

        <button
          onClick={() => setActiveSection("all")}
          className={`flex items-center px-4 py-2 rounded-t-lg transition-colors text-sm sm:text-base ${
            activeSection === "all"
              ? "bg-primary text-white font-semibold"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          <Users className={`w-4 h-4 ${language === "ar" ? "ml-2" : "mr-2"}`} />
          <span className="hidden sm:inline">
            {t("allEmployees") || "All Employees"}
          </span>
          <span className="sm:hidden">{t("all") || "All"}</span>
          <span className="ml-2 bg-primary-dark text-white text-xs px-2 py-0.5 rounded-full">
            {employees.length}
          </span>
        </button>
      </div>

      {/* Content Sections */}
      <div className="mt-6">
        {activeSection === "invite" && isOwner && (
          <InviteEmployeeForm onSuccess={onInviteSuccess} />
        )}

        {activeSection === "pending" && isOwner && (
          <PendingInvitationsTable
            invitations={pendingInvitations}
            onResend={onResendInvitation}
            onDelete={onDeleteInvitation}
          />
        )}

        {activeSection === "all" && (
          <AllEmployeesTable
            employees={employees}
            onEdit={onEditEmployee}
            onDelete={onDeleteEmployee}
          />
        )}
      </div>
    </div>
  );
};

export default EmployeesSection;
