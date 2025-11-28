import { useState, useEffect } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiGlobe } from "react-icons/fi";
import { BsMoon } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";
import { useDarkMode } from "../../context/DarkModeContext";
import Kalamna from "../../assets/images/Kalamna.png";
import "./Login.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

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
      style={{
        backgroundColor: darkMode ? "#0A1929" : "#f5f7fa",
        color: darkMode ? "white" : "black",
      }}
    >
      {/* Top Buttons */}
      <div className="absolute top-5 right-5 flex gap-3">
        <button
          className="border px-3 py-1 rounded-md flex items-center gap-1 text-sm"
          onClick={toggleLanguage}
        >
          <FiGlobe /> {language === "en" ? "AR" : "EN"}
        </button>

        <button
          className="border px-3 py-1 rounded-md text-sm"
          onClick={toggleDarkMode}
        >
          <BsMoon />
        </button>
      </div>

      {/* Card */}
      <div
        className="w-[430px] shadow-lg rounded-lg p-8"
        style={{
          backgroundColor: darkMode ? "#11243b" : "white",
          color: darkMode ? "white" : "black",
        }}
      >
        {/* Logo */}
        <img src={Kalamna} alt="Kalamna" className="mb-7 mx-auto" />

        <h2 className="text-center text-xl font-semibold mt-2 mb-3">
          {t("welcome")}
        </h2>

        <p className="text-center text-gray-500 mb-6">{t("subtitle")}</p>

        {/* Email Label */}
        <label
          className={`text-sm font-medium ${language === "ar" ? "text-right block" : ""}`}
        >
          {t("email")}
        </label>

        {/* Email Input */}
        <div
          className="input-wrapper"
          style={{
            backgroundColor: darkMode ? "#0d1a2b" : "",
            borderColor: darkMode ? "#1e3a5f" : "",
          }}
        >
          <FiMail className="text-gray-500" />
          <input
            className="w-full outline-none bg-transparent"
            type="email"
            placeholder={t("emailPlaceholder") ?? ""}
            style={{ color: darkMode ? "white" : "black" }}
          />
        </div>

        {/* Password Label */}
        <label
          className={`text-sm font-medium ${language === "ar" ? "text-right block" : ""}`}
        >
          {t("password")}
        </label>

        {/* Password Input */}
        <div
          className="input-wrapper"
          style={{
            backgroundColor: darkMode ? "#0d1a2b" : "",
            borderColor: darkMode ? "#1e3a5f" : "",
          }}
        >
          <FiLock className="text-gray-500" />
          <input
            className="w-full outline-none bg-transparent"
            type={showPassword ? "text" : "password"}
            placeholder={t("passwordPlaceholder") ?? ""}
            style={{ color: darkMode ? "white" : "black" }}
          />

          {showPassword ? (
            <FiEyeOff
              onClick={() => setShowPassword(false)}
              className="cursor-pointer"
            />
          ) : (
            <FiEye
              onClick={() => setShowPassword(true)}
              className="cursor-pointer"
            />
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2 mb-4">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember" className="text-sm">
            {t("rememberMe")}
          </label>
        </div>

        {/* Sign In Button */}
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-medium">
          {t("signIn")}
        </button>

        {/* Create Account */}
        <p className="text-center text-sm mt-4">
          {t("dontHaveAccount")}{" "}
          <Link to="/auth/register" className="text-blue-500 cursor-pointer">
            {t("createAccount")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
