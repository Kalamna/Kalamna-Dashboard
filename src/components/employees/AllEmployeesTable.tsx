// src/components/employees/AllEmployeesTable.tsx
/* aaaaaaaaahhhhhhhhhhhhhhhhhhhhhhh*/
import React, { useState } from "react";
import {
  Edit,
  Trash2,
  Mail,
  User as UserIcon,
  AlertCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Employee } from "../../types/employee";
import Pagination from "../common/pagination";

interface AllEmployeesTableProps {
  employees: Employee[];
  currentRole: "owner" | "staff";
  currentUserEmail: string;
  onEdit: (_employeeId: string) => void;
  onDelete: (_employeeId: string) => void;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const AllEmployeesTable: React.FC<AllEmployeesTableProps> = ({
  employees,
  currentRole,
  currentUserEmail,
  onEdit,
  onDelete,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = employees.slice(startIndex, endIndex);

  const canUserModify = (employee: Employee): boolean => {
    return currentRole === "owner" && employee.email !== currentUserEmail;
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    setShowDeleteConfirm(null);
  };

  const showActions = currentRole === "owner";

  return (
    <div className="space-y-4">
      {/* Desktop Table View (> 900px) */}
      <div className="hidden lg:block bg-[#0d1f2d] rounded-lg shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" dir={isRTL ? "rtl" : "ltr"}>
            <thead className="bg-[#0066cc] dark:bg-[#3b82f6]">
              <tr>
                <th className="px-6 py-4 text-center font-semibold text-white dark:text-white">
                  {t("name") || "Name"}
                </th>
                <th className="px-6 py-4 text-center font-semibold text-white dark:text-white">
                  {t("email") || "Email"}
                </th>
                <th className="px-6 py-4 text-center font-semibold text-white dark:text-white">
                  {t("role") || "Role"}
                </th>
                <th className="px-6 py-4 text-center font-semibold text-white dark:text-white">
                  {t("status") || "Status"}
                </th>
                <th className="px-6 py-4 text-center font-semibold text-white dark:text-white">
                  {t("joinDate") || "Join Date"}
                </th>
                {showActions && (
                  <th className="px-6 py-4 text-center font-semibold text-white dark:text-white">
                    {t("actions") || "Actions"}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee, index) => (
                <tr
                  key={employee.id}
                  className={`border-b border-gray-200 dark:border-[#1e3a5f] transition-colors ${
                    index % 2 === 0
                      ? "bg-white dark:bg-[#0a1929] hover:bg-gray-100 dark:hover:bg-[#15304a]"
                      : "bg-gray-50 dark:bg-[#0d2943] hover:bg-gray-100 dark:hover:bg-[#1a3f5f]"
                  }`}
                >
                  <td className="px-6 py-4 text-center text-gray-900 dark:text-white font-medium">
                    {employee.fullName}
                  </td>
                  <td className="px-6 py-4 text-center text-[#0066cc] dark:text-[#3b82f6]">
                    {employee.email}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                        employee.role === "owner"
                          ? "bg-cyan-100 dark:bg-[#3b82f6]/20 text-cyan-700 dark:text-[#3b82f6] border-cyan-300 dark:border-[#3b82f6]/30"
                          : "bg-gray-200 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-500/30"
                      }`}
                    >
                      {employee.role === "owner"
                        ? t("owner") || "Owner"
                        : t("staff") || "Staff"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                        employee.status === "active"
                          ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 border-green-300 dark:border-green-500/30"
                          : employee.status === "inactive"
                            ? "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-300 dark:border-red-500/30"
                            : "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-500/30"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600 dark:text-[#3b82f6]">
                    {formatDate(employee.joinDate)}
                  </td>
                  {showActions && (
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        {canUserModify(employee) ? (
                          <>
                            <button
                              onClick={() => onEdit(employee.id)}
                              className="text-[#0066cc] hover:text-[#0052a3] dark:text-[#3b82f6] dark:hover:text-[#60a5fa] transition-all duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a2f45] active:scale-95"
                              title={t("edit") || "Edit"}
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(employee.id)}
                              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-all duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a2f45] active:scale-95"
                              title={t("delete") || "Delete"}
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </>
                        ) : (
                          <span className="text-gray-400 dark:text-gray-600 text-xs">
                            -
                          </span>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View (≤ 900px) */}
      <div className="lg:hidden space-y-4">
        {currentEmployees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white dark:bg-[#0a1929] p-6 rounded-lg border border-gray-200 dark:border-[#1e3a5f] shadow-md"
          >
            {/* Header with Name and Role */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-[#3b82f6]/20 flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-5 h-5 text-blue-600 dark:text-[#3b82f6]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1 break-words overflow-wrap-anywhere">
                    {employee.fullName}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 break-all overflow-wrap-anywhere">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span>{employee.email}</span>
                  </div>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${
                  employee.role === "owner"
                    ? "bg-cyan-100 dark:bg-[#3b82f6]/20 text-cyan-700 dark:text-[#3b82f6] border-cyan-300 dark:border-[#3b82f6]/30"
                    : "bg-gray-200 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-500/30"
                }`}
              >
                {employee.role === "owner"
                  ? t("owner") || "Owner"
                  : t("staff") || "Staff"}
              </span>
            </div>

            {/* Status and Join Date */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {t("status") || "Status"}
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                    employee.status === "active"
                      ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 border-green-300 dark:border-green-500/30"
                      : employee.status === "inactive"
                        ? "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-300 dark:border-red-500/30"
                        : "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-500/30"
                  }`}
                >
                  {employee.status}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {t("joinDate") || "Join Date"}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatDate(employee.joinDate)}
                </p>
              </div>
            </div>

            {/* Actions (Owner Only) */}
            {showActions && canUserModify(employee) && (
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-[#1e3a5f]">
                <button
                  onClick={() => onEdit(employee.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-50 dark:bg-[#3b82f6]/10 text-blue-600 dark:text-[#3b82f6] px-4 py-2.5 rounded-lg hover:bg-blue-100 dark:hover:bg-[#3b82f6]/20 transition-all duration-200 text-sm font-medium border border-blue-200 dark:border-[#3b82f6]/30 active:scale-95"
                >
                  <Edit className="w-4 h-4" />
                  {t("edit") || "Edit"}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(employee.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-400 px-4 py-2.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/30 transition-all duration-200 text-sm font-medium border border-red-200 dark:border-red-500/30 active:scale-95"
                >
                  <Trash2 className="w-4 h-4" />
                  {t("delete") || "Delete"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={employees.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        itemName="employees"
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0d1f2d] rounded-lg shadow-xl max-w-md w-full p-6 border border-gray-200 dark:border-[#1e3a5f]">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center mr-4">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t("deleteEmployee") || "Delete Employee"}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t("deleteEmployeeConfirm") ||
                "Are you sure you want to delete this employee? This action cannot be undone."}
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

export default AllEmployeesTable;
