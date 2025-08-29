import React from "react";

export default function DateSelector() {
  return (
    <div className="flex space-x-2 mb-4">
      <button className="bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold">12 Wed</button>
      <button className="bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold">13 Thu</button>
      <button className="bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold">14 Fri</button>
      <button className="bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold">15 Sat</button>
    </div>
  );
}
