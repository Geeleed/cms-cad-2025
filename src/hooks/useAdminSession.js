"use client";
import { useAdminSessionContext } from "@/components/admin/AdminSessionProvider";

export const ADMIN_SESSION_EVENT = "admin-session-change";

export default function useAdminSession() {
  return useAdminSessionContext();
}
