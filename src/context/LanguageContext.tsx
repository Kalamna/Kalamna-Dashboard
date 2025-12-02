import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import i18next from "i18next";

interface LanguageContextType {
  language: string;
  changeLanguage: (_lang: string) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<string>(
    localStorage.getItem("app-language") || "en",
  );

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    i18next.changeLanguage(newLanguage);
    localStorage.setItem("app-language", newLanguage);
  };

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
