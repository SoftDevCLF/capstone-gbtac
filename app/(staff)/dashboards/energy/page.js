"use client";

import { useEffect, useState } from "react";
import { saveRecentDashboard } from "../../../utils/saveRecentDashboard";
import DashboardLayout from "../../../_components/DashboardLayout";
import DatePicker from "../../../_components/DatePicker";
import InfoCard from "../../../_components/InfoCard";
import { loadDashboardState, saveDashboardState } from "../../../utils/storage";
import LineHandler from "@/app/_components/graphs/handlers/LineHandler";
import PieHandler from "@/app/_components/graphs/handlers/PieHandler";

const STORAGE_KEY = "dashboard-energy";

export default function EnergyDashboard() {

  const [state, setState] = useState(() =>
    loadDashboardState(STORAGE_KEY, {
      fromDate: "2025-12-31",
      toDate: "2025-12-31",
    })
  );

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
      id: "energy",
      title: "Energy Dashboard",
      path: "/dashboards/energy",
      summary: {
        fromDate: state.fromDate,
        toDate: state.toDate,
        graphs: Object.keys(state.visibleGraphs || {}).filter(
          (g) => state.visibleGraphs[g],
        ),
      },
    });
  }, [state]);



  return (
    <DashboardLayout title="Energy Dashboard">
      <InfoCard
        items={[
          { label: "Current Usage", value: "120 kWh" },
          { label: "Daily Avg", value: "98 kWh" },
          { label: "Peak Usage", value: "180 kWh" },
          { label: "Cost Today", value: "$14.20" },
        ]}
      />

      <DatePicker
        fromDate={state.fromDate}
        toDate={state.toDate}
        setDate={setState}
      />

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">

        <LineHandler 
          sensorList={[
            "30000_TL340", // GBT Generation Hourly Wh
            "30000_TL341", // GBT Consumption Hourly Wh
            "30000_TL339", // GBT Net Energy Hourly Wh   
          ]}
          startDate={state.fromDate}
          endDate={state.toDate}
          graphTitle={"Consumption vs Generation"}
          yTitle={"Wh"}
          xTitle={"hours"}
          xUnit={"hour"}
        />

        <PieHandler
          sensorList={[
            "30000_TL252", // PV-CarportSolar_Total
            "30000_TL253", // PV-RooftopSolar_Total
          ]}
          startDate={state.fromDate}
          endDate={state.toDate}
          graphTitle={"Solar Panel Pie Chart"}
          label={"kWh"}
        />
        
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
