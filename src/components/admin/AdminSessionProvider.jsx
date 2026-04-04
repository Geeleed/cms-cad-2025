"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AdminSessionContext = createContext({ isAdmin: false, loading: true });

export function AdminSessionProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = () => {
      fetch("/api/auth/me")
        .then((r) => r.json())
        .then((data) => setIsAdmin(data.isAdmin === true))
        .catch(() => setIsAdmin(false))
        .finally(() => setLoading(false));
    };
    check();
    window.addEventListener("admin-session-change", check);
    return () => window.removeEventListener("admin-session-change", check);
  }, []);

  return (
    <AdminSessionContext.Provider value={{ isAdmin, loading }}>
      {children}
    </AdminSessionContext.Provider>
  );
}

export function useAdminSessionContext() {
  return useContext(AdminSessionContext);
}
