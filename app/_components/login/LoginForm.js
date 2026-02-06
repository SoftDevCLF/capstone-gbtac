"use client";
import { useState } from "react";
import Modal from "./Modal";
export default function LoginForm() {
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!employeeNumber.trim()) {
      newErrors.employeeNumber = "Employee Number is required";
    } else if (!/^\d+$/.test(employeeNumber.trim())) {
      newErrors.employeeNumber = "Employee Number must be numeric";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleEmployeeNumberChange = (e) => {
    setEmployeeNumber(e.target.value);
  };
  const handleForgotSubmit = () => {
    alert(
      `If employee number ${employeeNumber} exists, an email will be sent with your password.`,
    );
    setShowForgotModal(false);
    setEmployeeNumber("");
  };

  const handleRequestSubmit = () => {
    alert(
      `Access request for employee number ${employeeNumber} sent to admin.`,
    );
    setShowRequestModal(false);
    setEmployeeNumber("");
  };

  const handleLogin = () => {
    if (!validate()) {
      return;
    }
    alert(`Logging in with Employee Number: ${employeeNumber}`);
    // Kiera: here is where you'd handle actual login logic, apparently using an API, but still you can modify as needed
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 relative">
      {/* Heading */}
      <h2
        className="text-3xl font-bold text-start mb-6"
        style={{ fontFamily: "var(--font-titillium)" }}
      >
        Login
      </h2>
      <p
        className="mb-6 text-gray-600"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        Enter your Credentials to access your account
      </p>

      <label
        className="font-semibold"
        style={{ fontFamily: "var(--font-titillium)" }}
      >
        Employee Number
      </label>
      <input
        type="text"
        placeholder="Enter your Employee Number"
        value={employeeNumber}
        onChange={(e) => setEmployeeNumber(e.target.value)}
        className="w-full border px-3 py-2 border-gray-300 rounded-lg my-4 focus:outline-none focus:border-blue-500"
      />

      {errors.employeeNumber && (
        <p className="text-red-500 text-sm mb-2">{errors.employeeNumber}</p>
      )}

      <label
        className="font-semibold"
        style={{ fontFamily: "var(--font-titillium)" }}
      >
        Password
      </label>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border px-3 py-2 border-gray-300 rounded-lg my-4 focus:outline-none focus:border-blue-500"
      />

      {errors.password && (
        <p className="text-red-500 text-sm mb-2">{errors.password}</p>
      )}

      <div className="flex justify-between mb-6 text-sm">
        <button
          type="button"
          className="text-blue-600 hover:underline"
          onClick={() => setShowForgotModal(true)}
        >
          Forgot my password
        </button>
        <button
          type="button"
          className="text-blue-600 hover:underline"
          onClick={() => setShowRequestModal(true)}
        >
          Request access
        </button>
      </div>
      <div className="flex justify-center">
        <button
          className="w-1/2 bg-[#005EB8] text-white py-3 rounded-full text-lg font-bold hover:bg-blue-700 transition flex justify-between items-center ps-15 pe-6"
          style={{ fontFamily: "var(--font-titillium)" }}
          onClick={handleLogin}
        >
          Login
          <span className="ml-2">{">"}</span>
        </button>
      </div>

      {showForgotModal && (
        <Modal
          title="Forgot Password"
          onClose={() => setShowForgotModal(false)}
          employeeNum={employeeNumber}
          employeeNumHandlerFunc={handleEmployeeNumberChange}
          handleForgotSubmit={handleForgotSubmit}
        />
      )}

      {showRequestModal && (
        <Modal
          title="Request Access"
          onClose={() => setShowRequestModal(false)}
        >
          <input
            type="text"
            placeholder="Enter your Employee Number"
            value={employeeNumber}
            onChange={(e) => setEmployeeNumber(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <button
            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 mt-2 w-full"
            onClick={handleRequestSubmit}
          >
            Send
          </button>
        </Modal>
      )}
    </div>
  );
}
