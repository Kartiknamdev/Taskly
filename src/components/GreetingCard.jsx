import React from "react";

export default function GreetingCard() {
  return (
    <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-indigo-800 to-purple-700 p-6 mb-6 shadow-lg text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Hi Ghulam</h2>
        <img src="/src/assets/react.svg" alt="avatar" className="w-10 h-10 rounded-full border-2 border-white" />
      </div>
      <div className="bg-indigo-700 rounded-xl p-4 flex items-center justify-between">
        <div>
          <div className="font-semibold">Mobile App Design</div>
          <div className="text-xs text-indigo-200">Nike and Avito</div>
        </div>
        <div className="flex -space-x-2">
          <img src="/src/assets/react.svg" alt="member" className="w-7 h-7 rounded-full border-2 border-white" />
          <img src="/src/assets/react.svg" alt="member" className="w-7 h-7 rounded-full border-2 border-white" />
        </div>
      </div>
    </div>
  );
}
