import { createContext, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("access")
  );

  const login = async (email, password) => {
    const res = await api.post("/token/", { email, password });
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.clear();
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
