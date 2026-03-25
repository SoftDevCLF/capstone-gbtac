//This component is for the Admin to create a new staff account. They can input the staff's first name, last name, email, and status (active/inactive).
"use client";

import { useState } from "react";
import Link from "next/link";
import ConfirmModal from "./ConfirmModal";
import NotificationModal from "./NotificationModal";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowConfirmModal(true);
      // TODO: Connect to API
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailLower = formData.email.toLowerCase();
    if (!emailLower.endsWith("@sait.ca") && 
        !emailLower.endsWith("@edu.sait.ca") && 
        !emailLower.endsWith("@gmail.com")) {
      newErrors.email = "Must be a SAIT or Gmail email.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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