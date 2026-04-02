import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    api
      .get("/api/auth/me")
      .then((data) => {
        if (active) {
          setUser(data);
        }
      })
      .catch(() => {
        if (active) {
          setUser(null);
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isLoggedIn: Boolean(user),
      setUser,
      async refreshUser() {
        const data = await api.get("/api/auth/me");
        setUser(data);
        return data;
      },
      async logout() {
        await api.post("/api/auth/logout", {});
        setUser(null);
      },
    }),
    [isLoading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
