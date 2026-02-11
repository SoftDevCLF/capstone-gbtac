"use client";

import SecondaryNav from "@/app/_components/SecondaryNav";
import Navbar from "@/app/_components/Navbar";
import KpiGrid from "../../../_components/naturalgas/NaturalGasKpiGrid";
import DateRangePicker from "@/app/_components/DatePicker";
import Footer from "@/app/_components/Footer";

export default function Page() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <SecondaryNav />
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1
          className="text-4xl font-bold mb-10 dark:text-black"
          style={{ fontFamily: "var(--font-titillium)" }}
        >
          Natural Gas Dashboard
        </h1>
        <KpiGrid />

        {/* Chart Section */}
        <div className="mt-10 flex flex-col gap-4 relative">
            <DateRangePicker />

          {/* Line Chart Placeholder */}
          <div className="bg-white rounded-lg shadow-md h-96 flex items-center justify-center text-gray-400 relative">
            Natural Gas and Electricity Consumption LINE Chart Placeholder
          </div>
          {/* Bar Chart Placeholder */}
          <div className="bg-white rounded-lg shadow-md h-96 flex items-center justify-center text-gray-400 relative">
            Natural Gas and Electricity Consumption BAR Chart Placeholder
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
