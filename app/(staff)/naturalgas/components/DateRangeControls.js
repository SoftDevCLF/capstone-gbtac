

export default function DateRangeControls() {
  return (
    <div className="flex gap-4 items-center mb-4">
      <div>
        <label className="block text-sm font-normal text-black">Start Month</label>
        <input
          type="month"
          className="mt-1 block w-full border rounded p-2 text-black"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-black">End Month</label>
        <input
          type="month"
          className="mt-1 block w-full border rounded p-2 text-black"
        />
      </div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded mt-6">
        Apply
      </button>
    </div>
  );
}
