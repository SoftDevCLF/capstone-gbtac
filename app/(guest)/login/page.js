"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import SecondaryNav from "../../_components/SecondaryNav";
import Navbar from "../../_components/Navbar";
import Footer from "../../_components/Footer";
import LoginForm from "../../_components/login/LoginForm";
import Background from "../../_components/login/Background";

/**
 * LoginPage
 *
 * Authentication page that renders the login form centred over a decorative
 * background. Loads the Cloudflare Turnstile script required by LoginForm's
 * CAPTCHA widget.
 *
 * Notes:
 * - The Turnstile script uses strategy="afterInteractive" so it does not
 *   block the initial page render.
 * - The login form is only rendered after the Turnstile script finishes
 *   loading, which prevents the CAPTCHA widget from failing to appear on the
 *   first visit.
 * - If the user returns to the page after the script has already loaded,
 *   the page also detects window.turnstile so it does not get stuck on the
 *   loading message.
 * - displayLogin={false} hides the Login link in SecondaryNav since this is
 *   the login page itself.
 * - Background is positioned absolute; the form container uses relative z-10
 *   to sit above it.
 *
 * @author Cintya Lara Flores
 * @author Anna Isabelle Yabut
 */
export default function LoginPage() {
  const [turnstileReady, setTurnstileReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.turnstile) {
      setTurnstileReady(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setTurnstileReady(true)}
      />
      <SecondaryNav displayLogin={false} />
      <Navbar />
      <main className="grow flex items-center justify-center relative">
        <Background />
        {/* z-10 keeps the form above the absolute-positioned Background */}
        <div className="container mx-auto px-4 py-5 flex justify-center relative z-10">
          {turnstileReady ? (
            <LoginForm />
          ) : (
            <div className="w-full max-w-md bg-white/85 rounded-sm shadow-md p-8 relative">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
                Login
              </h2>
              <p className="mb-6 text-gray-600 text-center">
                Loading security check...
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}