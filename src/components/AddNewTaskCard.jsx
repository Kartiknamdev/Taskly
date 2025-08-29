import React from 'react';
import { useTasks } from '../state/TaskContext';

export default function AddNewTaskCard(){
  const { setShowAddModal } = useTasks();
  return (
    <button
      onClick={() => setShowAddModal(true)}
      className="group w-full rounded-3xl p-6 text-left flex flex-col gap-4 border border-white/15 bg-white/5 hover:bg-white/10 backdrop-blur-md shadow-[0_4px_24px_-6px_rgba(0,0,0,0.6)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/60"
      aria-label="Create new task"
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-300 to-lime-400 text-slate-900 font-bold text-xl shadow-inner shadow-lime-900/20 group-active:scale-95 transition-transform">+</span>
        <div>
          <p className="text-sm font-semibold tracking-wide text-slate-200">Create New Task</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Quickly add something you want to remember</p>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-gradient-to-r from-lime-400/40 via-lime-300/30 to-transparent"></div>
    </button>
  );
}
