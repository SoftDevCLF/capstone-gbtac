"use client";

import { useState } from "react";
import Link from "next/link";
import ConfirModal from "./ConfirmModal";
import NotificationModal from "./NotificationModal";

/**
 * CreateStaffForm
 *
 * Form for admins to create a new staff account by providing a first name,
 * last name, email, and active status. Submits to the API and resets on success.
 *
 * Notes:
 * - status is stored as "Active" / "Inactive" in local state but converted to a
 *   boolean active field before being sent to the API
 * - API error responses are normalised from three possible detail shapes: a plain
 *   string, a validation array, or an object — only the array case has special
 *   email message handling
 * - On success the form resets to its initial state; navigation back to
 *   /account-manager is left to the user via the Cancel button
 * - Cancel navigates to /account-manager and is typed as a reset button, so it
 *   also clears the form if clicked before any submission 
 * @author Temi Bankole
 */
export default function CreateStaffForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    status: "Active",
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/auth/create-staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        //API expects `active` as boolean, derived from UI status select value.
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          active: formData.status === "Active",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = "Failed to create staff account";

        //Normalize backend error shapes into one user-facing alert message.
        if (typeof data.detail === "string") {
          errorMessage = data.detail;
        } else if (Array.isArray(data.detail) && data.detail.length > 0) {
          let rawMsg = data.detail[0].msg || errorMessage;
          if (rawMsg.toLowerCase().includes("email address")) {
            errorMessage = "Not a valid email address: must contain an @ symbol";
          } else {
            errorMessage = rawMsg;
          }
        } else if (typeof data.detail === "object" && data.detail !== null) {
          errorMessage = data.detail.message || JSON.stringify(data.detail);
        }

        alert(errorMessage);
        return;
      }

      alert("Staff account created successfully");

      //Reset form to defaults after successful account creation.
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        status: "Active",
      });
    } catch (error) {
      console.error("Create staff error:", error);
      alert("Something went wrong while creating the staff account.");
    }
  };

  return (
     <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
    <form
      onSubmit={handleSubmit}
      className="space-y-10 text-[#212529]"
    >
      <div className="space-y-6">
        <h2 className="text-lg border-b pb-2 font-semibold text-gray-800">
          Staff Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-800">First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              maxLength={50}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-blue-500 transition text-gray-900 placeholder-gray-500"
              required
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm mt-1">{errors.firstName}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-800">Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              maxLength={50}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-blue-500 transition text-gray-900 placeholder-gray-500"
              required
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm mt-1">{errors.lastName}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-800">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="johndoe@edu.sait.ca"
            maxLength={150}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-blue-500 transition text-gray-900 placeholder-gray-500"
            required
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-800">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-blue-500 transition text-gray-900 bg-white"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 border-t mt-8">
        <Link href="/account-manager">
          <button
            type="reset"
            className="px-5 py-3 bg-[#912932] text-white font-semibold rounded hover:bg-[#8B1625] transition"
          >
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="px-5 py-3 bg-[#005EB8] text-white font-semibold rounded hover:bg-[#004080] transition"
        >
          Create Staff
        </button>
        {showConfirmModal && (
          <ConfirmModal
            title="Confirm Staff Creation"
            message="Are you sure you want to create this staff member?"
            onConfirm={() => {
              // TODO: Implement staff creation functionality
              setShowConfirmModal(false);
              setShowNotificationModal(true);
            }}
            onCancel={() => setShowConfirmModal(false)}
          />
        )}
        {showNotificationModal && (
          <NotificationModal
            title="Staff Created"
            message="Staff member has been successfully created!"
            onClose={() => setShowNotificationModal(false)}
          />
        )}
      </div>
    </form>
  </div>
  );
}