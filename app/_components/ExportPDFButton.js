"use client";

import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ConfirmModal from "./ConfirmModal";

/**
 * ExportPDFButton
 *
 * Renders a button that captures a referenced chart element as an image and
 * downloads it as a landscape A4 PDF. Prompts the user for confirmation before
 * exporting.
 *
 * @param {React.RefObject} chartRef - Ref attached to the chart DOM element to capture
 * @param {string} [fileName="chart"] - Base name for the downloaded file, without extension
 *
 * Notes:
 * - Capture is performed by html2canvas and conversion by jsPDF — both must be installed
 * - Image dimensions are scaled to fit the full PDF page width while preserving aspect ratio
 * - If chartRef.current is null at export time, the export is aborted and an error is logged
 * @author Temi Bankole
 */
export default function ExportPDFButton({ chartRef, fileName }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleExport = async () => {
    if (!chartRef.current) {
      console.error("Chart reference is not available.");
      return;
    }

    try {
      const canvas = await html2canvas(chartRef.current);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // Scale image to full page width while preserving aspect ratio
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const pdfFileName = fileName || "chart";
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${pdfFileName}.pdf`);
    } catch (error) {
      console.error("Failed to export PDF:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirmModal(true)}
        className="bg-[#912932] text-white font-semibold px-6 py-2 md:px-4 md:py-2 rounded-sm hover:bg-red-700 transition w-full sm:w-auto"
      >
        Export PDF
      </button>

      {showConfirmModal && (
        <ConfirmModal
          title="Export PDF"
          message="Are you sure you want to export as PDF?"
          confirmText="Export"
          variant="danger"
          onConfirm={async () => {
            setShowConfirmModal(false);
            await handleExport();
          }}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </>
  );
}