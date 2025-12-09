// src/components/employees/EmployeesSection.tsx

import React, { useState } from "react";
import { Users, UserPlus, Clock, X } from "lucide-react";
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
        <div className="flex justify-end items-center gap-4">
          {/* Invite Button */}
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-2 bg-[#0066cc] hover:bg-[#0052a3] dark:bg-[#00d4ff] dark:hover:bg-[#00bce6] text-white dark:text-[#0a1929] px-5 py-2.5 rounded-lg transition-colors font-semibold shadow-lg"
          >
            <UserPlus className="w-5 h-5" />
            {t("inviteEmployee") || "Invite Employee"}
          </button>

          {/* Pending Invitations Badge */}
          {pendingInvitations.length > 0 && (
            <button
              onClick={() => setActiveSection("pending")}
              className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-500/30 transition-colors font-medium border border-yellow-300 dark:border-yellow-500/30"
            >
              <Clock className="w-5 h-5" />
              {pendingInvitations.length} {t("pending") || "Pending"}
            </button>
          )}

          {/* Back to All Button (when viewing pending) */}
          {activeSection === "pending" && (
            <button
              onClick={() => setActiveSection("all")}
              className="flex items-center gap-2 bg-blue-100 dark:bg-cyan-500/20 text-blue-700 dark:text-cyan-400 px-4 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-cyan-500/30 transition-colors font-medium border border-blue-300 dark:border-cyan-500/30"
            >
              <Users className="w-5 h-5" />
              {t("allEmployees") || "All Employees"}
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0d1f2d] rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-[#1e3a5f]">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-[#1e3a5f]">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t("inviteNewEmployee") || "Invite New Employee"}
              </h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <InviteEmployeeForm onSuccess={handleInviteSuccess} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesSection;