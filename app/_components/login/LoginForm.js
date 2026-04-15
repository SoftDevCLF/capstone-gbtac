"use client";
import { useEffect, useState, useRef } from "react";
import Modal from "./Modal";
import NotificationModal from "@/app/_components/NotificationModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../_utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../_utils/auth-context";

/**
 * LoginForm
 *
 * Email/password login form for the Capstone App. Handles credential
 * validation, Cloudflare Turnstile CAPTCHA verification, backend lockout
 * enforcement, and role-based redirect after a successful sign-in. Also
 * exposes an access-request mailto shortcut for unapproved users.
 *
 * Notes:
 * - Accepts only @sait.ca, @edu.sait.ca, and @gmail.com addresses.
 * - Login attempts are rate-limited by the backend; cooldown countdowns are
 *   driven locally once the remaining seconds are returned from the API.
 * - Turnstile is rendered explicitly once the script has loaded so the widget
 *   reliably appears on the first visit to the page.
 *
 * @author Cintya Lara Flores
 * @author Anna Isabelle Yabut
 */

export default function LoginForm() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginCooldownSeconds, setLoginCooldownSeconds] = useState(0);
  const [captchaToken, setCaptchaToken] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    title: "",
    message: "",
    variant: "success",
  });

  const { setAuthFromLogin } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const showNotification = (
    message,
    variant = "error",
    title = variant === "error" ? "Error" : "Success",
  ) => {
    setNotification({ open: true, title, message, variant });
  };

  // Container ref for the explicitly rendered Cloudflare Turnstile widget
  const turnstileRef = useRef(null);
  // Stores the Turnstile widget ID returned by render() so reset() can target the correct widget
  const turnstileWidgetIdRef = useRef(null);

  // Counts down loginCooldownSeconds once the backend signals a lockout
  useEffect(() => {
    if (loginCooldownSeconds <= 0) return;

    const interval = setInterval(() => {
      setLoginCooldownSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loginCooldownSeconds]);

  // Explicitly renders the Turnstile widget once the script has loaded and the
  // container div is available. This avoids the widget sometimes failing to
  // appear on the first page load.
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.turnstile &&
      turnstileRef.current &&
      turnstileWidgetIdRef.current === null
    ) {
      turnstileWidgetIdRef.current = window.turnstile.render(
        turnstileRef.current,
        {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
          callback: (token) => {
            setCaptchaToken(token);
          },
          "expired-callback": () => {
            setCaptchaToken("");
          },
          "error-callback": () => {
            setCaptchaToken("");
          },
        },
      );
    }
  }, []);

  /**
   * isSaitEmail
   *
   * Returns true if the email belongs to an accepted domain
   * (@sait.ca, @edu.sait.ca, or @gmail.com).
   *
   * @param {string} email - The email address to check
   * @returns {boolean} Whether the domain is on the allowlist
   */
  const isSaitEmail = (email) => {
    const lower = email.toLowerCase();
    return (
      lower.endsWith("@sait.ca") ||
      lower.endsWith("@edu.sait.ca") ||
      lower.endsWith("@gmail.com")
    );
  };

  /**
   * checkLockout
   *
   * Asks the backend whether the account is currently locked due to too many
   * failed login attempts. Called before Firebase sign-in to avoid burning a
   * Firebase request on a known-locked account.
   *
   * @param {string} email - Lowercase email address to check
   * @returns {{ locked: boolean, remainingSeconds: number }} Lockout status
   *
   * Notes:
   * - Throws if the fetch itself fails; callers should catch and surface the error.
   */
  const checkLockout = async (email) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/check-lockout`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      },
    );

    if (!res.ok) {
      throw new Error("Failed to check lockout");
    }

    return res.json();
  };

  /**
   * recordFailedLogin
   *
   * Increments the failed-attempt counter for the given account on the backend.
   * Returns the remaining attempts before lockout, and lockout details once
   * the threshold is exceeded.
   *
   * @param {string} email - Lowercase email address
   * @returns {{ locked: boolean, remainingSeconds: number, remainingAttempts: number }}
   *
   * Notes:
   * - Throws if the fetch itself fails.
   */
  const recordFailedLogin = async (email) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/record-failed-login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      },
    );

    if (!res.ok) {
      throw new Error("Failed to record failed login");
    }

    return res.json();
  };

  /**
   * resetLoginAttempts
   *
   * Clears the failed-attempt counter for the given account after a successful
   * login. Called immediately after the session cookie is created.
   *
   * @param {string} email - Lowercase email address
   * @returns {{ success: boolean }} Backend confirmation
   *
   * Notes:
   * - Throws if the fetch itself fails.
   */
  const resetLoginAttempts = async (email) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-login-attempts`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      },
    );

    if (!res.ok) {
      throw new Error("Failed to reset login attempts");
    }

    return res.json();
  };

  /**
   * checkAllowedUserWithToken
   *
   * Verifies that the signed-in user's Firebase ID token corresponds to an
   * account on the backend allowlist. Must be called after Firebase sign-in
   * and before creating a session cookie.
   *
   * @param {string} idToken - Fresh Firebase ID token from the signed-in user
   * @returns {{ allowed: boolean }} Whether the account is on the allowlist
   *
   * Notes:
   * - Throws with the backend's detail message if the check fails or the
   *   account is not recognised.
   */
  const checkAllowedUserWithToken = async (idToken) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/check-allowed-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      },
    );

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.warn("Allowed user check failed:", res.status, data);
      throw new Error(
        typeof data?.detail === "string"
          ? data.detail
          : JSON.stringify(
              data?.detail || data || "Failed to check allowed user",
            ),
      );
    }

    return data;
  };

  /**
   * createSessionLogin
   *
   * Exchanges a Firebase ID token for a server-side session cookie. Uses
   * credentials: "include" so the browser stores the HttpOnly cookie returned
   * by the backend.
   *
   * @param {string} idToken - Fresh Firebase ID token from the signed-in user
   * @returns {{ success: boolean }} Session creation confirmation
   *
   * Notes:
   * - Throws if session creation fails; callers should sign out of Firebase
   *   before surfacing the error to avoid a partially authenticated state.
   */
  const createSessionLogin = async (idToken) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/session-login`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "Failed to create session");
    }

    return data;
  };

  /**
   * verifyCaptcha
   *
   * Sends the Cloudflare Turnstile token to the backend for server-side
   * verification. Login is blocked if this step fails.
   *
   * @param {string} token - Turnstile token from the widget success callback
   * @returns {{ success: boolean }} Verification result
   *
   * Notes:
   * - Throws if verification fails; callers should reset the Turnstile widget
   *   so the user must solve it again before the next attempt.
   */
  const verifyCaptcha = async (token) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-captcha`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captcha_token: token }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "CAPTCHA verification failed");
    }

    return data;
  };

  // Resets the Turnstile widget and clears the stored token so the user must solve the challenge again before their next login attempt
  const resetTurnstile = () => {
    setCaptchaToken("");
    if (
      typeof window !== "undefined" &&
      window.turnstile &&
      turnstileWidgetIdRef.current !== null
    ) {
      window.turnstile.reset(turnstileWidgetIdRef.current);
    }
  };

  // Validates the main login form; sets errors state and returns false if any field fails
  const validate = () => {
    const newErrors = {};

    if (!employeeEmail.trim()) newErrors.employeeEmail = "Email is required";
    else if (!employeeEmail.includes("@"))
      newErrors.employeeEmail = "Enter a valid email";
    else if (!isSaitEmail(employeeEmail.trim()))
      newErrors.employeeEmail = "Use a SAIT email";

    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Opens the user's mail client with a pre-filled access-request email addressed to the admin
  const handleRequestSubmit = () => {
    if (!employeeEmail.trim()) {
      showNotification("Please enter your email first.");
      return;
    }

    // Change to real admin email later on
    const adminEmail = "annaisabelle.yabut@edu.sait.ca";

    const subject = "Access Request – Capstone App";
    const body = `Hello,\n\nPlease approve access for:\n${employeeEmail
      .trim()
      .toLowerCase()}\n\nThanks.`;

    window.location.href = `mailto:${adminEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setShowRequestModal(false);
    setEmployeeEmail("");
  };

  // Full login sequence: validate → lockout check → CAPTCHA → Firebase sign-in → allowlist check → Firestore profile check → session creation → role-based redirect
  const handleLogin = async () => {
    if (!validate()) return;

    if (!captchaToken) {
      showNotification("Please complete the security check.");
      return;
    }

    setIsLoading(true);

    const emailLower = employeeEmail.trim().toLowerCase();

    try {
      const lockoutStatus = await checkLockout(emailLower);

      if (lockoutStatus.locked) {
        setLoginCooldownSeconds(lockoutStatus.remainingSeconds);
        showNotification(
          `Too many failed login attempts. Please wait ${lockoutStatus.remainingSeconds} seconds before trying again.`,
        );
        return;
      }

      setLoginCooldownSeconds(0);

      try {
        await verifyCaptcha(captchaToken);
      } catch (captchaErr) {
        resetTurnstile();
        showNotification(
          captchaErr.message ||
            "CAPTCHA verification failed. Please try again.",
        );
        return;
      }

      const cred = await signInWithEmailAndPassword(auth, emailLower, password);

      let idToken = await cred.user.getIdToken(true);
      let allowed;
      let lastError = null;

      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          if (attempt > 0) {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            idToken = await cred.user.getIdToken(true);
          }

          allowed = await checkAllowedUserWithToken(idToken);
          lastError = null;
          break;
        } catch (err) {
          lastError = err;

          if (!err.message?.includes("Token used too early")) {
            throw err;
          }
        }
      }

      if (lastError) {
        throw lastError;
      }

      if (!allowed.allowed) {
        showNotification("You are not authorized to access this app.");
        await signOut(auth);
        setPassword("");
        resetTurnstile();
        return;
      }

      const userRef = doc(db, "allowedUsers", emailLower);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await signOut(auth);
        setPassword("");
        resetTurnstile();
        showNotification("No access profile was found for this account.");
        return;
      }

      const userData = userSnap.data();

      if (userData.active !== true) {
        await signOut(auth);
        setPassword("");
        resetTurnstile();
        showNotification("This account is not active.");
        return;
      }

      console.log("Before createSessionLogin");
      const sessionData = await createSessionLogin(idToken);
      console.log("After createSessionLogin");

      setAuthFromLogin({
        email: sessionData.email,
        uid: sessionData.uid,
        role: sessionData.role,
      });

      await resetLoginAttempts(emailLower);

      setErrors({});
      setLoginCooldownSeconds(0);
      resetTurnstile();

      if (userData.role === "admin") {
        router.replace("/account-manager");
      } else if (userData.role === "staff") {
        router.replace("/staff-welcome-page");
      } else {
        await signOut(auth);
        showNotification("This account does not have a valid role assigned.");
      }
    } catch (err) {
      // auth/user-disabled indicates the account has been disabled in Firebase Auth
      if (err.code === "auth/user-disabled") {
        await signOut(auth);
        setPassword("");
        resetTurnstile();
        showNotification(
          "This account has been deactivated. Please contact an administrator.",
        );
        return;
      }

      // auth/too-many-requests is Firebase's own rate-limit, distinct from the backend lockout
      if (err.code === "auth/too-many-requests") {
        await signOut(auth);
        resetTurnstile();
        showNotification(
          "Too many login attempts were detected for this account. Please wait a few minutes before trying again.",
        );
        return;
      }

      const isInvalidLogin =
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/invalid-credential";

      try {
        const result = await recordFailedLogin(emailLower);

        if (result.locked) {
          setLoginCooldownSeconds(result.remainingSeconds);

          const mins = Math.floor(result.remainingSeconds / 60);
          const secs = result.remainingSeconds % 60;
          const timeText =
            mins > 0
              ? `${mins} minute(s) ${secs} second(s)`
              : `${secs} second(s)`;

          await signOut(auth);
          resetTurnstile();
          showNotification(
            `Too many failed login attempts. Account locked for ${timeText}.`,
          );
        } else if (isInvalidLogin) {
          await signOut(auth);
          resetTurnstile();
          showNotification(
            `Invalid email or password. You have ${result.remainingAttempts} attempt(s) left.`,
          );
        } else {
          await signOut(auth);
          resetTurnstile();
          console.error("LOGIN ERROR:", err);
          showNotification(
            typeof err?.message === "string"
              ? err.message
              : "Login failed. Please try again.",
          );
        }
      } catch (backendErr) {
        await signOut(auth);
        resetTurnstile();
        console.error("BACKEND LOCKOUT ERROR:", backendErr);
        showNotification("Login failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`w-full max-w-md bg-white/85 rounded-sm shadow-md p-8 relative ${isLoading ? "cursor-wait" : "cursor-default"}`}
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
        Login
      </h2>
      <p className="mb-6 text-gray-600">
        Enter your Credentials to access your account
      </p>

      <label className="font-semibold text-gray-800">SAIT Email</label>
      <input
        type="email"
        placeholder="Enter your SAIT email"
        value={employeeEmail}
        onChange={(e) => setEmployeeEmail(e.target.value)}
        maxLength={320}
        disabled={isLoading}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 my-4 bg-white focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-500"
      />

      {errors.employeeEmail && (
        <p className="text-red-500 text-sm mb-2">{errors.employeeEmail}</p>
      )}
      <label className="font-semibold text-gray-800">Password</label>
      <div className="relative my-4">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 bg-white focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-500"
        />

        {/* Hold to reveal, release to hide — both mouse and touch events for cross-device support */}
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          onMouseDown={() => setShowPassword(true)}
          onMouseUp={() => setShowPassword(false)}
          onMouseLeave={() => setShowPassword(false)}
          onTouchStart={() => setShowPassword(true)}
          onTouchEnd={() => setShowPassword(false)}
        >
          <Image
            src={showPassword ? "/icons/eye-close.png" : "/icons/eye-open.png"}
            alt="toggle password"
            width={20}
            height={20}
          />
        </button>
      </div>
      <button
        type="button"
        className="text-blue-600/75 hover:underline text-sm mb-4 cursor-pointer"
        onClick={() => router.push("/auth/verify-codes")}
      >
        Forgot my password
      </button>

      {errors.password && (
        <p className="text-red-500 text-sm mb-2">{errors.password}</p>
      )}

      {/* Turnstile widget container — rendered explicitly after the Turnstile script loads */}
      <div className="flex justify-center mb-4">
        <div ref={turnstileRef} className="flex justify-center" />
      </div>

      <div className="flex justify-center">
        <button
          className="group w-1/2 bg-[#005EB8] text-white py-3 mb-6 rounded-full text-lg font-bold justify-center cursor-pointer hover:bg-blue-700 transition flex gap-4 items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleLogin}
          disabled={loginCooldownSeconds > 0 || isLoading}
        >
          {isLoading
            ? "Logging in..."
            : loginCooldownSeconds > 0
              ? `Wait ${loginCooldownSeconds}s`
              : "Login"}
          <Image
            src="/icons/arrow-right.png"
            alt="chevron"
            width={15}
            height={15}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>
      </div>

      <div className="flex text-sm justify-center gap-2">
        <label className="text-gray-600">Do not have an account?</label>
        <button
          type="button"
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => setShowRequestModal(true)}
        >
          Request access
        </button>
      </div>

      {showRequestModal && (
        <Modal
          title="Request Access"
          onClose={() => setShowRequestModal(false)}
          onSubmit={handleRequestSubmit}
          submitText="Send Request"
        >
          <input
            type="email"
            placeholder="Enter your SAIT email"
            value={employeeEmail}
            onChange={(e) => setEmployeeEmail(e.target.value)}
            maxLength={320}
            className="w-full border px-3 py-2 rounded text-gray-900 placeholder-gray-500"
          />
        </Modal>
      )}

      {notification.open && (
        <NotificationModal
          title={notification.title}
          message={notification.message}
          variant={notification.variant}
          onClose={() =>
            setNotification({
              open: false,
              title: "",
              message: "",
              variant: "success",
            })
          }
        />
      )}
    </div>
  );
}