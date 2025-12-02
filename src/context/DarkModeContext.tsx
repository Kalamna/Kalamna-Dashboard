import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined,
);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  console.log("🔵 DarkModeProvider MOUNTING");

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("darkMode");
    console.log("🔵 Initial darkMode from localStorage:", savedMode);
    return savedMode === "true";
  });

  console.log("🔵 DarkModeProvider RENDER - darkMode:", darkMode);

  // Apply dark mode class to HTML element
  useEffect(() => {
    console.log("🔵 DarkMode useEffect running, darkMode:", darkMode);
    const htmlElement = document.documentElement;

    if (darkMode) {
      htmlElement.classList.add("dark");
      console.log("🔵 Added dark class. Classes:", htmlElement.className);
    } else {
      htmlElement.classList.remove("dark");
      console.log("🔵 Removed dark class. Classes:", htmlElement.className);
    }

    localStorage.setItem("darkMode", darkMode.toString());
    console.log("🔵 Saved to localStorage:", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    console.log("🔵 toggleDarkMode CALLED, current darkMode:", darkMode);
    setDarkMode((prev) => {
      console.log("🔵 setDarkMode callback - prev:", prev, "-> new:", !prev);
      return !prev;
    });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used inside DarkModeProvider");
  }
  return context;
};
