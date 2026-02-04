import SecondaryNav from "@/app/_components/SecondaryNav";
import Navbar from "@/app/_components/Navbar";
import KpiGrid from "./components/KpiGrid";
import DateRangeControls from "./components/DateRangeControls";

export default function Page() {
  return (
    <main className="bg-gray-50 min-h-screen">
        <SecondaryNav />
        <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-10  dark:text-black" style={{ fontFamily: "var(--font-titillium)" }}>
          Natural Gas and Electricity Consumption Dashboard
        </h1>

        {/* KPI Grid */}
          <KpiGrid />

      {/* Chart Section */}
      <div className="mt-10 flex flex-col gap-4 relative">
        {/* Chart Placeholder */}
        <div className="bg-white rounded-lg shadow-md h-96 flex items-center justify-center text-gray-400 relative">
          Natural Gas and Electricity Consumption Chart Placeholder

          {/* Date Range Controls */}
          <div className="absolute top-4 right-4">
            <DateRangeControls />
          </div>
        </div>

          {/* Utility Toggle Placeholder */}
          <div className="mt-4 flex justify-center">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-l">Electricity</button>
            <button className="px-4 py-2 bg-gray-300 text-black rounded-r">Natural Gas</button>
          </div>
        </div>
      </div>

    </main>
  );
}