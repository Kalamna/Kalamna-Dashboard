import React, { createContext } from "react";
export const ThemeContext = createContext<any>(null);
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>
);
export const useTheme = () => ({ theme: "light", toggleTheme: () => {} });
