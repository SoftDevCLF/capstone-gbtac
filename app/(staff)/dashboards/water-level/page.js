"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../../../_components/DashboardLayout";
import DatePicker from "../../../_components/DatePicker";
import InfoCard from "../../../_components/InfoCard";
import LineHandler from "@/app/_components/graphs/handlers/LineHandler";
import { loadDashboardState, saveDashboardState } from "../../../utils/storage";
import { saveRecentDashboard } from "../../../utils/saveRecentDashboard";

const STORAGE_KEY = "dashboard-water-level";

export default function WaterLevelDashboard() {
  const [state, setState] = useState(() =>
    loadDashboardState(STORAGE_KEY, {
      fromDate: "",
      toDate: "",
      viewMode: "percent",
    }),
  );

  useEffect(() => {
    saveDashboardState(STORAGE_KEY, state);
  }, [state]);

   const handleSaveScreen = () => {
    saveDashboardState(STORAGE_KEY, state);

    saveRecentDashboard({
      id: "water-level",
      title: "Water Level Dashboard",
      path: "/dashboards/water-level",
      summary: {
        fromDate: state.fromDate,
        toDate: state.toDate,
        viewMode: state.viewMode,
      },
      saved: true,
    });

    alert(
      "Dashboard state saved! Your graph settings are restored for next login.",
    );
  };

  return (
    <DashboardLayout title="Cistern Water Level Dashboard">
      <InfoCard
        items={[
          { label: "Current Level", value: "3.2 L" },
          { label: "Daily Avg", value: "3.0 L" },
          { label: "Daily Max", value: "3.8 L" },
          { label: "Daily Min", value: "1.0 L" },
        ]}
      />

      <div className="flex flex-wrap items-end gap-6 mb-6">
        <div className="flex flex-col">
          <label className="text-sm text-gray-400 mb-1">From</label>
          <input
            type="date"
            value={state.fromDate}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                fromDate: e.target.value,
              }))
            }
            className="h-10 px-4 rounded border border-gray-500 bg-black text-white"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-400 mb-1">To</label>
          <input
            type="date"
            value={state.toDate}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                toDate: e.target.value,
              }))
            }
            className="h-10 px-4 rounded border border-gray-500 bg-black text-white"
          />
        </div>

        <div className="flex flex-col justify-end">
          <button
            className="h-10 px-6 bg-[#005EB8] text-white font-semibold rounded hover:bg-[#004080] transition"
          >
            Apply
          </button>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-400 mb-1">View</label>
          <select
            value={state.viewMode}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                viewMode: e.target.value,
              }))
            }
            className="h-10 px-4 rounded border border-gray-500 bg-black text-white"
          >
            <option value="percent">Level (%)</option>
            <option value="liters">Volume (L)</option>
          </select>
        </div>
      </div>

      <LineHandler
        sensorList={["20000_TL93"]}
        startDate={state.fromDate}
        endDate={state.toDate}
        graphTitle="Cistern Water Level (~32,000 litres)"
        yTitle={state.viewMode === "liters" ? "Water Volume (L)" : "Water Level (%)"}
        xTitle="hours"
        xUnit="hour"
        mode={state.viewMode}
        capacityLiters={32000}
      />

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSaveScreen}
          className="px-4 py-2 bg-[#005EB8] text-white font-semibold rounded hover:bg-[#004080] transition"
        >
          Save Screen
        </button>
      </div>
    </DashboardLayout>
  );
}
