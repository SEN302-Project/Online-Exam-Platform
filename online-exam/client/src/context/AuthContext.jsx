import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("oep_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("oep_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setUser(data.user);
    localStorage.setItem("oep_user", JSON.stringify(data.user));
    localStorage.setItem("oep_token", data.token);
    return data.user;
  };

  const register = async (formData) => {
    const data = await authService.register(formData);
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("oep_user");
    localStorage.removeItem("oep_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};