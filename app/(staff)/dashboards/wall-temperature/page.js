"use client";

import { useState } from "react";
import SecondaryNav from "../../../_components/SecondaryNav";
import Navbar from "../../../_components/Navbar";
import Footer from "../../../_components/Footer";

export default function Page() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApply = () => {
    console.log("Filter applied:", { startDate, endDate });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black font-sans">
      <SecondaryNav />
      <Navbar />

      <main className="flex-1 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4 py-8">
          <h1
            className="text-3xl font-bold mb-6 text-black dark:text-white"
            style={{ fontFamily: "var(--font-titillium)" }}
          >
            Wall Temperature Dashboard
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Average Wall Temp</p>
              <p className="text-2xl font-semibold">-- °C</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Min Wall Temp</p>
              <p className="text-2xl font-semibold">-- °C</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Max Wall Temp</p>
              <p className="text-2xl font-semibold">-- °C</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Latest Reading</p>
              <p className="text-2xl font-semibold">-- °C</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-end gap-4">
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm w-48"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm w-48"
              />
            </div>

            <button
              onClick={handleApply}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
            >
              Apply
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">
              Wall Temperature Trend
            </h2>

            <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed rounded">
              Chart placeholder (line chart goes here)
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
