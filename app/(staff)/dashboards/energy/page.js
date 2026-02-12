"use client";

import { useState } from "react";
import DashboardLayout from "../../../_components/DashboardLayout";
import DatePicker from "../../../_components/DatePicker";
import InfoCard from "../../../_components/InfoCard";

import LineHandler from "@/app/_components/graphs/handlers/LineHandler";

export default function EnergyDashboard() {

  const [fromDate, setFromDate] = useState("2025-12-31")
  const [toDate, setToDate] = useState("2025-12-31")

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
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}        
      />

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">

        <LineHandler 
          sensorList={[
            "30000_TL252",
            "30000_TL253",            
          ]}
          startDate={fromDate}
          endDate={toDate}
          graphTitle={"Solar Panel Graph"}
          yTitle={"kWh"}
          xTitle={"hours"}
          xUnit={"hour"}
        />
        
      </div>
    </DashboardLayout>
  );
}
