import api from "./api";

export const authService = {
  login: async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  },
  register: async (formData) => {
    const { data } = await api.post("/auth/register", formData);
    return data;
  },
  verifyEmail: async (token) => {
    const { data } = await api.post("/auth/verify", { token });
    return data;
  },
  me: async () => {
    const { data } = await api.get("/auth/me");
    return data;
  },
};