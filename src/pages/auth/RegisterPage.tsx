import React, { useState } from "react";
import {
  Mail, User, Lock, Globe, FileText, Building2,
  ArrowRight, Loader, Sun, Moon
} from "lucide-react";
import { translations } from "./translations";
import { useLanguage } from "../../context/LanguageContext";
import { useDarkMode } from "../../context/DarkModeContext";
import kalamnaLight from "../../assets/images/KalamnaLight.png";
import kalamnaDark from "../../assets/images/KalamnaDark.png";
import "../../styles.css";

// ============================================
// REGISTER COMPONENT
// ============================================
function Register({ onRegisterSuccess }: { onRegisterSuccess: () => void }) {
  const { language } = useLanguage();
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  const [formData, setFormData] = useState({
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
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: "var(--bg-main)", color: "var(--text-main)" }}
      >
        <div 
          className="max-w-md w-full rounded-lg shadow-lg p-6 sm:p-8 text-center"
          style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-success" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4">{t.registrationSuccess}</h2>
          <p className="text-sm sm:text-base mb-6">
            {t.registrationSuccessDesc}
          </p>
          <button 
            onClick={onRegisterSuccess}
            className="inline-block bg-primary text-white px-6 py-2.5 sm:py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold text-sm sm:text-base"
          >
            {t.goToLogin}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen flex items-center justify-center p-4 ${language === "ar" ? "rtl" : ""} ${darkMode ? "dark-mode" : ""}`}
      style={{ backgroundColor: "var(--bg-main)", color: "var(--text-main)" }}
    >
      <div className="fixed top-4 right-4 flex items-center space-x-2 sm:space-x-3 z-50">
        <button
          onClick={() => window.location.reload()}
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

      <div 
        className="max-w-2xl w-full rounded-lg shadow-lg overflow-hidden"
        style={{ backgroundColor: "var(--card-bg)" }}
      >
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
              src={kalamnaLight} 
              alt="Kalamna" 
              className="h-12 sm:h-16 object-contain dark:hidden"
            />
            <img 
              src={kalamnaDark} 
              alt="Kalamna" 
              className="h-12 sm:h-16 object-contain hidden dark:block"
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-2" style={{ color: "var(--card-text)" }}>{t.createAccount}</h1>
          <p className="text-sm sm:text-base text-center" style={{ color: "var(--text-main)", opacity: 0.7 }}>{t.registerDesc}</p>

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

        <div className="p-6 sm:p-8" style={{ backgroundColor: "var(--card-bg)" }}>
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-3 sm:px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-4" style={{ color: "var(--card-text)" }}>{t.organizationInfo}</h3>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2" style={{ color: "var(--card-text)" }}>
                    {t.organizationName} <span className="text-red-500">{t.required}</span>
                  </label>
                  <div className="relative">
                    <Building2 className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5`} />
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleChange}
                      className={`w-full ${language === 'ar' ? 'pr-9 sm:pr-10 pl-3 sm:pl-4' : 'pl-9 sm:pl-10 pr-3 sm:pr-4'} py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                      style={{
                        backgroundColor: "var(--input-bg)",
                        borderColor: "var(--input-border)",
                        color: "var(--text-main)"
                      }}
                      placeholder="Your Company Name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2" style={{ color: "var(--card-text)" }}>
                    {t.organizationEmail} <span className="text-red-500">{t.required}</span>
                  </label>
                  <div className="relative">
                    <Mail className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5`} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full ${language === 'ar' ? 'pr-9 sm:pr-10 pl-3 sm:pl-4' : 'pl-9 sm:pl-10 pr-3 sm:pr-4'} py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                      style={{
                        backgroundColor: "var(--input-bg)",
                        borderColor: "var(--input-border)",
                        color: "var(--text-main)"
                      }}
                      placeholder="company@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2" style={{ color: "var(--card-text)" }}>
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
                      color: "var(--text-main)"
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
                  <label className="block text-xs sm:text-sm font-medium mb-2" style={{ color: "var(--card-text)" }}>
                    {t.websiteDomain}
                  </label>
                  <div className="relative">
                    <Globe className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5`} />
                    <input
                      type="url"
                      name="domainUrl"
                      value={formData.domainUrl}
                      onChange={handleChange}
                      className={`w-full ${language === 'ar' ? 'pr-9 sm:pr-10 pl-3 sm:pl-4' : 'pl-9 sm:pl-10 pr-3 sm:pr-4'} py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                      style={{
                        backgroundColor: "var(--input-bg)",
                        borderColor: "var(--input-border)",
                        color: "var(--text-main)"
                      }}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2" style={{ color: "var(--card-text)" }}>
                    {t.businessDescription}
                  </label>
                  <div className="relative">
                    <FileText className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-3 text-gray-400 w-4 h-4 sm:w-5 sm:h-5`} />
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className={`w-full ${language === 'ar' ? 'pr-9 sm:pr-10 pl-3 sm:pl-4' : 'pl-9 sm:pl-10 pr-3 sm:pr-4'} py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                      style={{
                        backgroundColor: "var(--input-bg)",
                        borderColor: "var(--input-border)",
                        color: "var(--text-main)"
                      }}
                      placeholder="Brief description..."
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-primary text-white py-2.5 sm:py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold flex items-center justify-center text-sm sm:text-base"
                >
                  {t.nextStep}
                  <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 ${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-4" style={{ color: "var(--card-text)" }}>{t.ownerAccountDetails}</h3>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2" style={{ color: "var(--card-text)" }}>
                    {t.fullName} <span className="text-red-500">{t.required}</span>
                  </label>
                  <div className="relative">
                    <User className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5`} />
                    <input
                      type="text"
                      name="ownerFullName"
                      value={formData.ownerFullName}
                      onChange={handleChange}
                      className={`w-full ${language === 'ar' ? 'pr-9 sm:pr-10 pl-3 sm:pl-4' : 'pl-9 sm:pl-10 pr-3 sm:pr-4'} py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                      style={{
                        backgroundColor: "var(--input-bg)",
                        borderColor: "var(--input-border)",
                        color: "var(--text-main)"
                      }}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2" style={{ color: "var(--card-text)" }}>
                    {t.password} <span className="text-red-500">{t.required}</span>
                  </label>
                  <div className="relative">
                    <Lock className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5`} />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full ${language === 'ar' ? 'pr-9 sm:pr-10 pl-3 sm:pl-4' : 'pl-9 sm:pl-10 pr-3 sm:pr-4'} py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                      style={{
                        backgroundColor: "var(--input-bg)",
                        borderColor: "var(--input-border)",
                        color: "var(--text-main)"
                      }}
                      placeholder="Min. 8 characters"
                      required
                      minLength={8}
                    />
                  </div>
                  <p className="text-xs mt-1" style={{ color: "var(--text-main)", opacity: 0.7 }}>{t.passwordHint}</p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2" style={{ color: "var(--card-text)" }}>
                    {t.confirmPassword} <span className="text-red-500">{t.required}</span>
                  </label>
                  <div className="relative">
                    <Lock className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5`} />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full ${language === 'ar' ? 'pr-9 sm:pr-10 pl-3 sm:pl-4' : 'pl-9 sm:pl-10 pr-3 sm:pr-4'} py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                      style={{
                        backgroundColor: "var(--input-bg)",
                        borderColor: "var(--input-border)",
                        color: "var(--text-main)"
                      }}
                      placeholder="Re-enter password"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-3 sm:space-x-4 rtl:space-x-reverse">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-2.5 sm:py-3 rounded-lg hover:opacity-80 transition-opacity font-semibold text-sm sm:text-base"
                    style={{
                      backgroundColor: "var(--input-bg)",
                      color: "var(--card-text)",
                      border: `1px solid var(--input-border)`
                    }}
                  >
                    {t.back}
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-primary text-white py-2.5 sm:py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {loading ? (
                      <>
                        <Loader className={`w-4 h-4 sm:w-5 sm:h-5 ${language === 'ar' ? 'ml-2' : 'mr-2'} animate-spin`} />
                        {t.creatingAccount}
                      </>
                    ) : (
                      t.createAccountBtn
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm" style={{ color: "var(--text-main)", opacity: 0.8 }}>
            {t.alreadyHaveAccount}{' '}
            <button onClick={() => window.location.hash = '#login'} className="text-primary hover:text-primary-dark font-semibold">
              {t.signIn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
