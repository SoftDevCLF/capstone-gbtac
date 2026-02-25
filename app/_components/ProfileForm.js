//This component is for the Staff to view and edit their profile information.
//They can add a profile photo, change their name, email, and password.
"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProfileForm({canChangePassword = false}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    profilePicture: null,
  });

  const [preview, setPreview] = useState("/default-profile-picture.jpg");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, [name]: file });

        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // TODO: Connect to API
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10"
      style={{ fontFamily: "var(--font-titillium)" }}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="relative group">
          <Image
            src={preview}
            alt="profile picture"
            width={144}
            height={144}
            className="w-36 h-36 rounded-full object-cover ring-4 ring-gray-100 shadow-md transition group-hover:ring-black"
          />

          <label className="absolute bottom-0 right-0 bg-black text-white text-xs px-4 py-1 rounded-full cursor-pointer shadow-md hover:bg-gray-800 transition">
            Edit
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg border-b pb-2 font-semibold text-gray-800">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-800">First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-blue-500 transition text-gray-900 placeholder-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-800">Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-blue-500 transition text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-800">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-blue-500 transition text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      {canChangePassword && (
        <div className="space-y-6">
          <h2 className="text-lg border-b pb-2 font-semibold text-gray-800">
            Change Password
          </h2>

          <div className="flex flex-col">
            <input
              placeholder="Current Password"
              onChange={handleChange}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-blue-500 transition text-gray-900 placeholder-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <input
              placeholder="New Password"
              onChange={handleChange}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-blue-500 transition text-gray-900 placeholder-gray-500"
            />
          </div>
              

          <div className="flex flex-col">
            <input
              placeholder="Confirm New Password"
              onChange={handleChange}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:border-blue-500 transition text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>
                 )}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 border-t mt-8">  
          <button
            type="submit"
            className="px-5 py-3 bg-[#005EB8] text-white font-semibold rounded hover:bg-[#004080] transition"
          >
            Save Changes
          </button>
          <button type="button" className="px-5 py-3 bg-[#912932] text-white  font-semibold rounded hover:bg-[#8B1625] transition">
            Cancel
          </button>
        </div>
    </form>
  );
}