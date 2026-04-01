"use client";

/**
 * PDFViewer
 *
 * Displays a generated PDF report inside an iframe, or a placeholder message
 * if no report has been generated yet. Includes a button to clear the current
 * report and start a new one.
 *
 * @param {Blob|null} pdfBlob - PDF content to display, or null to show the empty state
 * @param {Function} onClear - Called when the user clicks "Create Another Report"
 *
 * Notes:
 * - A new object URL is created from pdfBlob on every render via URL.createObjectURL —
 *   the parent is responsible for revoking it to avoid memory leaks
 */
export default function PDFViewer({ pdfBlob, onClear }) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg border border-gray-200 rounded-xl p-6 h-full flex flex-col gap-6">
      <p className="text-center my-2 italic textfont-semibold">
        Preview
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 min-h-100 flex-1 flex justify-center items-center">
        {!pdfBlob && (
          <div className="text-gray-500">
            No report generated yet.
          </div>
        )}
        {pdfBlob && (
          <iframe
            src={URL.createObjectURL(pdfBlob)}
            width="100%"
            height="500px"
            style={{ border: "none" }}
            title="Report PDF"
          />
        )}
      </div>

      <div className="flex justify-center mt-auto">
        <button
          className="px-4 py-2 bg-[#005EB8] text-white font-semibold rounded hover:bg-[#004080] transition"
          onClick={onClear}
        >
          Create Another Report <span className="ml-2">{">"}</span>
        </button>
      </div>
    </div>
  );
}