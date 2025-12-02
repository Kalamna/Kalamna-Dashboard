import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en/translation.json";
import arTranslations from "./locales/ar/translation.json";

const resources = {
  en: {
    translation: enTranslations,
  },
  ar: {
    translation: arTranslations,
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
