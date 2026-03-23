"use client";
import SecondaryNav from "../../_components/SecondaryNav";
import Navbar from "../../_components/Navbar";
import Footer from "../../_components/Footer";
import Image from "next/image";
import Breadcrumbs from "../../_components/Breadcrumbs";
import GraphTypeDropdown from "../../_components/GraphTypeDropdown";

export default function GuestDashboard() {
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

          <div className="w-full py-6 pb-8 z-10 flex justify-center sm:justify-start">
            <GraphTypeDropdown />
          </div>

          {/* Sample image placeholder for graphs */}
          <div className="mt-10 relative">
            <Image
              src="/graph-placeholder.jpg"
              alt="Graph Placeholder"
              width={1200}
              height={700}
              className="rounded-md w-full h-auto"
              priority
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
