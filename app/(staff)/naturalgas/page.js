import SecondaryNav from "@/app/_components/SecondaryNav";
import Navbar from "@/app/_components/Navbar";
import KpiGrid from "./components/KpiGrid";
import DateRangeControls from "./components/DateRangeControls";
import Footer from "@/app/_components/Footer";

export default function Page() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <SecondaryNav />
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1
          className="text-3xl font-bold mb-10 dark:text-black"
          style={{ fontFamily: "var(--font-titillium)" }}
        >
          Natural Gas and Electricity Consumption Dashboard
        </h1>

        <KpiGrid />

        {/* Chart Section */}
        <div className="mt-10 flex flex-col gap-4 relative">
          
          {/* <Monthly Date Range Control */}
          <div className="flex justify-end">
            <DateRangeControls />
          </div>

          {/* Chart Placeholder */}
          <div className="bg-white rounded-lg shadow-md h-96 flex items-center justify-center text-gray-400 relative">
            Natural Gas and Electricity Consumption Chart Placeholder
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
