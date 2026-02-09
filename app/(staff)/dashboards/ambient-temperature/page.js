"use client";

import { useEffect, useState } from "react";
import { saveRecentDashboard } from "../../../utils/saveRecentDashboard";
import DashboardLayout from "../../../_components/DashboardLayout";
import DatePicker from "../../../_components/DatePicker";
import InfoCard from "../../../_components/InfoCard";
import GraphPlaceholder from "../../../_components/GraphPlaceholder";
import { loadDashboardState, saveDashboardState } from "../../../utils/storage";

const STORAGE_KEY = "dashboard-ambient-temp";

export default function AmbientTempDashboard() {
  const [state, setState] = useState(() =>
    loadDashboardState(STORAGE_KEY, {
      fromDate: "",
      toDate: "",
    }),
  );

  const { fromDate, toDate } = state;

  useEffect(() => {
    saveDashboardState(STORAGE_KEY, state);
  }, [state]);

  const handleSaveScreen = () => {
    saveDashboardState(STORAGE_KEY, state);
    alert(
      "Dashboard state saved! Your graph settings are restored for next login.",
    );
  };

  useEffect(() => {
    saveDashboardState(STORAGE_KEY, state);

    saveRecentDashboard({
      id: "ambient-temperature",
      title: "Ambient Temperature Dashboard",
      path: "/dashboards/ambient-temperature",
    });
  }, [state]);

  return (
    <DashboardLayout title="Ambient Temperature Dashboard">
      <InfoCard
        items={[
          { label: "Current Temp", value: "21°C" },
          { label: "Daily Avg", value: "20°C" },
          { label: "High", value: "24°C" },
          { label: "Low", value: "17°C" },
        ]}
      />

      <DatePicker
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={(v) => setState({ ...state, fromDate: v })}
        setToDate={(v) => setState({ ...state, toDate: v })}
      />

      <GraphPlaceholder />
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
