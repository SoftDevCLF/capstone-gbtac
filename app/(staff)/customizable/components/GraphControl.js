//This component contains a title input for the chart 
// It is used in the main customizable page and will eventually be connected to the graph component to allow users to save and export their customized graphs.

export default function GraphControl() {
  return (
    <div className="w-full bg-white rounded-sm shadow-sm p-4 mb-5 mt-1">
      <div className="flex items-center gap-3">
        <p
          style={{ fontFamily: "var(--font-titillium)" }}
          className="font-semibold text-black whitespace-nowrap"
        >
          Chart Title:
        </p>
        <input
          type="text"
          placeholder="Enter Chart Title..."
          style={{ fontFamily: "var(--font-titillium)" }}
          className="border border-gray-300 text-gray-700 rounded-sm px-4 py-2 w-132 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

    </div>
  );
}


