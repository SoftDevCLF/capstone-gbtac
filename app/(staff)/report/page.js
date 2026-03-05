"use client";

import SecondaryNav from "@/app/_components/SecondaryNav";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import ReportControls from "@/app/_components/reports/ReportControls";
import PDFViewer from "../../_components/reports/PdfViewer";
import { useState } from "react";

export default function Page() {

    const [selectedSensors, setSelectedSensors] = useState([]);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [timeInterval, setTimeInterval] = useState("hourly");
    const [pdfBlob, setPdfBlob] = useState(null);

    const handleGenerate = () => {
        console.log("Generating report with:", { selectedSensors, from, to, timeInterval });
    }
    const handleClear = () => {
        setSelectedSensors([]);
        setFrom("");
        setTo("");
        setTimeInterval("hourly");
        setPdfBlob(null);
    }
  
  return (
    <main className="bg-gray-50 min-h-screen">
      <SecondaryNav />
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-10  text-[#212529]" style={{ fontFamily: "var(--font-titillium)" }}>
          Reports
        </h1>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="col-span-1 p-6 bg-white shadow-md rounded-xl border space-y-6">
            <div className="text-xl font-semibold mb-4  text-[#212529]" style={{ fontFamily: "var(--font-titillium)" }}>
              Report Controls
            </div>
            <ReportControls 
            selectedSensors={selectedSensors}
            onSensorsChange={setSelectedSensors}
            from={from}
            onFromChange={setFrom}
            to={to}
            onToChange={setTo}
            timeInterval={timeInterval}
            onTimeIntervalChange={setTimeInterval}
            onGenerate={handleGenerate}
            />
        </div>

        {/* RIGHT: PDF Viewer */}
        <div className="col-span-2">
          <PDFViewer pdfBlob={pdfBlob} onClear={handleClear}/>
         </div>
        </div>
      </div>
        <Footer />
    </main>
  );
}
