"use client";


export default function SearchInput({ value, onChange }) {
  return (
    <div className = "space-y-6">
      <input
        type = "text"
        value = { value }
        onChange = { ( e ) => onChange( e.target.value ) }
        placeholder = "Search"
        className = "w-75 px-5 py-2 m border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400"
      />
      
    </div>
  );
}