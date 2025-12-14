// src/components/employees/PendingInvitationsTable.tsx

import React, { useState } from "react";
import {
  Clock,
  RefreshCw,
  Trash2,
  AlertCircle,
  Mail,
  User as UserIcon,
} from "lucide-react";
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvitations = invitations.slice(startIndex, endIndex);

  const handleDelete = (id: string) => {
    onDelete(id);
    setShowDeleteConfirm(null);
  };

  if (invitations.length === 0) {
    return (
      <div className="bg-white dark:bg-[#0d1f2d] p-12 rounded-lg shadow-sm border border-gray-200 dark:border-[#1e3a5f] text-center">
        <Clock className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {t("noPendingInvitations") || "No Pending Invitations"}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {t("noPendingInvitationsDesc") ||
            "All invitations have been accepted or expired."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden lg:block bg-[#0d1f2d] dark:bg-[#0d1f2d] rounded-lg shadow-xl border border-[#1e3a5f] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0066cc] dark:bg-[#3b82f6]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  {t("name") || "Name"}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  {t("email") || "Email"}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  {t("role") || "Role"}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  {t("status") || "Status"}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  {t("expires") || "Expires"}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  {t("actions") || "Actions"}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentInvitations.map((invitation, index) => (
                <tr
                  key={invitation.id}
                  className={`${
                    index % 2 === 0
                      ? "bg-white dark:bg-[#0a1929]"
                      : "bg-gray-50 dark:bg-[#0d2943]"
                  } border-b border-gray-200 dark:border-[#1e3a5f] hover:bg-gray-100 dark:hover:bg-[#102a43] transition-colors`}
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                    {invitation.fullName}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#0066cc] dark:text-[#3b82f6]">
                    {invitation.email}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        invitation.role === "owner"
                          ? "bg-cyan-100 text-cyan-700 border-cyan-300 dark:bg-[#3b82f6]/20 dark:text-[#3b82f6] dark:border-[#3b82f6]/30"
                          : "bg-gray-200 text-gray-700 border-gray-300 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30"
                      }`}
                    >
                      {invitation.role === "owner"
                        ? t("owner") || "Owner"
                        : t("staff") || "Staff"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 rounded-full text-xs font-medium border bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30">
                      {t("pending") || "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {getTimeRemaining(invitation.expiresAt)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onResend(invitation.id)}
                        className="text-[#0066cc] hover:text-[#0052a3] dark:text-[#3b82f6] dark:hover:text-[#60a5fa] transition-all duration-200 p-2 hover:bg-gray-100 dark:hover:bg-[#1a2f45] rounded-lg active:scale-95"
                        title={t("resendInvitation") || "Resend Invitation"}
                      >
                        <RefreshCw className="w-4 h-4 text-current" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(invitation.id)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-all duration-200 p-2 hover:bg-gray-100 dark:hover:bg-[#1a2f45] rounded-lg active:scale-95"
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
        {currentInvitations.map((invitation) => (
          <div
            key={invitation.id}
            className="bg-white dark:bg-[#0a1929] p-6 rounded-lg border border-gray-200 dark:border-[#1e3a5f] shadow-md"
          >
            {/* Header with Name and Role */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-[#3b82f6]/20 flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-5 h-5 text-[#0066cc] dark:text-[#3b82f6]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1 break-words">
                    {invitation.fullName}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 break-all">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span>{invitation.email}</span>
                  </div>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${
                  invitation.role === "owner"
                    ? "bg-cyan-100 text-cyan-700 border-cyan-300 dark:bg-[#3b82f6]/20 dark:text-[#3b82f6] dark:border-[#3b82f6]/30"
                    : "bg-gray-200 text-gray-700 border-gray-300 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30"
                }`}
              >
                {invitation.role === "owner"
                  ? t("owner") || "Owner"
                  : t("staff") || "Staff"}
              </span>
            </div>

            {/* Status and Expiry */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {t("status") || "Status"}
                </p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium border bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30">
                  {t("pending") || "Pending"}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {t("expires") || "Expires"}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {getTimeRemaining(invitation.expiresAt)}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-[#1e3a5f]">
              <button
                onClick={() => onResend(invitation.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-[#0066cc] dark:bg-[#3b82f6]/10 dark:text-[#3b82f6] px-4 py-2.5 rounded-lg hover:bg-blue-100 dark:hover:bg-[#3b82f6]/20 transition-all duration-200 text-sm font-medium border border-blue-200 dark:border-[#3b82f6]/30 active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                {t("resend") || "Resend"}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(invitation.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 dark:bg-red-500/20 dark:text-red-400 px-4 py-2.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/30 transition-all duration-200 text-sm font-medium border border-red-200 dark:border-red-500/30 active:scale-95"
              >
                <Trash2 className="w-4 h-4" />
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
          <div className="bg-white dark:bg-[#0d1f2d] rounded-lg shadow-xl max-w-md w-full p-6 border border-gray-200 dark:border-[#1e3a5f]">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center mr-4">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("deleteInvitation") || "Delete Invitation"}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t("deleteInvitationConfirm") ||
                "Are you sure you want to delete this invitation? This action cannot be undone."}
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-[#1e3a5f] rounded-lg hover:bg-gray-50 dark:hover:bg-[#1a2f45] transition-all duration-200 text-gray-700 dark:text-gray-300 font-medium active:scale-95"
              >
                {t("cancel") || "Cancel"}
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 text-white transition-all duration-200 font-medium active:scale-95"
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
