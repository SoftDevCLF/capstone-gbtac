"use client";

import SecondaryNav from "@/app/_components/SecondaryNav";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import ResetPasswordForm from "@/app/_components/ResetPasswordForm";
import Background from "@/app/_components/login/Background";

/**
 * ProfilePage
 *
 * Displays the user profile page with a password reset form. Renders the
 * secondary navigation and main navbar with specific options disabled, and
 * includes footer at the bottom.
 *
 * Notes:
 * - The login button is hidden because this page is part of the login flow
 * - Home and About nav links are shown to match the main login page experience
 * - Background is positioned absolute; the form container uses relative z-10
 *   to sit above it
 *
 * @author Temi Bankole
 * @author Anna Isabelle Yabut
 * @returns The profile page layout
 */
export default function ProfilePage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-100">
      <SecondaryNav displayLogin={false} />
      <Navbar />

      <div className="grow flex items-center justify-center relative">
        <Background />

        <div className="container mx-auto px-4 py-5 flex justify-center relative z-10">
          <div className="w-full max-w-md bg-white/85 shadow-md rounded-2xl p-8">
            <ResetPasswordForm />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}