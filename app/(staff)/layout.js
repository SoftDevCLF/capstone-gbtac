"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../_utils/auth-context";

export default function StaffLayout({ children }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, role, isAllowed } = useAuth();

  const prankEmail = "rick.rolld@sait.ca";
  const allowedPrankRoute = "/staff-welcome-page";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || loading) return;

    if (!isAllowed) {
      router.replace("/");
      return;
    }

    if (role !== "staff") {
      router.replace("/account-manager");
      return;
    }

    const currentEmail = user?.email?.toLowerCase?.() || "";

    if (
      currentEmail === prankEmail.toLowerCase() &&
      pathname !== allowedPrankRoute
    ) {
      router.replace(allowedPrankRoute);
    }
  }, [mounted, loading, isAllowed, role, user, pathname, router]);

  if (!mounted || loading || !isAllowed || role !== "staff") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="h-8 w-8 rounded-full border-4 border-gray-300 border-t-[#005EB8] animate-spin"></div>
      </div>
    );
  }

  return children;
}