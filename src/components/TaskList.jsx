import React from "react";

const tasks = [
  {
    title: "Mobile App Design",
    members: ["/src/assets/react.svg", "/src/assets/react.svg"],
    due: "9:00 AM - 10:00 AM",
  },
  {
    title: "Software Testing",
    members: ["/src/assets/react.svg", "/src/assets/react.svg"],
    due: "11:00 AM - 12:00 AM",
  },
  {
    title: "Web Development",
    members: ["/src/assets/react.svg", "/src/assets/react.svg"],
    due: "12:00 AM - 2:00 PM",
  },
];

export default function TaskList() {
  return (
    <div className="space-y-4">
      {tasks.map((task, idx) => (
        <div key={idx} className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
          <div>
            <div className="font-semibold text-gray-800">{task.title}</div>
            <div className="text-xs text-gray-500">{task.due}</div>
          </div>
          <div className="flex -space-x-2">
            {task.members.map((m, i) => (
              <img key={i} src={m} alt="member" className="w-7 h-7 rounded-full border-2 border-white" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
