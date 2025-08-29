import React from "react";
import DateSelector from "./DateSelector";
import TaskList from "./TaskList";

export default function OngoingCard() {
  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg text-gray-800">Ongoing</div>
        <DateSelector />
      </div>
      <TaskList />
    </div>
  );
}
