import { useState, useEffect } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiGlobe } from "react-icons/fi";
import { BsMoon, BsSun } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";
import { useDarkMode } from "../../context/DarkModeContext";
import KalamnaLight from "../../assets/images/KalamnaLight.png";
import KalamnaDark from "../../assets/images/KalamnaDark.png";
import "./Login.css";
import "./Mobile.css";
import { useNavigate } from "react-router-dom";
import "../../styles.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    changeLanguage(newLang);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative ${
        language === "ar" ? "rtl" : ""
      } ${darkMode ? "dark-mode" : ""}`}
      style={{ backgroundColor: "var(--bg-main)", color: "var(--text-main)" }}
    >
      {/* Top Buttons */}
      <div className="absolute top-5 right-5 flex gap-2 sm:gap-3 z-50">
        <button
          className="border px-2 sm:px-3 py-1 sm:py-1.5 rounded-md flex items-center gap-1 text-xs sm:text-sm"
          onClick={toggleLanguage}
          style={{
            borderColor: "var(--input-border)",
            color: "var(--text-main)",
            backgroundColor: "var(--card-bg)",
          }}
        >
          <FiGlobe className="w-4 h-4" /> {language === "en" ? "AR" : "EN"}
        </button>

        <button
          className="border px-2 sm:px-3 py-1 sm:py-1.5 rounded-md flex items-center gap-1 text-xs sm:text-sm"
          onClick={toggleDarkMode}
          style={{
            borderColor: "var(--input-border)",
            color: "var(--text-main)",
            backgroundColor: "var(--card-bg)",
          }}
        >
          {darkMode ? (
            <BsSun className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <BsMoon className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      </div>

      {/* Card */}
      <div
        className="w-[90%] max-w-[430px] sm:max-w-[500px] shadow-lg rounded-lg p-6 sm:p-8"
        style={{
          backgroundColor: "var(--card-bg)",
          color: "var(--card-text)",
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <img
            src={darkMode ? KalamnaDark : KalamnaLight}
            alt="Kalamna"
            className="h-12 sm:h-16 object-contain"
          />
        </div>

        <h2 
          className="text-center text-xl sm:text-2xl font-bold mb-2"
          style={{ color: "var(--card-text)" }}
        >
          {t("welcome")}
        </h2>

        <p 
          className="text-center text-sm sm:text-base mb-6 sm:mb-8"
          style={{ color: "var(--text-main)", opacity: 0.7 }}
        >
          {t("subtitle")}
        </p>

        <form className="space-y-4 sm:space-y-6">
          {/* Email Label */}
          <div>
            <label
              className="block text-xs sm:text-sm font-medium mb-2"
              style={{ color: "var(--card-text)" }}
            >
            {t("email")}
            </label>

            {/* Email Input */}
            <div className="relative">
              <FiMail
                className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5`}
              />
              <input
                className={`w-full ${language === "ar" ? "pr-9 sm:pr-10 pl-3 sm:pl-4" : "pl-9 sm:pl-10 pr-3 sm:pr-4"} py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                type="email"
                placeholder={t("emailPlaceholder") ?? ""}
                autoComplete="email"
                dir={language === "ar" ? "rtl" : "ltr"}
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: "var(--input-border)",
                  color: "var(--text-main)",
                  textAlign: language === "ar" ? "right" : "left",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              className="block text-xs sm:text-sm font-medium mb-2"
              style={{ color: "var(--card-text)" }}
            >
              {t("password")}
            </label>

            <div className="relative">
              <FiLock
                className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5`}
              />
              <input
                className={`w-full ${language === "ar" ? "pr-9 sm:pr-10 pl-3 sm:pl-4" : "pl-9 sm:pl-10 pr-12 sm:pr-14"} py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                type={showPassword ? "text" : "password"}
                placeholder={t("passwordPlaceholder") ?? ""}
                autoComplete="current-password"
                dir={language === "ar" ? "rtl" : "ltr"}
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: "var(--input-border)",
                  color: "var(--text-main)",
                  textAlign: language === "ar" ? "right" : "left",
                  boxSizing: "border-box",
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute ${language === "ar" ? "left-3" : "right-3"} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none`}
              >
                {showPassword ? (
                  <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="remember"
              style={{
                accentColor: "#2196F3",
              }}
            />
            <label 
              htmlFor="remember" 
              className="text-xs sm:text-sm"
              style={{ color: "var(--text-main)" }}
            >
              {t("rememberMe")}
            </label>
          </div>

          {/* Sign In Button */}
          <button 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl"
            style={{
              backgroundColor: "#2196F3",
            }}
          >
            {t("signIn")}
          </button>
        </form>

        {/* Create Account */}
        <p 
          className="text-center text-xs sm:text-sm mt-4 sm:mt-6"
          style={{ color: "var(--text-main)", opacity: 0.8 }}
        >
          {t("dontHaveAccount")}{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:text-blue-600 font-semibold cursor-pointer"
          >
            {t("createAccount")}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
