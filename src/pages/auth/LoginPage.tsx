import { useState, useEffect, useRef } from "react";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiGlobe,
  FiAlertCircle,
} from "react-icons/fi";
import { BsMoon } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";
import { useDarkMode } from "../../context/DarkModeContext";
import { useAuth } from "../../context/AuthContext";
import { saveUser } from "../../utils/authUtils";
import KalamnaLight from "../../assets/images/KalamnaLight.png";
import KalamnaDark from "../../assets/images/KalamnaDark.png";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import "../../styles.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { login } = useAuth();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    changeLanguage(newLang);
  };

  const handleLogin = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    // Basic empty checks
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (!isValid) return;

    // TODO: Integrate with real Auth API
    const DEMO_EMAIL = import.meta.env.VITE_DEMO_EMAIL;
    const DEMO_PASSWORD = import.meta.env.VITE_DEMO_PASSWORD;

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      console.log("Success login (Demo Mode)");

      // Save user data to cookies for the rest of the app to use
      saveUser(
        {
          email: DEMO_EMAIL || "demo@kalamna.com",
          name: "Demo User",
          role: "owner",
          organization: "Kalamna Demo",
        },
        "dummy-auth-token",
      );

      login("dummy-auth-token");
      navigate("/dashboard");
    } else {
      setGeneralError("Invalid email or password");
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
    setTimeout(() => {
      passwordInputRef.current?.focus();
    }, 0);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative ${
        language === "ar" ? "rtl" : ""
      } ${darkMode ? "dark-mode" : ""}`}
      style={{ backgroundColor: "var(--bg-main)", color: "var(--text-main)" }}
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
        className="w-[90%] max-w-[430px] shadow-lg rounded-lg p-6 md:p-8"
        style={{
          backgroundColor: "var(--card-bg)",
          color: "var(--card-text)",
        }}
      >
        {/* Logo */}
        <img
          src={darkMode ? KalamnaDark : KalamnaLight}
          alt="Kalamna"
          className="mb-7 mx-auto"
        />
        <h2 className="text-center text-xl font-semibold mt-2 mb-3">
          {t("welcome")}
        </h2>
        <p className="text-center text-gray-500 mb-6">{t("subtitle")}</p>

        {/* General Error Message */}
        {generalError && (
          <div className="mb-6 p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 flex items-center gap-2 text-sm text-red-700 dark:text-red-400">
            <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
            {generalError}
          </div>
        )}
        {/* Email Field */}
        <div className="mb-4">
          <label
            className={`block text-sm font-medium mb-1 ${language === "ar" ? "text-right" : ""}`}
            style={{ color: "var(--text-main)" }}
          >
            {t("email")}
          </label>
          <div
            className={`input-wrapper ${emailError ? "!border-red-500" : ""}`}
            style={{
              backgroundColor: darkMode ? "#0d1a2b" : "var(--input-bg)",
              borderColor: emailError ? "#ef4444" : "var(--input-border)",
              marginTop: "0",
              marginBottom: "0",
            }}
          >
            <FiMail className="text-gray-500" />
            <input
              className="flex-1 outline-none bg-transparent"
              type="email"
              placeholder={t("emailPlaceholder") ?? ""}
              style={{ color: "var(--text-main)" }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
                if (generalError) setGeneralError("");
              }}
              required
            />
          </div>
          {emailError && (
            <p style={{ color: "#f83737ff" }} className="text-xs mt-1">
              {emailError}
            </p>
          )}
        </div>
        {/* Password Field */}
        <div className="mb-4">
          <label
            className={`block text-sm font-medium mb-1 ${language === "ar" ? "text-right" : ""}`}
            style={{ color: "var(--text-main)" }}
          >
            {t("password")}
          </label>
          <div
            className={`input-wrapper ${passwordError ? "!border-red-500" : ""}`}
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: passwordError ? "#ef4444" : "var(--input-border)",
              marginTop: "0",
              marginBottom: "0",
            }}
          >
            <FiLock className="text-gray-500" />
            <input
              ref={passwordInputRef}
              className="flex-1 outline-none bg-transparent"
              type={showPassword ? "text" : "password"}
              placeholder={t("passwordPlaceholder") ?? ""}
              style={{ color: "var(--text-main)" }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError("");
                if (generalError) setGeneralError("");
              }}
              autoComplete="current-password"
              required
            />
            <div
              onClick={handlePasswordToggle}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              className="text-gray-500"
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </div>
          </div>
          {passwordError && (
            <p style={{ color: "#f83737ff" }} className="text-xs mt-1">
              {passwordError}
            </p>
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
        <button
          onClick={handleLogin}
          className="w-full text-white py-3 sm:py-3.5 rounded-xl hover:opacity-90 transition-all font-semibold flex items-center justify-center text-sm sm:text-base shadow-lg hover:shadow-xl"
          style={{
            backgroundColor: "#2196F3",
          }}
        >
          {t("signIn")}
        </button>
        {/* Create Account */}
        <p className="text-center text-sm mt-4">
          {t("dontHaveAccount")}{" "}
          <Link to="/register" className="text-blue-500 cursor-pointer">
            {t("createAccount")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
