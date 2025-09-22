"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface User {
  fullName: string; // Fixed: lowercase primitive
  phoneNumber: string;
  email: string;
  password: string;
  gender: string;
  city: string;
  country: string;
  isAdmin?: boolean; // Fixed: lowercase primitive
}

interface AuthContextType {
  isAuthenticated: boolean; // Fixed: lowercase
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updatedData: User) => void; // New: For editing profile
}

// initial value undefined because it helps to identify that the context is used within the provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  // New: Update  user fields 
  const updateUser = (updatedData: User) => {
    setUser((prev) => (prev ? { ...prev, ...updatedData } : null));
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    updateUser, // Add to value
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};