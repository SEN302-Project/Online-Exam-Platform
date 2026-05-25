import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

// DEV MODE: When true, login bypasses the backend.
// Email determines role:
//   instructor@*  -> instructor
//   proctor@*     -> proctor
//   admin@*       -> system_admin
//   anything else -> student
const DEV_MODE = true;

function getRoleFromEmail(email) {
  const prefix = email.split("@")[0].toLowerCase();
  if (prefix.includes("instructor") || prefix.includes("teacher")) return "instructor";
  if (prefix.includes("proctor")) return "proctor";
  if (prefix.includes("admin")) return "system_admin";
  return "student";
}

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
    if (DEV_MODE) {
      // Bypass backend: create a fake user based on email prefix
      const role = getRoleFromEmail(email);
      const fakeUser = {
        id: `dev-${role}-${Date.now()}`,
        name:
          role === "instructor"
            ? "Dr. Sarah Williams"
            : role === "proctor"
              ? "Tom Anderson"
              : role === "system_admin"
                ? "Admin User"
                : email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        role,
      };
      setUser(fakeUser);
      localStorage.setItem("oep_user", JSON.stringify(fakeUser));
      localStorage.setItem("oep_token", "dev-token");
      return fakeUser;
    }

    // Real backend
    const data = await authService.login(email, password);
    setUser(data.user);
    localStorage.setItem("oep_user", JSON.stringify(data.user));
    localStorage.setItem("oep_token", data.token);
    return data.user;
  };

  const register = async (formData) => {
    if (DEV_MODE) return { ok: true };
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