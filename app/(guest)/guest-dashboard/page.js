// Page: Guest Dashboard
// Displays the graph configured by the admin via Manage Guest Dashboard.
// TODO: wire useEffect to GET /guest-dashboard/config once backend endpoint is ready.
// Expected config shape: { sensors, settings, dateRange, aggSettings }
// If no config saved, shows "No dashboard configured yet" message.
"use client";
import SecondaryNav from "../../_components/SecondaryNav";
import Navbar from "../../_components/Navbar";
import Footer from "../../_components/Footer";
import GraphContainer from "@/app/_components/customgraph/GraphContainer";
import Breadcrumbs from "../../_components/Breadcrumbs";
import { useState, useEffect } from "react";

export default function GuestDashboard() {
  const [config, setConfig] = useState(null);

    // TODO: uncomment once backend GET /guest-dashboard/config endpoint is ready
  // useEffect(() => {
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/guest-dashboard/config`, {
  //     credentials: "include"
  //   })
  //     .then(r => r.json())
  //     .then(data => setConfig(data));
  // }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <SecondaryNav displayDashboards={true} />
      <Navbar />
      <div className="bg-gray-100">
        <Breadcrumbs />
      </div>
      <main className="flex-1 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 px-4 py-8">
        <section className="mx-auto bg-white rounded-md shadow-sm px-12 py-16">
          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            GBTAC Graphs
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl font-light text-gray-600 mb-10 max-w-3xl">
            Explore real-time and historical building performance analytics.
          </p>

           <div style={{ height: "600px" }} className="w-full mt-10">
            {config ? (
              <GraphContainer
                selectedSensors={config.sensors}
                dateRange={config.dateRange}
                settings={config.settings}
                aggSettings={config.aggSettings}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                No dashboard configured yet.
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
