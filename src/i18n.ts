import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Manual translation (EN + AR)
const resources = {
  en: {
    translation: {
      //   logo: "",
      welcome: "Welcome Back!",
      subtitle: "Please sign in to continue",
      email: "Email Address",
      emailPlaceholder: "Enter your email",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      rememberMe: "Remember me",
      signIn: "Sign In",
      dontHaveAccount: "Don't have an account?",
      createAccount: "Create Account",
      langBtn: "Change Language",
    },
  },

  ar: {
    translation: {
      // logo: "",
      welcome: "مرحباً بعودتك!",
      subtitle: "من فضلك سجل الدخول للمتابعة",
      email: "البريد الإلكتروني",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      password: "كلمة المرور",
      passwordPlaceholder: "أدخل كلمة المرور",
      rememberMe: "تذكرني",
      signIn: "تسجيل الدخول",
      dontHaveAccount: "ليس لديك حساب؟",
      createAccount: "إنشاء حساب",
      langBtn: "تغيير اللغة",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("app-language") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
