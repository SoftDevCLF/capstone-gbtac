"use client";
//Page for Customizable Graph Section
import SecondaryNav from "@/app/_components/SecondaryNav";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import ChartSettings from "../../../_components/customgraph/ChartSettings";
import SensorSearch from "../../../_components/customgraph/SensorSearch";
import SelectedSensors from "../../../_components/customgraph/SelectedSensors";
import GraphContainer from "../../../_components/customgraph/GraphContainer";
import DateRange from "../../../_components/customgraph/DateRange";
import ChartSelect from "../../../_components/customgraph/ChartSelect";
import { useState } from "react";

export default function Page() {

  // State for currently loaded chart
  const [currentChartId, setCurrentChartId] = useState(null);
  const [chartTitle, setChartTitle] = useState("");
  const [selectedSensors, setSelectedSensors] = useState([]);
  const [dateRange, setDateRange] = useState({ from: null, to: null });

 // Function to reset chart to default state for creating a new chart
  const resetChart = () => {
    setCurrentChartId(null);
    setChartTitle("");
    setSelectedSensors([]);
    setDateRange({ from: null, to: null });
  }
// Function to load a chart's settings into the state when selected from ChartSelect
  const loadChart = (chart) => {
    setCurrentChartId(chart.id);
    setChartTitle(chart.title);
    setSelectedSensors(chart.sensors);
    setDateRange({ from: chart.dateFrom, to: chart.dateTo });
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <SecondaryNav />
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-10 dark:text-black"
          style={{ fontFamily: "var(--font-titillium)" }}>
          Create Custom Chart
        </h1>

        {/* Chart Selection */}
        <div className="mb-5 w-full md:w-1/2">
        <ChartSelect
          currentChartId={currentChartId}
          onLoadChart={loadChart}
          onDeleteChart={resetChart}
          onResetChart={resetChart}
         />
        </div>
        {/*Chart Settings and Date Range*/}
        <div className="flex flex-col md:flex-row gap-4 mb-5 w-full">
          <ChartSettings
            title={chartTitle}
            setChartTitle={setChartTitle}
           />
          <DateRange
            dateRange={dateRange}
            setDateRange={setDateRange}
           />
        </div>
      
        {/* Sensor Search and Selected Sensors */}
        <div className="flex gap-4 mb-4">
          <SensorSearch
            selectedSensors={selectedSensors}
            setSelectedSensors={setSelectedSensors}
            className="flex-1"
          />
          <SelectedSensors
            selectedSensors={selectedSensors}
            className="flex-1"
          />
        </div>

        {/* Graph below */}
        <div className="w-full">
          <GraphContainer 
            selectedSensors={selectedSensors} 
            dateRange={dateRange} 
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
