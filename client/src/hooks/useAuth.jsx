import { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("luxe_user");
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("luxe_token");
    if (!token) {
      setLoading(false);
      return;
    }
    authService
      .getMe()
      .then(({ user }) => {
        setUser(user);
        localStorage.setItem("luxe_user", JSON.stringify(user));
      })
      .catch(() => {
        localStorage.removeItem("luxe_token");
        localStorage.removeItem("luxe_user");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (payload) => {
    const { token, user } = await authService.login(payload);
    localStorage.setItem("luxe_token", token);
    localStorage.setItem("luxe_user", JSON.stringify(user));
    setUser(user);
    return user;
  }, []);

  const signup = useCallback(async (payload) => {
    const { token, user } = await authService.signup(payload);
    localStorage.setItem("luxe_token", token);
    localStorage.setItem("luxe_user", JSON.stringify(user));
    setUser(user);
    return user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("luxe_token");
    localStorage.removeItem("luxe_user");
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const { user } = await authService.getMe();
    setUser(user);
    localStorage.setItem("luxe_user", JSON.stringify(user));
    return user;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default useAuth;
