//This component holds the state for all controls
// It wraps the SensorPanel, DatePicker,  and TimeGranularityDropdown components, and passes the state down to them as props.
"use client";
import { useState } from "react";
import SensorPanel from "./SensorPanel";
import DatePicker from "../DatePicker";
import TimeGranularityDropdown from "../TimeGranularityDropdown";

export default function ReportControls() {
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [timeInterval, setTimeInterval] = useState("hourly");

  const handleDateChange = (newFrom, newTo) => {
    setFrom(newFrom);
    setTo(newTo);
  };

  return (
    <div className="space-y-6">
        <SensorPanel selectedSensor={selectedSensor} onSelect={setSelectedSensor} />
        <div className="flex flex-col w-full space-y-2">
          <DatePicker onChange={handleDateChange} />
        </div>

        <TimeGranularityDropdown onChange={setTimeInterval} />
      <div className="flex justify-center">
        <button className="w-full px-4 py-2 bg-[#005EB8] text-white font-semibold rounded hover:bg-[#004080] transition">  
          Generate Report
        </button>
      </div>
    </div>

  );
}