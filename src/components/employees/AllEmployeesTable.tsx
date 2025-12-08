// src/components/employees/AllEmployeesTable.tsx

import React, { useState } from "react";
import { Edit, Trash2, MoreVertical, AlertCircle } from "lucide-react";
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
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState<string | null>(null);
  const itemsPerPage = 10;

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = employees.slice(startIndex, endIndex);

  // Helper function - DRY principle
  const canUserModify = (employee: Employee): boolean => {
    return currentRole === "owner" && employee.email !== currentUserEmail;
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    setShowDeleteConfirm(null);
  };

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="bg-[#0d1f2d] dark:bg-[#0d1f2d] rounded-lg shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0066cc] dark:bg-[#00d4ff]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-[#0a1929]">
                  {t("name") || "Name"}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-[#0a1929]">
                  {t("email") || "Email"}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-[#0a1929]">
                  {t("role") || "Role"}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-[#0a1929]">
                  {t("status") || "Status"}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-[#0a1929]">
                  {t("joinDate") || "Join Date"}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-[#0a1929]">
                  {t("actions") || "Actions"}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee, index) => (
                <tr
                  key={employee.id}
                  className={`${
                    index % 2 === 0
                      ? "bg-white dark:bg-[#0a1929]"
                      : "bg-gray-50 dark:bg-[#0d2943]"
                  } border-b border-gray-200 dark:border-[#1e3a5f] hover:bg-gray-100 dark:hover:bg-[#102a43] transition-colors`}
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                    {employee.fullName}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#0066cc] dark:text-[#00d4ff]">
                    {employee.email}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        employee.role === "owner"
                          ? "bg-cyan-100 text-cyan-700 border-cyan-300 dark:bg-teal-500/20 dark:text-teal-400 dark:border-teal-500/30"
                          : "bg-gray-200 text-gray-700 border-gray-300 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30"
                      }`}
                    >
                      {employee.role === "owner"
                        ? t("owner") || "Owner"
                        : t("staff") || "Staff"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        employee.status === "active"
                          ? "bg-green-100 text-green-700 border-green-300 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30"
                          : employee.status === "inactive"
                            ? "bg-red-100 text-red-700 border-red-300 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30"
                            : "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-[#00d4ff]">
                    {formatDate(employee.joinDate)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center space-x-3">
                      {canUserModify(employee) ? (
                        <>
                          <button
                            onClick={() => onEdit(employee.id)}
                            className="text-[#0066cc] hover:text-[#0052a3] dark:text-[#00d4ff] dark:hover:text-[#00bce6] transition-colors"
                            title={t("edit") || "Edit"}
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(employee.id)}
                            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {currentEmployees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white dark:bg-[#0d1f2d] p-4 rounded-lg border border-gray-200 dark:border-[#1e3a5f]"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {employee.fullName}
                </h4>
                <p className="text-sm text-[#0066cc] dark:text-[#00d4ff]">
                  {employee.email}
                </p>
              </div>
              {canUserModify(employee) && (
                <div className="relative">
                  <button
                    onClick={() =>
                      setMobileMenuOpen(
                        mobileMenuOpen === employee.id ? null : employee.id,
                      )
                    }
                    className="p-2 hover:bg-gray-100 dark:hover:bg-[#0a2540] rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>

                  {mobileMenuOpen === employee.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setMobileMenuOpen(null)}
                      />

                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#0a2540] rounded-lg shadow-lg border border-gray-200 dark:border-[#1e3a5f] z-20">
                        <button
                          onClick={() => {
                            onEdit(employee.id);
                            setMobileMenuOpen(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-[#0d2943] flex items-center text-gray-700 dark:text-gray-200 rounded-t-lg"
                        >
                          <Edit className="w-4 h-4 mr-2 text-[#0066cc] dark:text-[#00d4ff]" />
                          {t("edit") || "Edit"}
                        </button>
                        <button
                          onClick={() => {
                            setShowDeleteConfirm(employee.id);
                            setMobileMenuOpen(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-[#0d2943] flex items-center rounded-b-lg"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          {t("delete") || "Delete"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  employee.role === "owner"
                    ? "bg-cyan-100 text-cyan-700 border-cyan-300 dark:bg-teal-500/20 dark:text-teal-400 dark:border-teal-500/30"
                    : "bg-gray-200 text-gray-700 border-gray-300 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30"
                }`}
              >
                {employee.role === "owner"
                  ? t("owner") || "Owner"
                  : t("staff") || "Staff"}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  employee.status === "active"
                    ? "bg-green-100 text-green-700 border-green-300 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30"
                    : employee.status === "inactive"
                      ? "bg-red-100 text-red-700 border-red-300 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30"
                      : "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30"
                }`}
              >
                {employee.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-[#00d4ff]">
              {t("joined") || "Joined"}: {formatDate(employee.joinDate)}
            </p>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-[#1e3a5f] rounded-lg hover:bg-gray-50 dark:hover:bg-[#0a2540] transition-colors text-gray-700 dark:text-gray-300 font-medium"
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

export default AllEmployeesTable;
