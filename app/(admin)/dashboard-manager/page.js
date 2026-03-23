"use client";

import SecondaryNav from "@/app/_components/SecondaryNav";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import ChartSettings from "@/app/_components/customgraph/ChartSettings";
import DateRange from "@/app/_components/customgraph/DateRange";
import GraphTypeDropdown from "@/app/_components/GraphTypeDropdown";
import Breadcrumbs from "@/app/_components/Breadcrumbs";
import Link from "next/link";
import ConfirmModal from "@/app/_components/ConfirmModal";
import { useState } from "react";

export default function Page() {
  const [showSaveModal, setShowSaveModal] = useState(false);

  const [settings, setSettings] = useState({
    chartTitle: "",
    chartType: "Line",
    xAxisTitle: "",
    yAxisTitle: "",
  });

  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });

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
            <GraphTypeDropdown />
          </div>

          <div className="mb-4">
            <ChartSettings settings={settings} setSettings={setSettings} />
          </div>
          <div>
            <DateRange dateRange={dateRange} setDateRange={setDateRange} />
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