"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../_utils/auth-context";

export default function AdminLayout({ children }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { loading, role, isAllowed } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || loading) return;

    if (!isAllowed) {
      router.replace("/");
      return;
    }

    if (role !== "admin") {
      router.replace("/staff-welcome-page");
    }
  }, [mounted, loading, isAllowed, role, router]);

  if (!mounted || loading || !isAllowed || role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="h-8 w-8 rounded-full border-4 border-gray-300 border-t-[#005EB8] animate-spin"></div>
      </div>
    );
  }

  return children;
}