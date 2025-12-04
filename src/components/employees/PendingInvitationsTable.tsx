// src/components/employees/PendingInvitationsTable.tsx

import React, { useState } from "react";
import {
  Clock,
  RefreshCw,
  Trash2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type { PendingInvitation } from "../../types/employee";

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

  const totalPages = Math.ceil(invitations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvitations = invitations.slice(startIndex, endIndex);

  const handleDelete = (id: string) => {
    onDelete(id);
    setShowDeleteConfirm(null);
  };

  if (invitations.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-12 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
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
      <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary-dark dark:bg-secondary text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  {t("name") || "Name"}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  {t("email") || "Email"}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  {t("role") || "Role"}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  {t("status") || "Status"}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  {t("expires") || "Expires"}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  {t("actions") || "Actions"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentInvitations.map((invitation) => (
                <tr
                  key={invitation.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                    {invitation.fullName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {invitation.email}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        invitation.role === "owner"
                          ? "bg-secondary/20 dark:bg-secondary/30 text-gray-900 dark:text-white"
                          : "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                      }`}
                    >
                      {invitation.role === "owner"
                        ? t("owner") || "Owner"
                        : t("staff") || "Staff"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-warning/20 text-warning dark:text-yellow-400">
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
                        className="text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                        title={t("resendInvitation") || "Resend Invitation"}
                      >
                        <RefreshCw className="w-4 h-4 text-current" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(invitation.id)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
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
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {invitation.fullName}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {invitation.email}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  invitation.role === "owner"
                    ? "bg-secondary/20 dark:bg-secondary/30 text-gray-900 dark:text-white"
                    : "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                }`}
              >
                {invitation.role === "owner"
                  ? t("owner") || "Owner"
                  : t("staff") || "Staff"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-3">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {getTimeRemaining(invitation.expiresAt)}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-warning/20 text-warning dark:text-yellow-400">
                {t("pending") || "Pending"}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onResend(invitation.id)}
                className="flex-1 bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary px-4 py-2 rounded-lg hover:bg-primary/20 dark:hover:bg-secondary/30 transition-colors text-sm font-medium flex items-center justify-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {t("resend") || "Resend"}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(invitation.id)}
                className="flex-1 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm font-medium flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t("delete") || "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {t("showing") || "Showing"} {startIndex + 1} {t("to") || "to"}{" "}
            {Math.min(endIndex, invitations.length)} {t("of") || "of"}{" "}
            {invitations.length} {t("invitations") || "invitations"}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-4">
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
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 font-medium"
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
