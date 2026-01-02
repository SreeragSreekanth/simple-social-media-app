import { createContext, useState } from "react";
import api from "../api/axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state directly from localStorage
  const [isAuth, setIsAuth] = useState(() => !!localStorage.getItem("access"));

  // Login function
  const login = async (email, password) => {
    try {
      const res = await api.post("/token/", { email, password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      setIsAuth(true);
    } catch (err) {
      console.error("Login failed:", err);
      setIsAuth(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
