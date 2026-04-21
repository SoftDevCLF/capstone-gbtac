"use client";

import SecondaryNav from "@/app/_components/SecondaryNav";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import VerifyCodeForm from "@/app/_components/VerifyCodeForm";
import Background from "@/app/_components/login/Background";

/**
 * ProfilePage
 *
 * Page layout for the verification code entry step in the password reset flow.
 * Renders the VerifyCodeForm within the standard page shell.
 *
 * Notes:
 * - The login button is hidden because this page is itself part of the login flow
 * - Home and About nav links are shown to match the main login page experience
 * - Background is positioned absolute; the form container uses relative z-10
 *   to sit above it
 * @author Temi Bankole
 * @author Anna Isabelle Yabut
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
            <VerifyCodeForm />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}