// src/components/employees/InviteEmployeeForm.tsx

import React, { useState } from "react";
import { Mail, User, Shield, AlertCircle, Send, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { InviteEmployeeFormData } from "../../types/employee";

interface InviteEmployeeFormProps {
  onSuccess: (_message: string) => void;
}

const InviteEmployeeForm: React.FC<InviteEmployeeFormProps> = ({
  onSuccess,
}) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language as "en" | "ar";

  const [formData, setFormData] = useState<InviteEmployeeFormData>({
    fullName: "",
    email: "",
    role: "staff",
  });

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    role?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: {
      fullName?: string;
      email?: string;
      role?: string;
    } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t("fullNameRequired") || "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName =
        t("fullNameTooShort") || "Full name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = t("emailRequired") || "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email =
        t("emailInvalid") || "Please enter a valid email address";
    }

    if (!formData.role) {
      newErrors.role = t("roleRequired") || "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call
      // import { inviteEmployee } from '../../api/employees';
      // await inviteEmployee(formData);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFormData({ fullName: "", email: "", role: "staff" });
      setErrors({});
      onSuccess(t("invitationSentSuccess") || "Invitation sent successfully!");
    } catch (error: any) {
      setErrors({
        email:
          error.message ||
          t("invitationFailed") ||
          "Failed to send invitation. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof InviteEmployeeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      const newErrors = { ...errors };
      delete newErrors[field as keyof typeof errors];
      setErrors(newErrors);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Owner-only note */}
      <div className="mb-6 bg-secondary/10 dark:bg-secondary/20 border border-secondary/30 dark:border-secondary/40 rounded-lg p-4 flex items-start">
        <AlertCircle
          className={`w-5 h-5 text-secondary ${language === "ar" ? "ml-3" : "mr-3"} flex-shrink-0 mt-0.5`}
        />
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {t("ownerOnlyAction") || "Owner-Only Action"}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
            {t("ownerOnlyDescription") ||
              "Only organization owners can invite new employees."}
          </p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        {t("inviteNewEmployee") || "Invite New Employee"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("fullName") || "Full Name"}{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User
              className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`}
            />
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className={`w-full ${language === "ar" ? "pr-10 pl-4" : "pl-10 pr-4"} py-3 border ${
                errors.fullName
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
              placeholder={t("fullNamePlaceholder") || "John Doe"}
              disabled={isSubmitting}
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("email") || "Email"} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail
              className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`}
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`w-full ${language === "ar" ? "pr-10 pl-4" : "pl-10 pr-4"} py-3 border ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors`}
              placeholder={t("emailPlaceholder") || "john@company.com"}
              disabled={isSubmitting}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("role") || "Role"} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Shield
              className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10`}
            />
            <select
              value={formData.role}
              onChange={(e) =>
                handleChange("role", e.target.value as "owner" | "staff")
              }
              className={`w-full ${language === "ar" ? "pr-10 pl-4" : "pl-10 pr-4"} py-3 border ${
                errors.role
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors appearance-none cursor-pointer`}
              disabled={isSubmitting}
            >
              <option value="staff">{t("staff") || "Staff"}</option>
              <option value="owner">{t("owner") || "Owner"}</option>
            </select>
            <div
              className={`absolute ${language === "ar" ? "left-3" : "right-3"} top-1/2 transform -translate-y-1/2 pointer-events-none`}
            >
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {t("roleDescription") ||
              "Staff can view data. Owners have full access to manage employees and settings."}
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {isSubmitting ? (
            <>
              <RefreshCw
                className={`w-5 h-5 ${language === "ar" ? "ml-2" : "mr-2"} animate-spin`}
              />
              {t("sendingInvitation") || "Sending Invitation..."}
            </>
          ) : (
            <>
              <Send
                className={`w-5 h-5 ${language === "ar" ? "ml-2" : "mr-2"}`}
              />
              {t("sendInvitation") || "Send Invitation"}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InviteEmployeeForm;
