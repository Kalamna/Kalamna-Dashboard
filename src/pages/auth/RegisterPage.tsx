import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, Sun, Moon } from "lucide-react";
import { translations } from "./translations";
import { useLanguage } from "../../context/LanguageContext";
import { useDarkMode } from "../../context/DarkModeContext";
import kalamnaLight from "../../assets/images/KalamnaLight.png";
import kalamnaDark from "../../assets/images/KalamnaDark.png";
import "../../styles.css";
import RegisterStep1 from "./components/RegisterStep1";
import RegisterStep2 from "./components/RegisterStep2";
import RegisterSuccess from "./components/RegisterSuccess";
import type { FormData } from "./types";

// ============================================
// MAIN COMPONENT
// ============================================

function Register({ onRegisterSuccess }: { onRegisterSuccess: () => void }) {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const [formData, setFormData] = useState<FormData>({
    organizationName: '',
    email: '',
    password: '',
    confirmPassword: '',
    ownerFullName: '',
    industry: '',
    description: '',
    domainUrl: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);

  const t = translations[language as keyof typeof translations];

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    changeLanguage(newLang);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateStep1 = () => {
    if (!formData.organizationName || !formData.email || !formData.industry) {
      setError('Please fill in all required fields');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.ownerFullName || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setLoading(true);
    setError('');

    setTimeout(() => {
      try {
        const existingUser = localStorage.getItem(`user_${formData.email}`);
        console.log('Checking registration for:', formData.email);
        console.log('Found existing user:', existingUser);

        if (existingUser) {
          throw new Error('Email already registered');
        }

        const userData = {
          organizationName: formData.organizationName,
          email: formData.email,
          ownerFullName: formData.ownerFullName,
          password: formData.password,
          industry: formData.industry,
          description: formData.description,
          domainUrl: formData.domainUrl,
          verified: false,
          role: 'owner',
          createdAt: new Date().toISOString()
        };

        localStorage.setItem(`user_${formData.email}`, JSON.stringify(userData));
        setSuccess(true);
      } catch (err: any) {
        setError(err.message || 'An error occurred during registration');
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  if (success) {
    return <RegisterSuccess t={t} onRegisterSuccess={onRegisterSuccess} />;
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${language === "ar" ? "rtl" : ""} ${darkMode ? "dark-mode" : ""}`}
      style={{ backgroundColor: "var(--bg-main)", color: "var(--text-main)" }}
    >
      {/* Top Controls */}
      <div className="fixed top-4 right-4 flex items-center space-x-2 sm:space-x-3 z-50">
        <button
          onClick={toggleLanguage}
          className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all border text-sm"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--input-border)",
            color: "var(--card-text)"
          }}
        >
          <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm font-medium">{language === 'en' ? 'عربي' : 'EN'}</span>
        </button>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg shadow-md hover:shadow-lg transition-all border"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--input-border)",
            color: "var(--card-text)"
          }}
        >
          {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
      </div>

      {/* Main Card */}
      <div
        className="max-w-2xl w-full rounded-lg shadow-lg overflow-hidden"
        style={{ backgroundColor: "var(--card-bg)" }}
      >
        {/* Header Section */}
        <div
          className="text-gray-900 dark:text-white p-6 sm:p-8 border-b"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--input-border)",
            color: "var(--card-text)"
          }}
        >
          <div className="flex justify-center mb-4">
            <img
              src={darkMode ? kalamnaDark : kalamnaLight}
              alt="Kalamna"
              className="h-12 sm:h-16 object-contain"
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-2" style={{ color: "var(--card-text)" }}>{t.createAccount}</h1>
          <p className="text-sm sm:text-base text-center" style={{ color: "var(--text-main)", opacity: 0.7 }}>{t.registerDesc}</p>

          {/* Progress Steps */}
          <div className="flex items-center mt-6 space-x-2 sm:space-x-4 rtl:space-x-reverse">
            <div className={`flex items-center ${step >= 1 ? '' : ''}`} style={{ color: step >= 1 ? "var(--card-text)" : "var(--text-main)", opacity: step >= 1 ? 1 : 0.5 }}>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 text-xs sm:text-sm ${step >= 1 ? 'border-primary bg-primary text-white' : 'text-gray-400'}`} style={{ borderColor: step >= 1 ? 'inherit' : 'var(--input-border)' }}>
                1
              </div>
              <span className={`${language === 'ar' ? 'mr-1.5 sm:mr-2' : 'ml-1.5 sm:ml-2'} text-xs sm:text-sm font-medium hidden sm:inline`}>{t.organization}</span>
            </div>
            <div className={`flex-1 h-0.5 ${step >= 2 ? 'bg-primary' : ''}`} style={{ backgroundColor: step >= 2 ? '#3b82f6' : 'var(--input-border)' }}></div>
            <div className={`flex items-center ${step >= 2 ? '' : ''}`} style={{ color: step >= 2 ? "var(--card-text)" : "var(--text-main)", opacity: step >= 2 ? 1 : 0.5 }}>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 text-xs sm:text-sm ${step >= 2 ? 'border-primary bg-primary text-white' : 'text-gray-400'}`} style={{ borderColor: step >= 2 ? 'inherit' : 'var(--input-border)' }}>
                2
              </div>
              <span className={`${language === 'ar' ? 'mr-1.5 sm:mr-2' : 'ml-1.5 sm:ml-2'} text-xs sm:text-sm font-medium hidden sm:inline`}>{t.ownerDetails}</span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6 sm:p-8" style={{ backgroundColor: "var(--card-bg)" }}>
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-3 sm:px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <RegisterStep1
                formData={formData}
                handleChange={handleChange}
                handleNextStep={handleNextStep}
                t={t}
                language={language}
              />
            )}

            {step === 2 && (
              <RegisterStep2
                formData={formData}
                handleChange={handleChange}
                setStep={setStep}
                loading={loading}
                t={t}
                language={language}
                darkMode={darkMode}
              />
            )}
          </form>

          <p className="text-center text-sm mt-4 sm:mt-6" style={{ color: "var(--text-main)", opacity: 0.8 }}>
            {t.alreadyHaveAccount}{' '}
            <button onClick={() => navigate('/auth/login')} className="text-blue-500 cursor-pointer">
              {t.signIn}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
