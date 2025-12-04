// src/components/employees/AllEmployeesTable.tsx

import React, { useState, useEffect } from "react";
import {
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Employee } from "../../types/employee";

interface AllEmployeesTableProps {
  employees: Employee[];
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
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();

  // Get user from localStorage
  const [currentUser, setCurrentUser] = useState<{
    email: string;
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

  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState<string | null>(null);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = employees.slice(startIndex, endIndex);

  const isOwner = currentUser?.role === "owner";

  const canEdit = (employee: Employee) => {
    return isOwner && employee.email !== currentUser?.email;
  };

  const canDelete = (employee: Employee) => {
    return isOwner && employee.email !== currentUser?.email;
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    setShowDeleteConfirm(null);
  };

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
                  {t("joinDate") || "Join Date"}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  {t("actions") || "Actions"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                    {employee.fullName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {employee.email}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        employee.role === "owner"
                          ? "bg-secondary/20 dark:bg-secondary/30 text-gray-900 dark:text-white"
                          : "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                      }`}
                    >
                      {employee.role === "owner"
                        ? t("owner") || "Owner"
                        : t("staff") || "Staff"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        employee.status === "active"
                          ? "bg-success/20 text-success dark:text-green-400"
                          : employee.status === "inactive"
                            ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            : "bg-warning/20 text-warning dark:text-yellow-400"
                      }`}
                    >
                      {employee.status === "active"
                        ? t("active") || "Active"
                        : employee.status === "inactive"
                          ? t("inactive") || "Inactive"
                          : t("pending") || "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {formatDate(employee.joinDate)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                        title={t("view") || "View"}
                      >
                        <Eye className="w-4 h-4 text-current" />
                      </button>
                      {canEdit(employee) && (
                        <button
                          onClick={() => onEdit(employee.id)}
                          className="text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                          title={t("edit") || "Edit"}
                        >
                          <Edit className="w-4 h-4 text-current" />
                        </button>
                      )}
                      {canDelete(employee) && (
                        <button
                          onClick={() => setShowDeleteConfirm(employee.id)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                          title={t("delete") || "Delete"}
                        >
                          <Trash2 className="w-4 h-4 text-current" />
                        </button>
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
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {employee.fullName}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {employee.email}
                </p>
              </div>
              <div className="relative">
                <button
                  onClick={() =>
                    setMobileMenuOpen(
                      mobileMenuOpen === employee.id ? null : employee.id,
                    )
                  }
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>

                {mobileMenuOpen === employee.id && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setMobileMenuOpen(null)}
                    />

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-20">
                      <button
                        onClick={() => {
                          setMobileMenuOpen(null);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center rounded-t-lg text-gray-700 dark:text-gray-200"
                      >
                        <Eye className="w-4 h-4 mr-2 text-current" />
                        {t("view") || "View"}
                      </button>
                      {canEdit(employee) && (
                        <button
                          onClick={() => {
                            onEdit(employee.id);
                            setMobileMenuOpen(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center text-gray-700 dark:text-gray-200"
                        >
                          <Edit className="w-4 h-4 mr-2 text-current" />
                          {t("edit") || "Edit"}
                        </button>
                      )}
                      {canDelete(employee) && (
                        <button
                          onClick={() => {
                            setShowDeleteConfirm(employee.id);
                            setMobileMenuOpen(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center rounded-b-lg"
                        >
                          <Trash2 className="w-4 h-4 mr-2 text-current" />
                          {t("delete") || "Delete"}
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  employee.role === "owner"
                    ? "bg-secondary/20 dark:bg-secondary/30 text-gray-900 dark:text-white"
                    : "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                }`}
              >
                {employee.role === "owner"
                  ? t("owner") || "Owner"
                  : t("staff") || "Staff"}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  employee.status === "active"
                    ? "bg-success/20 text-success dark:text-green-400"
                    : employee.status === "inactive"
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      : "bg-warning/20 text-warning dark:text-yellow-400"
                }`}
              >
                {employee.status === "active"
                  ? t("active") || "Active"
                  : employee.status === "inactive"
                    ? t("inactive") || "Inactive"
                    : t("pending") || "Pending"}
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t("joined") || "Joined"}: {formatDate(employee.joinDate)}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-800 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {t("showing") || "Showing"} {startIndex + 1} {t("to") || "to"}{" "}
            {Math.min(endIndex, employees.length)} {t("of") || "of"}{" "}
            {employees.length} {t("employees") || "employees"}
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

export default AllEmployeesTable;
