"use client";

import { useAuth } from "../_utils/auth-context";

export default function GuestLayout({ children }) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 text-sm">Loading...</p>
      </div>
    );
  }

  return children;
}