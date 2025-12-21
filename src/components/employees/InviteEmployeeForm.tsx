import React, { useState } from "react";
import {
  Mail,
  User,
  Shield,
  AlertCircle,
  Send,
  RefreshCw,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type { InviteEmployeeFormData } from "../../types/employee";

interface InviteEmployeeFormProps {
  onSuccess: (_message: string) => void;
  onClose?: () => void;
}

const InviteEmployeeForm: React.FC<InviteEmployeeFormProps> = ({
  onSuccess,
  onClose,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFormData({ fullName: "", email: "", role: "staff" });
      setErrors({});
      onSuccess(t("invitationSentSuccess") || "Invitation sent successfully!");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        t("invitationFailed") ||
        "Failed to send invitation. Please try again.";
      setErrors({
        email: errorMessage,
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
    <div className="overflow-hidden">
      {/* Header - Matching KB Form Style */}
      <div className="sticky top-0 bg-white dark:bg-[#0d1f2d] z-10 flex justify-between items-center gap-3 px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-[#1e3a5f]">
        <div className={isRTL ? "text-right" : "text-left"}>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {t("inviteNewEmployee") || "Invite New Employee"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
            {t("inviteEmployeeSubtitle", {
              defaultValue:
                "Send an invitation to a new team member to join your dashboard.",
            })}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a2f45] active:scale-95"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Owner-only Info Box */}
        <div className="bg-blue-50 dark:bg-[#3b82f6]/10 border border-blue-200 dark:border-[#3b82f6]/30 rounded-lg p-4 flex items-start">
          <AlertCircle
            className={`w-5 h-5 text-[#0066cc] dark:text-[#3b82f6] ${isRTL ? "ml-3" : "mr-3"} flex-shrink-0 mt-0.5`}
          />
          <div className={isRTL ? "text-right" : "text-left"}>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {t("ownerOnlyAction") || "Owner-Only Action"}
            </p>
            <p className="text-xs text-gray-700 dark:text-gray-400 mt-1">
              {t("ownerOnlyDescription") ||
                "Only organization owners can invite new employees."}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Full Name */}
          <div className="space-y-1.5 sm:space-y-2">
            <label
              className={`block text-sm font-semibold text-gray-700 dark:text-gray-300 ${isRTL ? "text-right" : "text-left"}`}
            >
              {t("fullName") || "Full Name"}{" "}
              <span className="text-red-500 dark:text-red-400 ml-1">*</span>
            </label>
            <div className="relative">
              <User
                className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`}
              />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className={`w-full ${isRTL ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"} py-2.5 sm:py-3 border ${
                  errors.fullName
                    ? "border-red-500"
                    : "border-gray-300 dark:border-[#1e3a5f]"
                } rounded-lg focus:ring-2 focus:ring-[#0066cc] dark:focus:ring-[#3b82f6] focus:border-transparent bg-white dark:bg-[#0a1929] text-gray-900 dark:text-white transition-colors placeholder-gray-400 dark:placeholder-gray-500 shadow-sm text-sm sm:text-base`}
                placeholder={t("fullNamePlaceholder") || "John Doe"}
                disabled={isSubmitting}
              />
            </div>
            {errors.fullName && (
              <p
                className={`mt-1 text-sm text-red-500 dark:text-red-400 flex items-center ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <AlertCircle className={`w-4 h-4 ${isRTL ? "ml-1" : "mr-1"}`} />
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5 sm:space-y-2">
            <label
              className={`block text-sm font-semibold text-gray-700 dark:text-gray-300 ${isRTL ? "text-right" : "text-left"}`}
            >
              {t("email") || "Email"}{" "}
              <span className="text-red-500 dark:text-red-400 ml-1">*</span>
            </label>
            <div className="relative">
              <Mail
                className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`}
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`w-full ${isRTL ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"} py-2.5 sm:py-3 border ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 dark:border-[#1e3a5f]"
                } rounded-lg focus:ring-2 focus:ring-[#0066cc] dark:focus:ring-[#3b82f6] focus:border-transparent bg-white dark:bg-[#0a1929] text-gray-900 dark:text-white transition-colors placeholder-gray-400 dark:placeholder-gray-500 shadow-sm text-sm sm:text-base`}
                placeholder={t("emailPlaceholder") || "john@company.com"}
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p
                className={`mt-1 text-sm text-red-500 dark:text-red-400 flex items-center ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <AlertCircle className={`w-4 h-4 ${isRTL ? "ml-1" : "mr-1"}`} />
                {errors.email}
              </p>
            )}
          </div>

          {/* Role - Segmented Control (Slider-like) */}
          <div className="space-y-1.5 sm:space-y-2">
            <label
              className={`block text-sm font-semibold text-gray-700 dark:text-gray-300 ${isRTL ? "text-right" : "text-left"}`}
            >
              {t("role") || "Role"}{" "}
              <span className="text-red-500 dark:text-red-400 ml-1">*</span>
            </label>
            <div className="bg-gray-100 dark:bg-[#0a1929] p-1 rounded-lg border border-gray-200 dark:border-[#1e3a5f] flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleChange("role", "staff")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 active:scale-95 ${
                  formData.role === "staff"
                    ? "bg-[#0066cc] dark:bg-[#3b82f6] text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#1a2f45]"
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>{t("staff") || "Staff"}</span>
              </button>
              <button
                type="button"
                onClick={() => handleChange("role", "owner")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 active:scale-95 ${
                  formData.role === "owner"
                    ? "bg-[#0066cc] dark:bg-[#3b82f6] text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#1a2f45]"
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>{t("owner") || "Owner"}</span>
              </button>
            </div>
            <p
              className={`mt-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 ${isRTL ? "text-right" : "text-left"}`}
            >
              {t("roleDescription") ||
                "Staff can view data. Owners have full access to manage employees and settings."}
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-[#0066cc] hover:bg-[#0052a3] dark:bg-[#3b82f6] dark:hover:bg-[#2563eb] text-white py-3 sm:py-3.5 rounded-lg transition-all duration-200 font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw
                    className={`w-5 h-5 ${isRTL ? "ml-2" : "mr-2"} animate-spin`}
                  />
                  {t("sendingInvitation") || "Sending Invitation..."}
                </>
              ) : (
                <>
                  <Send className={`w-5 h-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {t("sendInvitation") || "Send Invitation"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteEmployeeForm;
