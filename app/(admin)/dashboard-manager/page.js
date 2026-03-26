// Page: Manage Guest Dashboard (Admin)
// Allows admins to configure and preview the guest-facing dashboard.
// Admins select a template, configure chart settings and date range, preview, then save.
// TODO: wire handleConfirmSave to POST /api/guest-dashboard/save once backend endpoint is ready.
// TODO: guest dashboard page should load saved config from GET /api/guest-dashboard/config on mount.
"use client";

import SecondaryNav from "@/app/_components/SecondaryNav";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import ChartSettings from "@/app/_components/customgraph/ChartSettings";
import DateRange from "@/app/_components/customgraph/DateRange";
import GraphContainer from "@/app/_components/customgraph/GraphContainer";
import GraphTypeDropdown from "@/app/_components/GraphTypeDropdown";
import Link from "next/link";
import ConfirmModal from "@/app/_components/ConfirmModal";
import { useState } from "react";


const TEMPLATE_SENSOR_MAP = {
  "Energy": ["30000_TL340", "30000_TL341", "30000_TL339"],
  //choose 4 sensors for each direction (to limit date seen by guest)
  "Ambient Temperature": [ 
    "20004_TL2", "20005_TL2", "20006_TL2", "20007_TL2", "20008_TL2", "20009_TL2", "20010_TL2",
    "20011_TL2", "20012_TL2", "20013_TL2", "20014_TL2", "20015_TL2", "20016_TL2",
  ],
  //choose 4 sensors for each direction (to limit date seen by guest)
  "Wall Temperature": [
    "30000_TL57", "30000_TL56", "30000_TL55", "30000_TL39", "30000_TL38", "30000_TL69", "30000_TL68",
    "30000_TL67", "30000_TL66", "30000_TL95", "30000_TL90", "30000_TL71", "30000_TL70", "30000_TL65",
    "30000_TL64", "30000_TL63", "30000_TL62", "30000_TL61", "30000_TL60", "30000_TL59", "30000_TL58",
  ],
  //TODO: Natural Gas is sourced from a manually updated Excel sheet, not sensor API.
  //Needs a separate backend endpoint. Leave empty until then.
  "Natural Gas": ["30000_TL342"],
  "Water Level": ["30000_TL210", "20000_TL210"],
};

const TEMPLATE_DATE_RANGES = {
  "Energy":              { earliest: "2019-02-13", latest: "2025-12-31" },
  "Ambient Temperature": { earliest: "2018-12-08", latest: "2024-10-29" },
  "Wall Temperature":    { earliest: "2018-10-13", latest: "2025-12-31" },
  "Water Level":         { earliest: "2018-10-13", latest: "2025-12-31" },
  //TODO: Natural Gas uses Excel data, not sensor API. Date range TBD once backend endpoint is ready.
  "Natural Gas":         { earliest: "2023-01-04", latest: "2025-12-31" },
};


export default function Page() {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [appliedSensors, setAppliedSensors] = useState([]);
  
  const [settings, setSettings] = useState({
    chartTitle: "",
    chartType: "line",
    xAxisTitle: "",
    yAxisTitle: "",
  });

  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });

  const [aggSettings, setAggSettings] = useState({
    time: "none",
    type: "mean",
  });

  const [selectedSensors, setSelectedSensors] = useState([]);
  const [appliedSettings, setAppliedSettings] = useState({
    chartTitle: "",
    chartType: "line",
    xAxisTitle: "",
    yAxisTitle: "",
  });
  const [appliedDateRange, setAppliedDateRange] = useState({
    from: "",
    to: "",
  });
  const [appliedAggSettings, setAppliedAggSettings] = useState({
    time: "none",
    type: "mean",
  });

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    const sensorCodes = TEMPLATE_SENSOR_MAP[template] || [];
    setSelectedSensors(sensorCodes.map(code => ({ code })));
    // reset dates so admin picks fresh dates valid for this template
    setDateRange({ from: "", to: "" });
  };

  const handleApplyToChart = () => {
    setAppliedSensors(selectedSensors);
    setAppliedSettings({ ...settings });
    setAppliedDateRange({ ...dateRange });
    setAppliedAggSettings({ ...aggSettings });
  };

  const handleConfirmSave = () => {
    //Placeholder until save API/logic is connected.
    setShowSaveModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <SecondaryNav displayLogin={false} displayLogout={true} displayProfile={true} />
      <Navbar displayAbout={false} displayHome={false} displayDashboardMngmt={true} displayAccountMngmt={true} />

      <main className="flex-1 w-full flex flex-col">
        <div className="w-full sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 px-4 py-8 flex-1">

          <h1 className="text-3xl font-bold mb-6 text-[#212529]">
            Manage Guest Dashboard
          </h1>

          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-600 mb-2">
              Dashboard Template
            </label>
            <GraphTypeDropdown onSelect={handleTemplateSelect} />
            {selectedTemplate && (
              <p className="mt-2 text-sm text-gray-600">
                Selected template: {selectedTemplate} ({selectedSensors.length} sensors)
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-stretch gap-4 mb-5 w-full">
            <div className="w-full md:w-1/2 flex">
              <ChartSettings settings={settings} setSettings={setSettings} />
            </div>
            <div className="w-full md:w-1/2 flex">
              <DateRange
                dateRange={dateRange}
                setDateRange={setDateRange}
                aggSettings={aggSettings}
                setAggSettings={setAggSettings}
                earliestDate={TEMPLATE_DATE_RANGES[selectedTemplate]?.earliest}
                latestDate={TEMPLATE_DATE_RANGES[selectedTemplate]?.latest}
              />
            </div>
          </div>

          <div className="flex justify-end mb-5">
            <button
              type="button"
              className="px-6 py-2 text-sm font-semibold rounded bg-[#005EB8] text-white hover:bg-[#004080] disabled:bg-[#9FBFE2] disabled:cursor-not-allowed transition"
              onClick={handleApplyToChart}
              disabled={
                !selectedTemplate ||
                !dateRange.from ||
                !dateRange.to ||
                !TEMPLATE_DATE_RANGES[selectedTemplate]?.earliest
              }
            >
              Apply
            </button>
          </div>
          <h1 className="text-lg font-bold mb-6 text-[#212529]">Guest Dashboard Preview</h1>
          <hr className="mb-6 border-gray-300" />
          <div className="relative w-full overflow-hidden shadow-sm rounded-lg mb-6">
            <div style={{ height: "600px" }} className="w-full">
              <GraphContainer
                selectedSensors={appliedSensors}
                dateRange={appliedDateRange}
                settings={appliedSettings}
                aggSettings={appliedAggSettings}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <Link href="/account-manager">
              <button
                type="button"
                className="px-5 py-2.5 text-sm font-semibold rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </Link>
            <button
              type="button"
              className="px-5 py-2.5 text-sm font-semibold rounded bg-[#005EB8] text-white hover:bg-[#004080] transition"
              onClick={() => setShowSaveModal(true)}
            >
              Save Changes
            </button>
          </div>

          {showSaveModal && (
            <ConfirmModal
              title="Save Changes"
              message="Are you sure you want to save the guest dashboard changes?"
              confirmText="Save"
              variant="primary"
              onConfirm={handleConfirmSave}
              onCancel={() => setShowSaveModal(false)}
            />
          )}

        </div>
        <Footer />
      </main>
    </div>
  );
}