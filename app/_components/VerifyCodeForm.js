"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * VerifyCodeForm
 *
 * Renders a 6-digit verification code entry form with individual inputs per
 * digit, paste support, and a resend button with a 45-second cooldown.
 *
 * Notes:
 * - Each digit is stored as a separate string in a 6-element array; inputs are
 *   navigated via arrow keys and backspace in addition to normal typing
 * - Paste strips non-numeric characters, fills as many digits as were pasted,
 *   and focuses the last filled input
 * - The resend cooldown is driven by a setInterval stored in timerRef; the
 *   interval is cleared on unmount to prevent state updates on an unmounted component
 * - On successful verification the user is routed to /auth/reset-password via
 *   the Next.js router
 * 
 * @author Temi Bankole
 * @author Anna Isabelle Yabut
 */
export default function VerifyCodeForm() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const startCooldown = (seconds) => {
    clearInterval(timerRef.current);
    setCooldown(seconds);

    timerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = async () => {
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your email first.");
      return;
    }

    setIsSending(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/request-password-reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim().toLowerCase() }),
        },
      );

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          typeof data?.detail === "string"
            ? data.detail
            : "Failed to send verification code.",
        );
      }

      if (!data.success) {
        startCooldown(data.remainingSeconds || 45);
        setMessage(data.message || "Please wait before requesting another code.");
        return;
      }

      setCodeSent(true);
      setMessage("Verification code sent. Please check your email.");
      startCooldown(data.remainingSeconds || 60);
    } catch (err) {
      setError(
        typeof err?.message === "string"
          ? err.message
          : "Failed to send verification code.",
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleCodeChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextCode = [...code];
    nextCode[index] = digit;
    setCode(nextCode);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      return;
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");

    if (pastedDigits.length === 0) return;

    const nextCode = ["", "", "", "", "", ""];
    pastedDigits.forEach((digit, i) => {
      nextCode[i] = digit;
    });
    setCode(nextCode);

    const focusIndex = Math.min(pastedDigits.length, 6) - 1;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const fullCode = code.join("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (fullCode.length !== 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setIsVerifying(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-reset-code`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            code: fullCode,
          }),
        },
      );

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          typeof data?.detail === "string"
            ? data.detail
            : "Invalid code. Please try again.",
        );
      }

      router.push(
        `/auth/reset-password?email=${encodeURIComponent(
          email.trim().toLowerCase(),
        )}&code=${encodeURIComponent(fullCode)}`,
      );
    } catch (err) {
      setError(
        typeof err?.message === "string"
          ? err.message
          : "Invalid code. Please try again.",
      );
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <form
      className="space-y-5 text-[#212529] max-w-xl mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl border-b pb-2 font-semibold text-gray-800">
            {codeSent ? "Enter Verification Code" : "Check Your Email"}
          </h2>
          <p className="text-sm text-gray-600">
            {codeSent
              ? "Enter the 6-digit code sent to your email."
              : "Enter your email to receive a verification code."}
          </p>
        </div>

        {!codeSent && (
          <div className="flex flex-col">
            <label htmlFor="reset-email" className="font-semibold text-gray-800">
              Email
            </label>
            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your SAIT email"
              className="mt-2 w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-blue-500 transition text-gray-900 placeholder-gray-500"
            />
          </div>
        )}

        {codeSent && (
          <>
            <div className="flex flex-col">
              <label
                htmlFor="verification-code"
                className="font-semibold text-gray-800"
              >
                Verification Code
              </label>

              <div
                className="mt-2 flex justify-center items-center gap-3"
                onPaste={handlePaste}
              >
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    id={index === 0 ? "verification-code" : undefined}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    value={digit}
                    required
                    aria-label={`Verification code digit ${index + 1}`}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="h-13 w-12 text-center text-lg font-semibold border rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-blue-500 transition text-gray-900"
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-600">
              To protect your account, do not share this code with anyone.
            </p>
          </>
        )}

        {message && <p className="text-green-600 text-sm">{message}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="space-y-3">
        <div className="flex justify-center">
          {!codeSent ? (
            <button
              type="button"
              onClick={handleResend}
              disabled={isSending || cooldown > 0}
              className="w-1/2 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              {cooldown > 0
                ? `Wait ${cooldown}s`
                : isSending
                  ? "Sending..."
                  : "Send Code"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isVerifying}
              className="w-1/2 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              {isVerifying ? "Verifying..." : "Verify Code"}
            </button>
          )}
        </div>

        {codeSent && (
          <>
            <hr className="my-4 border-gray-300" />
            <div className="text-sm text-center">
              {cooldown > 0 ? (
                <span className="text-gray-400">Resend Code in {cooldown}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isSending}
                  className="font-medium text-blue-600 hover:text-blue-500 disabled:text-gray-400"
                >
                  {isSending ? "Sending..." : "Resend Code"}
                </button>
              )}
            </div>

            <div className="text-sm text-center">
              <button
                type="button"
                onClick={() => {
                  setCodeSent(false);
                  setCode(["", "", "", "", "", ""]);
                  setError("");
                  setMessage("");
                }}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Change email
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
}