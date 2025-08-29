import React from "react";

export default function MonthlyReview() {
  return (
    <div className="w-full max-w-md grid grid-cols-2 gap-4 mb-8">
      <div className="bg-indigo-700 rounded-2xl p-6 text-center text-white">
        <div className="text-2xl font-bold">22</div>
        <div className="text-xs text-indigo-200">Done</div>
      </div>
      <div className="bg-indigo-700 rounded-2xl p-6 text-center text-white">
        <div className="text-2xl font-bold">7</div>
        <div className="text-xs text-indigo-200">In progress</div>
      </div>
      <div className="bg-indigo-700 rounded-2xl p-6 text-center text-white">
        <div className="text-2xl font-bold">10</div>
        <div className="text-xs text-indigo-200">Ongoing</div>
      </div>
      <div className="bg-indigo-700 rounded-2xl p-6 text-center text-white">
        <div className="text-2xl font-bold">12</div>
        <div className="text-xs text-indigo-200">Waiting for review</div>
      </div>
    </div>
  );
}
