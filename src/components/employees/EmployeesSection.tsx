// src/components/employees/EmployeesSection.tsx

import React, { useState } from "react";
import { Users, UserPlus, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import InviteEmployeeForm from "./InviteEmployeeForm";
import PendingInvitationsTable from "./PendingInvitationsTable";
import AllEmployeesTable from "./AllEmployeesTable";
import type { Employee, PendingInvitation } from "../../types/employee";

interface EmployeesSectionProps {
  employees: Employee[];
  pendingInvitations: PendingInvitation[];
  currentRole: "owner" | "staff";
  currentUserEmail: string;
  onInviteSuccess: (_message: string) => void;
  onResendInvitation: (_invitationId: string) => void;
  onDeleteInvitation: (_invitationId: string) => void;
  onEditEmployee: (_employeeId: string) => void;
  onDeleteEmployee: (_employeeId: string) => void;
}

const EmployeesSection: React.FC<EmployeesSectionProps> = ({
  employees,
  pendingInvitations,
  currentRole,
  currentUserEmail,
  onInviteSuccess,
  onResendInvitation,
  onDeleteInvitation,
  onEditEmployee,
  onDeleteEmployee,
}) => {
  const { t } = useTranslation();

  const [activeSection, setActiveSection] = useState<"all" | "pending">("all");
  const [showInviteModal, setShowInviteModal] = useState(false);

  const userIsOwner = currentRole === "owner";

  const handleInviteSuccess = (message: string) => {
    setShowInviteModal(false);
    onInviteSuccess(message);
  };

  return (
    <div className="space-y-6">
      {/* Header with Action Buttons (Owner Only) */}
      {userIsOwner && (
        <div className="flex flex-wrap justify-end items-center gap-3">
          {/* Invite Button */}
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-2 bg-[#0066cc] hover:bg-[#0052a3] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] text-white dark:text-white px-4 sm:px-5 py-2.5 rounded-lg transition-all duration-200 font-semibold shadow-lg hover:shadow-xl active:scale-95 text-sm sm:text-base whitespace-nowrap"
          >
            <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>{t("inviteEmployee") || "Invite Employee"}</span>
          </button>

          {/* Pending Invitations Badge */}
          {pendingInvitations.length > 0 && (
            <button
              onClick={() => setActiveSection("pending")}
              className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-500/30 transition-all duration-200 font-medium border border-yellow-300 dark:border-yellow-500/30 active:scale-95 text-sm sm:text-base whitespace-nowrap"
            >
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>
                {pendingInvitations.length} {t("pending") || "Pending"}
              </span>
            </button>
          )}

          {/* Back to All Button (when viewing pending) */}
          {activeSection === "pending" && (
            <button
              onClick={() => setActiveSection("all")}
              className="flex items-center gap-2 bg-blue-100 dark:bg-[#3b82f6]/20 text-blue-700 dark:text-[#3b82f6] px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg hover:bg-blue-200 dark:hover:bg-[#3b82f6]/30 transition-all duration-200 font-medium border border-blue-300 dark:border-[#3b82f6]/30 active:scale-95 text-sm sm:text-base whitespace-nowrap"
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>{t("allEmployees") || "All Employees"}</span>
            </button>
          )}
        </div>
      )}

      {/* Content Sections */}
      <div className="mt-6">
        {activeSection === "pending" && userIsOwner ? (
          <PendingInvitationsTable
            invitations={pendingInvitations}
            onResend={onResendInvitation}
            onDelete={onDeleteInvitation}
          />
        ) : (
          <AllEmployeesTable
            employees={employees}
            currentRole={currentRole}
            currentUserEmail={currentUserEmail}
            onEdit={onEditEmployee}
            onDelete={onDeleteEmployee}
          />
        )}
      </div>

      {/* Invite Modal (Owner Only) with Blurred Backdrop */}
      {showInviteModal && userIsOwner && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#0d1f2d] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-200 dark:border-[#1e3a5f] flex flex-col">
            <div className="overflow-y-auto">
              <InviteEmployeeForm
                onSuccess={handleInviteSuccess}
                onClose={() => setShowInviteModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesSection;
