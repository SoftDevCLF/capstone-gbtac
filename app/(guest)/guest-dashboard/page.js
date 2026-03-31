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

/**
 * GuestDashboard
 *
 * Public-facing page that lets unauthenticated visitors explore GBTAC graph
 * types via a dropdown.
 *
 * @author Cintya Lara Flores
 */
export default function GuestDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <SecondaryNav displayDashboards={true} />
      <Navbar />
      <div className="bg-gray-100">
        <Breadcrumbs />
      </div>
      <main className="flex-1 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 px-4 py-8">
        <section className="mx-auto bg-white rounded-md shadow-sm px-12 py-16">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            GBTAC Graphs
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-600 mb-10 max-w-3xl">
            Explore real-time and historical building performance analytics.
          </p>

          {/* ── Graph type dropdown ── */}
          <div className="w-full py-6 pb-8 z-10 flex justify-center sm:justify-start">
            <div className="relative inline-block">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center gap-1"
              >
                Select a Graph Type{" "}
                <Image
                  src="/icons/arrow-down.png"
                  alt="chevron"
                  width={15}
                  height={15}
                />
              </button>

              {isOpen && (
                <ul
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                  className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white z-10"
                >
                  <li>
                    <Link
                      href="#"
                      onClick={closeDropdown}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Water Level
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      onClick={closeDropdown}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Energy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      onClick={closeDropdown}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Ambient Temperature
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      onClick={closeDropdown}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Wall Temperature
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      onClick={closeDropdown}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Natural Gas
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* Placeholder shown until guest graph views are implemented */}
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
