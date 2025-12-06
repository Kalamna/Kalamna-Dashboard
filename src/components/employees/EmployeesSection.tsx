// src/components/employees/EmployeesSection.tsx

import React, { useState } from "react";
import { Users, UserPlus, Clock, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Employee, PendingInvitation } from "../../types/employee";
import InviteEmployeeForm from "./InviteEmployeeForm";
import PendingInvitationsTable from "./PendingInvitationsTable";
import AllEmployeesTable from "./AllEmployeesTable";

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

  const handleInviteSuccess = (message: string) => {
    setShowInviteModal(false);
    onInviteSuccess(message);
  };

  return (
    <div className="space-y-6">
      {/* Header with Action Buttons */}
      <div className="flex justify-end items-center gap-4">
        {/* Invite Button */}
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 bg-[#00d4ff] hover:bg-[#00bce6] text-[#0a1929] px-5 py-2.5 rounded-lg transition-colors font-semibold shadow-lg"
        >
          <UserPlus className="w-5 h-5" />
          {t("inviteEmployee") || "Invite Employee"}
        </button>

        {/* Pending Invitations Badge */}
        {pendingInvitations.length > 0 && (
          <button
            onClick={() => setActiveSection("pending")}
            className="flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-500/30 transition-colors font-medium border border-yellow-500/30"
          >
            <Clock className="w-5 h-5" />
            {pendingInvitations.length} {t("pending") || "Pending"}
          </button>
        )}

        {/* Back to All Button (when viewing pending) */}
        {activeSection === "pending" && (
          <button
            onClick={() => setActiveSection("all")}
            className="flex items-center gap-2 bg-[#0d2943] text-[#00d4ff] px-4 py-2 rounded-lg hover:bg-[#0a2540] transition-colors font-medium border border-[#1e3a5f]"
          >
            <Users className="w-5 h-5" />
            {t("allEmployees") || "All Employees"}
          </button>
        )}
      </div>

      {/* Content Sections */}
      <div className="mt-6">
        {activeSection === "pending" ? (
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

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0d1f2d] rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#1e3a5f]">
            <div className="flex justify-between items-center p-6 border-b border-[#1e3a5f]">
              <h3 className="text-xl font-semibold text-white">
                {t("inviteNewEmployee") || "Invite New Employee"}
              </h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-400 hover:text-gray-300 transition-colors"
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
