import React from "react";
import { Mail, Building2, Globe, FileText, ArrowRight } from "lucide-react";
import type { Step1Props } from "../types";

const RegisterStep1: React.FC<Step1Props> = ({
  formData,
  handleChange,
  handleNextStep,
  t,
  language,
}) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h3
        className="text-lg sm:text-xl font-semibold mb-4"
        style={{ color: "var(--card-text)" }}
      >
        {t.organizationInfo}
      </h3>

      <div>
        <label
          className="block text-xs sm:text-sm font-medium mb-2"
          style={{ color: "var(--card-text)" }}
        >
          {t.organizationName}{" "}
          <span className="text-red-500">{t.required}</span>
        </label>
        <div className="relative">
          <Building2
            className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5`}
          />
          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            dir={language === "ar" ? "rtl" : "ltr"}
            className={`w-full ${language === "ar" ? "pr-9 sm:pr-10 pl-3 sm:pl-4" : "pl-9 sm:pl-10 pr-3 sm:pr-4"} py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--text-main)",
              textAlign: language === "ar" ? "right" : "left"
            }}
            placeholder={t.organizationNamePlaceholder}
            required
          />
        </div>
      </div>

      <div>
        <label
          className="block text-xs sm:text-sm font-medium mb-2"
          style={{ color: "var(--card-text)" }}
        >
          {t.organizationEmail}{" "}
          <span className="text-red-500">{t.required}</span>
        </label>
        <div className="relative">
          <Mail
            className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5`}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            dir={language === "ar" ? "rtl" : "ltr"}
            className={`w-full ${language === "ar" ? "pr-9 sm:pr-10 pl-3 sm:pl-4" : "pl-9 sm:pl-10 pr-3 sm:pr-4"} py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--text-main)",
              textAlign: language === "ar" ? "right" : "left"
            }}
            placeholder={t.organizationEmailPlaceholder}
            required
          />
        </div>
      </div>

      <div>
        <label
          className="block text-xs sm:text-sm font-medium mb-2"
          style={{ color: "var(--card-text)" }}
        >
          {t.industry} <span className="text-red-500">{t.required}</span>
        </label>
        <select
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          style={{
            backgroundColor: "var(--input-bg)",
            borderColor: "var(--input-border)",
            color: "var(--text-main)",
          }}
          required
        >
          <option value="">{t.selectIndustry}</option>
          <option value="E-commerce">E-commerce</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Finance">Finance</option>
          <option value="Education">Education</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Technology">Technology</option>
          <option value="Retail">Retail</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label
          className="block text-xs sm:text-sm font-medium mb-2"
          style={{ color: "var(--card-text)" }}
        >
          {t.websiteDomain}
        </label>
        <div className="relative">
          <Globe
            className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5`}
          />
          <input
            type="url"
            name="domainUrl"
            value={formData.domainUrl}
            onChange={handleChange}
            dir={language === "ar" ? "rtl" : "ltr"}
            className={`w-full ${language === "ar" ? "pr-9 sm:pr-10 pl-3 sm:pl-4" : "pl-9 sm:pl-10 pr-3 sm:pr-4"} py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--text-main)",
              textAlign: language === "ar" ? "right" : "left"
            }}
            placeholder={t.websiteDomainPlaceholder}
          />
        </div>
      </div>

      <div>
        <label
          className="block text-xs sm:text-sm font-medium mb-2"
          style={{ color: "var(--card-text)" }}
        >
          {t.businessDescription}
        </label>
        <div className="relative">
          <FileText
            className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-3 text-gray-400 w-4 h-4 sm:w-5 sm:h-5`}
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            dir={language === "ar" ? "rtl" : "ltr"}
            className={`w-full ${language === "ar" ? "pr-9 sm:pr-10 pl-3 sm:pl-4" : "pl-9 sm:pl-10 pr-3 sm:pr-4"} py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--text-main)",
              textAlign: language === "ar" ? "right" : "left"
            }}
            placeholder={t.businessDescriptionPlaceholder}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleNextStep}
        className="w-full text-white py-3.5 sm:py-4 rounded-xl hover:opacity-90 transition-all font-semibold flex items-center justify-center text-sm sm:text-base shadow-lg hover:shadow-xl"
        style={{
          backgroundColor: "#2196F3",
        }}
      >
        {t.nextStep}
        <ArrowRight
          className={`w-5 h-5 sm:w-6 sm:h-6 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`}
        />
      </button>
    </div>
  );
};

export default RegisterStep1;
