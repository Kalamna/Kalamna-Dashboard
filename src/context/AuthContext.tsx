import React, { createContext } from 'react';
export const AuthContext = createContext<any>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
export const useAuth = () => ({});
