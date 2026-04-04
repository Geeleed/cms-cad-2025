"use client";
import { useEffect, useState } from "react";

export const ADMIN_SESSION_EVENT = "admin-session-change";

export default function useAdminSession() {
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
    window.addEventListener(ADMIN_SESSION_EVENT, check);
    return () => window.removeEventListener(ADMIN_SESSION_EVENT, check);
  }, []);

  return { isAdmin, loading };
}
