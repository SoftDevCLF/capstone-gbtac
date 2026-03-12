"use client";

//add whatever X factor is used to convert natural gas units to kWh in the info tooltip
import { useState, useEffect } from "react";
import DashboardLayout from "../../../_components/DashboardLayout";
import DatePicker from "../../../_components/DatePicker";
import InfoCard from "../../../_components/InfoCard";
import TotalEnergyHandler from "@/app/_components/graphs/handlers/TotalEnergyHandler";
import { loadDashboardState, saveDashboardState } from "../../../utils/storage";
import { saveRecentDashboard } from "../../../utils/saveRecentDashboard";

const STORAGE_KEY = "dashboard-natural-gas"

export default function NaturalGasDashboard() {
  const [state, setState] = useState(() =>
    loadDashboardState(STORAGE_KEY, {
      fromDate: "2023-01-01",
      toDate: "2025-12-31",
    })
  );

  useEffect(() => {
    saveDashboardState(STORAGE_KEY, state);
  }, [state]);

  const handleSaveScreen = () => {
    saveDashboardState(STORAGE_KEY, state);

    saveRecentDashboard({
      id: "natural-gas",
      title: "Natural Gas Dashboard",
      path: "/dashboards/natural-gas",
      summary: {
        fromDate: state.fromDate,
        toDate: state.toDate,
      },
      saved: true,
    });

    alert(
      "Dashboard state saved! Your graph settings are restored for next login."
    );
  };

  return (
    <DashboardLayout title="Natural Gas and Electricity Dashboard">
      <InfoCard
        items={[
          { label: "Energy Type 1", value: "Natural Gas" },
          { label: "Energy Type 2", value: "Electricity" },
          { label: "Sensor", value: "30000_TL342" },
          { label: "Unit", value: "kWh" },
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
      </div>

      <div className="mt-10 flex flex-col gap-6 relative">
        <div className="bg-white rounded-lg shadow-md p-4">
          <TotalEnergyHandler
            sensorCode="30000_TL342"
            startDate={state.fromDate}
            endDate={state.toDate}
            graphTitle="Monthly Energy Consumption"
            yTitle="Energy (kWh)"
            xTitle="Month"
            xUnit="month"
            chartMode="stackedBar"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <TotalEnergyHandler
            sensorCode="30000_TL342"
            startDate={state.fromDate}
            endDate={state.toDate}
            graphTitle="Total Energy Consumption Trend"
            yTitle="Energy (kWh)"
            xTitle="Month"
            xUnit="month"
            chartMode="totalLine"
          />
        </div>

        <div className="text-sm text-center text-gray-500 mt-2">
          All information is displayed for educational purposes only.
        </div>
      </div>

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
