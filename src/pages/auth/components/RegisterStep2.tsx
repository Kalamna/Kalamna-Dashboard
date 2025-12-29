import React, { useState, useRef } from "react";
import { User, Lock, Loader, Eye, EyeOff } from "lucide-react";
import type { Step2Props } from "../types";

const RegisterStep2: React.FC<Step2Props> = ({
  formData,
  handleChange,
  setStep,
  loading,
  t,
  language,
  darkMode,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const handlePasswordToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordToggle = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div className="space-y-4 sm:space-y-6">
      <h3
        className="text-lg sm:text-xl font-semibold mb-4"
        style={{ color: "var(--card-text)" }}
      >
        {t.ownerAccountDetails}
      </h3>

      <div>
        <label
          className="block text-xs sm:text-sm font-medium mb-2"
          style={{ color: "var(--card-text)" }}
        >
          {t.fullName} <span className="text-red-500">{t.required}</span>
        </label>
        <div className="relative">
          <User
            className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5`}
          />
          <input
            type="text"
            name="ownerFullName"
            value={formData.ownerFullName}
            onChange={handleChange}
            dir={language === "ar" ? "rtl" : "ltr"}
            autoComplete="name"
            className={`w-full ${language === "ar" ? "pr-9 sm:pr-10 md:pr-11 pl-3 sm:pl-4 md:pl-5" : "pl-9 sm:pl-10 md:pl-11 pr-3 sm:pr-4 md:pr-5"} py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base md:text-base border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--text-main)",
              textAlign: language === "ar" ? "right" : "left",
              boxSizing: "border-box",
            }}
            placeholder={t.fullNamePlaceholder}
            required
          />
        </div>
      </div>

      <div>
        <label
          className="block text-xs sm:text-sm font-medium mb-2"
          style={{ color: "var(--card-text)" }}
        >
          {t.password} <span className="text-red-500">{t.required}</span>
        </label>
        <div className="relative">
          <Lock
            className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5`}
          />
          <input
            ref={passwordInputRef}
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            dir={language === "ar" ? "rtl" : "ltr"}
            autoComplete="new-password"
            className={`w-full ${language === "ar" ? "pr-10 sm:pr-11 pl-10 sm:pl-11" : "pl-10 sm:pl-11 pr-10 sm:pr-11"} py-3 sm:py-3.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--text-main)",
              textAlign: language === "ar" ? "right" : "left",
              boxSizing: "border-box",
            }}
            placeholder={t.passwordPlaceholder}
            required
            minLength={8}
          />
          <button
            type="button"
            onMouseDown={handlePasswordToggle}
            className={`absolute ${language === "ar" ? "left-3" : "right-3"} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-2 -m-2`}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        <p
          className="text-xs mt-1"
          style={{ color: "var(--text-main)", opacity: 0.7 }}
        >
          {t.passwordHint}
        </p>
      </div>

      <div>
        <label
          className="block text-xs sm:text-sm font-medium mb-2"
          style={{ color: "var(--card-text)" }}
        >
          {t.confirmPassword} <span className="text-red-500">{t.required}</span>
        </label>
        <div className="relative">
          <Lock
            className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5`}
          />
          <input
            ref={confirmPasswordInputRef}
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            dir={language === "ar" ? "rtl" : "ltr"}
            autoComplete="new-password"
            className={`w-full ${language === "ar" ? "pr-10 sm:pr-11 pl-10 sm:pl-11" : "pl-10 sm:pl-11 pr-10 sm:pr-11"} py-3 sm:py-3.5 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--text-main)",
              textAlign: language === "ar" ? "right" : "left",
              boxSizing: "border-box",
            }}
            placeholder={t.confirmPasswordPlaceholder}
            required
          />
          <button
            type="button"
            onMouseDown={handleConfirmPasswordToggle}
            className={`absolute ${language === "ar" ? "left-3" : "right-3"} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-2 -m-2`}
            tabIndex={-1}
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex space-x-3 sm:space-x-4 rtl:space-x-reverse">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 py-3.5 sm:py-4 rounded-xl hover:opacity-80 transition-all font-semibold text-sm sm:text-base"
          style={{
            backgroundColor: darkMode ? "#374151" : "#E5E7EB",
            color: darkMode ? "#D1D5DB" : "#4B5563",
          }}
        >
          {t.back}
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 text-white py-3.5 sm:py-4 rounded-xl hover:opacity-90 transition-all font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base shadow-lg hover:shadow-xl"
          style={{
            backgroundColor: "#2196F3",
          }}
        >
          {loading ? (
            <>
              <Loader
                className={`w-5 h-5 sm:w-6 sm:h-6 ${language === "ar" ? "ml-2" : "mr-2"} animate-spin`}
              />
              {t.creatingAccount}
            </>
          ) : (
            t.createAccountBtn
          )}
        </button>
      </div>
    </div>
  );
};

export default RegisterStep2;
