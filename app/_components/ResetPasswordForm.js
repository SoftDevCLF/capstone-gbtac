"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import ConfirmModal from "./ConfirmModal";
import NotificationModal from "./NotificationModal";

/**
 * ResetPasswordForm
 *
 * Form for users to set a new password. Validates the password against strength
 * requirements, prompts for confirmation, and redirects to /login on success.
 *
 * Notes:
 * - Validation enforces: minimum 8 characters, at least one uppercase letter, one
 *   number, and one special character (!@#$%^&*) — errors are shown per field inline
 * - Password visibility is reveal-on-hold rather than toggle — it hides again on
 *   mouse up, mouse leave, or touch end, handled separately for touch and pointer
 *   devices
 * - On success, NotificationModal is shown and onClose redirects to /login via
 *   the Next.js router rather than a hard navigation
 * 
 * @author Temi Bankole
 * @author Anna Isabelle Yabut
 */
export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const code = searchParams.get("code") || "";

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState("");

  const passwordChecks = {
    length: formData.newPassword.length >= 8,
    uppercase: /[A-Z]/.test(formData.newPassword),
    number: /[0-9]/.test(formData.newPassword),
    special: /[!@#$%^&*]/.test(formData.newPassword),
  };

  const passwordsMatch =
    formData.confirmNewPassword.length > 0 &&
    formData.newPassword === formData.confirmNewPassword;

  const validate = () => {
    const newErrors = {};
    if (formData.newPassword.length < 8)
      newErrors.newPassword = "Must be at least 8 characters.";
    else if (!/[A-Z]/.test(formData.newPassword))
      newErrors.newPassword = "Must contain at least one uppercase letter.";
    else if (!/[0-9]/.test(formData.newPassword))
      newErrors.newPassword = "Must contain at least one number.";
    else if (!/[!@#$%^&*]/.test(formData.newPassword))
      newErrors.newPassword = "Must contain at least one special character.";

    if (formData.newPassword !== formData.confirmNewPassword)
      newErrors.confirmNewPassword = "Passwords do not match.";

    if (!email) newErrors.general = "Missing reset email.";
    if (!code) newErrors.general = "Missing verification code.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      const nextErrors = { ...prev };

      if (name === "newPassword") {
        delete nextErrors.newPassword;

        if (
          formData.confirmNewPassword.length > 0 &&
          value !== formData.confirmNewPassword
        ) {
          nextErrors.confirmNewPassword = "Passwords do not match.";
        } else {
          delete nextErrors.confirmNewPassword;
        }
      }

      if (name === "confirmNewPassword") {
        if (formData.newPassword !== value) {
          nextErrors.confirmNewPassword = "Passwords do not match.";
        } else {
          delete nextErrors.confirmNewPassword;
        }
      }

      return nextErrors;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiError("");
    if (validate()) setShowConfirmModal(true);
  };

  const handleConfirmReset = async () => {
    setShowConfirmModal(false);
    setApiError("");
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-password-reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            code,
            newPassword: formData.newPassword,
          }),
        },
      );

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          typeof data?.detail === "string"
            ? data.detail
            : "Failed to reset password.",
        );
      }

      setShowNotificationModal(true);
    } catch (err) {
      setApiError(
        typeof err?.message === "string"
          ? err.message
          : "Failed to reset password.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseNotification = () => {
    setShowNotificationModal(false);
    router.push("/login");
  };

  return (
    <form
      className="space-y-8 text-[#212529] max-w-xl mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="space-y-6">
        <h2 className="text-2xl border-b pb-2 font-semibold text-gray-800">
          Set a New Password
        </h2>

        <div className="flex flex-col">
          <label htmlFor="new-password" className="font-semibold text-gray-800">
            New Password
          </label>
          <div className="mt-2 relative">
            <input
              id="new-password"
              name="newPassword"
              type={showPassword.new ? "text" : "password"}
              autoComplete="new-password"
              required
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              onFocus={() => setActiveField("new")}
              className="w-full pr-10 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-blue-500 transition text-gray-900 placeholder-gray-500"
            />
            {/* Reveal-on-hold toggle — hides password again on release or pointer leave */}
            <button
              type="button"
              className="absolute right-3 top-4"
              onMouseDown={() =>
                setShowPassword((prev) => ({ ...prev, new: true }))
              }
              onMouseUp={() =>
                setShowPassword((prev) => ({ ...prev, new: false }))
              }
              onMouseLeave={() =>
                setShowPassword((prev) => ({ ...prev, new: false }))
              }
              onTouchStart={() =>
                setShowPassword((prev) => ({ ...prev, new: true }))
              }
              onTouchEnd={() =>
                setShowPassword((prev) => ({ ...prev, new: false }))
              }
            >
              <Image
                src={
                  showPassword.new ? "/icons/eye-close.png" : "/icons/eye-open.png"
                }
                alt="toggle password"
                width={20}
                height={20}
              />
            </button>

            {activeField === "new" && (
              <div className="mt-3 space-y-1 text-sm">
                <p
                  className={
                    passwordChecks.length ? "text-green-600" : "text-gray-500"
                  }
                >
                  At least 8 characters
                </p>
                <p
                  className={
                    passwordChecks.uppercase ? "text-green-600" : "text-gray-500"
                  }
                >
                  At least one uppercase letter
                </p>
                <p
                  className={
                    passwordChecks.number ? "text-green-600" : "text-gray-500"
                  }
                >
                  At least one number
                </p>
                <p
                  className={
                    passwordChecks.special ? "text-green-600" : "text-gray-500"
                  }
                >
                  At least one special character (!@#$%^&*)
                </p>
              </div>
            )}

            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-2">{errors.newPassword}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="confirm-new-password"
            className="font-semibold text-gray-800"
          >
            Confirm New Password
          </label>
          <div className="mt-2 relative">
            <input
              id="confirm-new-password"
              name="confirmNewPassword"
              type={showPassword.confirm ? "text" : "password"}
              autoComplete="new-password"
              required
              placeholder="Re-enter new password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              onFocus={() => setActiveField("confirm")}
              className="w-full pr-10 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-blue-500 transition text-gray-900 placeholder-gray-500"
            />
            {/* Reveal-on-hold toggle — hides password again on release or pointer leave */}
            <button
              type="button"
              className="absolute right-3 top-4"
              onMouseDown={() =>
                setShowPassword((prev) => ({ ...prev, confirm: true }))
              }
              onMouseUp={() =>
                setShowPassword((prev) => ({ ...prev, confirm: false }))
              }
              onMouseLeave={() =>
                setShowPassword((prev) => ({ ...prev, confirm: false }))
              }
              onTouchStart={() =>
                setShowPassword((prev) => ({ ...prev, confirm: true }))
              }
              onTouchEnd={() =>
                setShowPassword((prev) => ({ ...prev, confirm: false }))
              }
            >
              <Image
                src={
                  showPassword.confirm
                    ? "/icons/eye-close.png"
                    : "/icons/eye-open.png"
                }
                alt="toggle password"
                width={20}
                height={20}
              />
            </button>

            {activeField === "confirm" &&
              formData.confirmNewPassword.length > 0 && (
                <p
                  className={`text-sm mt-3 ${
                    passwordsMatch ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {passwordsMatch ? "Passwords match" : "Passwords must match"}
                </p>
              )}

            {errors.confirmNewPassword && activeField !== "confirm" && (
              <p className="text-red-500 text-sm mt-2">
                {errors.confirmNewPassword}
              </p>
            )}
          </div>
        </div>

        {(errors.general || apiError) && (
          <p className="text-red-500 text-sm">{errors.general || apiError}</p>
        )}
      </div>

      <div className="space-y-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>

        {showConfirmModal && (
          <ConfirmModal
            title="Confirm Password Reset"
            message="Are you sure you want to reset your password?"
            confirmText="Yes, Reset"
            cancelText="No, Cancel"
            onConfirm={handleConfirmReset}
            onCancel={() => setShowConfirmModal(false)}
          />
        )}

        {showNotificationModal && (
          <NotificationModal
            title="Password Reset Successful"
            message="Your password has been reset successfully."
            onClose={handleCloseNotification}
          />
        )}

        <hr className="border-gray-300" />
        <div className="text-sm text-center sm:text-left">
          <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Back to Login
          </a>
        </div>
      </div>
    </form>
  );
}