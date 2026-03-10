//This component allows users to select a date range for filtering sensor data. 
//The component also includes basic styling to match the overall design of the application.
//This component also has two other dropdowns containing the times (Hourly, Daily, Monthly, Yearly) and the aggregation.
"use client";
import { useState } from "react";

export default function DateRange({ dateRange, setDateRange }) {
  const [errors, setErrors] = useState({});

  const validate = (field, value, otherDate) => {
    if (field === "from") {
      if (!value) return "From date is required";
      if (otherDate && value > otherDate) return "From date must be before To date";
    }
    if (field === "to") {
      if (!value) return "To date is required";
      if (otherDate && value < otherDate) return "To date must be after From date";
    }
    if (field === "from") {
      if (!value) return "i  date is required";
      if (otherDate && value > otherDate) return "From date must be before To date";
      const today = new Date();
      const from = new Date(value);
      const diffYears = (today - from) / (1000 * 60 * 60 * 24 * 365);
      if (diffYears > 8) return "Start date cannot be more than 8 years ago";
    }
    if (field === "to") {
    if (!value) return "To date is required";
    if (otherDate && value < otherDate) return "To date must be after From date";
    const maxToDate = new Date("2025-12-31");
    const toDate = new Date(value);
    if (toDate > maxToDate) return "To date cannot be past December 31, 2025";
  }
    return null;
  };

  const handleChange = (field, value) => {
    setDateRange(prev => ({ ...prev, [field]: value }));
    const otherDate = field === "from" ? dateRange.to : dateRange.from;
    setErrors(prev => ({ ...prev, [field]: validate(field, value, otherDate) }));
  };

  return (
    <div
      style={{ fontFamily: "var(--font-titillium)" }}
      className="bg-white rounded-sm shadow-sm p-4 w-full h-full"
    >
      <h2 className="font-semibold text-black mb-4">Time and Aggregation Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm text-black mb-1">From</label>
          <input
            type="date"
            value={dateRange.from}
            onChange={(e) => handleChange("from", e.target.value)}
            className={`border p-2 rounded text-gray-500 ${errors.from ? "border-red-500" : ""}`}
          />
          {errors.from && (
            <p className="text-red-500 text-xs mt-1">{errors.from}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-black mb-1">To</label>
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => handleChange("to", e.target.value)}
            className={`border p-2 rounded text-gray-500 ${errors.to ? "border-red-500" : ""}`}
          />
          {errors.to && (
            <p className="text-red-500 text-xs mt-1">{errors.to}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col">
          <label className="text-sm text-black mb-1">Time Interval</label>
          <select
            value={dateRange.timeInterval || "hourly"}
            onChange={(e) => setDateRange(prev => ({ ...prev, timeInterval: e.target.value }))}
            className="border p-2 rounded text-gray-500"
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-black mb-1">Aggregation</label>
          <select
            value={dateRange.aggregation || "sum"}
            onChange={(e) => setDateRange(prev => ({ ...prev, aggregation: e.target.value }))}
            className="border p-2 rounded text-gray-500"
          >
            <option value="sum">Sum</option>
            <option value="average">Average</option>
          </select>
        </div>
      </div>

      <div className="mt-5 text-gray-500">
        {dateRange.from && dateRange.to
          ? "Select the time interval and aggregation to control the data going to be displayed."
          : "Choose a date range, time interval, and aggregation for your chart."}
      </div>
    </div>
  );
}