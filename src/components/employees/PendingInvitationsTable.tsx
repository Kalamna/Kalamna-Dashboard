// src/components/employees/PendingInvitationsTable.tsx

import React, { useState } from "react";
import { Clock, RefreshCw, Trash2, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { PendingInvitation } from "../../types/employee";
import Pagination from "../common/pagination";

interface PendingInvitationsTableProps {
  invitations: PendingInvitation[];
  onResend: (_invitationId: string) => void;
  onDelete: (_invitationId: string) => void;
}

const getTimeRemaining = (expiresAt: string): string => {
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diffMs = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Expired";
  if (diffDays === 0) return "Expires today";
  if (diffDays === 1) return "Expires tomorrow";
  return `${diffDays} days left`;
};

const PendingInvitationsTable: React.FC<PendingInvitationsTableProps> = ({
  invitations,
  onResend,
  onDelete,
}) => {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );
  const itemsPerPage = 10;

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvitations = invitations.slice(startIndex, endIndex);

  const handleDelete = (id: string) => {
    onDelete(id);
    setShowDeleteConfirm(null);
  };

  if (invitations.length === 0) {
    return (
      <div className="bg-[#0d1f2d] p-12 rounded-lg shadow-sm border border-[#1e3a5f] text-center">
        <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">
          {t("noPendingInvitations") || "No Pending Invitations"}
        </h3>
        <p className="text-gray-400">
          {t("noPendingInvitationsDesc") ||
            "All invitations have been accepted or expired."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="bg-[#0d1f2d] rounded-lg shadow-xl border border-[#1e3a5f] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#00d4ff]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0a1929]">
                  {t("name") || "Name"}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0a1929]">
                  {t("email") || "Email"}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0a1929]">
                  {t("role") || "Role"}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0a1929]">
                  {t("status") || "Status"}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0a1929]">
                  {t("expires") || "Expires"}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0a1929]">
                  {t("actions") || "Actions"}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentInvitations.map((invitation, index) => (
                <tr
                  key={invitation.id}
                  className={`${
                    index % 2 === 0 ? "bg-[#0a1929]" : "bg-[#0d2943]"
                  } border-b border-[#1e3a5f] hover:bg-[#102a43] transition-colors`}
                >
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    {invitation.fullName}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#00d4ff]">
                    {invitation.email}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        invitation.role === "owner"
                          ? "bg-teal-500/20 text-teal-400 border-teal-500/30"
                          : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                      }`}
                    >
                      {invitation.role === "owner"
                        ? t("owner") || "Owner"
                        : t("staff") || "Staff"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 rounded-full text-xs font-medium border bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      {t("pending") || "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {getTimeRemaining(invitation.expiresAt)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onResend(invitation.id)}
                        className="text-[#00d4ff] hover:text-[#00bce6] transition-colors p-2 hover:bg-[#0a2540] rounded"
                        title={t("resendInvitation") || "Resend Invitation"}
                      >
                        <RefreshCw className="w-4 h-4 text-current" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(invitation.id)}
                        className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-[#0a2540] rounded"
                        title={t("deleteInvitation") || "Delete Invitation"}
                      >
                        <Trash2 className="w-4 h-4 text-current" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {currentInvitations.map((invitation, index) => (
          <div
            key={invitation.id}
            className={`${
              index % 2 === 0 ? "bg-[#0a1929]" : "bg-[#0d2943]"
            } p-4 rounded-lg border border-[#1e3a5f]`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-white">
                  {invitation.fullName}
                </h4>
                <p className="text-sm text-[#00d4ff]">{invitation.email}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  invitation.role === "owner"
                    ? "bg-teal-500/20 text-teal-400 border-teal-500/30"
                    : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                }`}
              >
                {invitation.role === "owner"
                  ? t("owner") || "Owner"
                  : t("staff") || "Staff"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {getTimeRemaining(invitation.expiresAt)}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium border bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                {t("pending") || "Pending"}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onResend(invitation.id)}
                className="flex-1 bg-[#00d4ff]/10 text-[#00d4ff] px-4 py-2 rounded-lg hover:bg-[#00d4ff]/20 transition-colors text-sm font-medium flex items-center justify-center border border-[#00d4ff]/30"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {t("resend") || "Resend"}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(invitation.id)}
                className="flex-1 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium flex items-center justify-center border border-red-500/30"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t("delete") || "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={invitations.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        itemName="invitations"
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0d1f2d] rounded-lg shadow-xl max-w-md w-full p-6 border border-[#1e3a5f]">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mr-4">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {t("deleteInvitation") || "Delete Invitation"}
              </h3>
            </div>
            <p className="text-gray-300 mb-6">
              {t("deleteInvitationConfirm") ||
                "Are you sure you want to delete this invitation? This action cannot be undone."}
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-[#1e3a5f] rounded-lg hover:bg-[#0a2540] transition-colors text-gray-300 font-medium"
              >
                {t("cancel") || "Cancel"}
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                {t("delete") || "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingInvitationsTable;
