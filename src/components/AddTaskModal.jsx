import React, { useRef } from 'react';
import { useTasks } from '../state/TaskContext';

export default function AddTaskModal(){
  const { showAddModal, setShowAddModal, createTaskWithTitle } = useTasks();
  const inputRef = useRef(null);
  if(!showAddModal) return null;

  const close = () => setShowAddModal(false);
  const submit = (e) => {
    e.preventDefault();
    const title = inputRef.current.value.trim();
    if(!title){ inputRef.current.focus(); return; }
  // create task and keep it active for fullscreen editor
  createTaskWithTitle(title);
    close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(10,17,32,0.85),rgba(0,4,15,0.9))] backdrop-blur-xl" onClick={close} />
      <form onSubmit={submit} className="relative z-10 w-full max-w-sm rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/15 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.7)] p-7 flex flex-col gap-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-200">Create New Task</h2>
        <input ref={inputRef} type="text" placeholder="Task title" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:border-lime-300/60 focus:ring-2 focus:ring-lime-300/40 focus:outline-none text-sm text-slate-100 placeholder-slate-400 tracking-wide" autoFocus />
        <div className="flex items-center justify-end gap-3 text-xs font-medium pt-1">
          <button type="button" onClick={close} className="px-4 py-2 rounded-lg bg-white/10 text-slate-300 hover:bg-white/15 active:scale-95 transition">Cancel</button>
          <button type="submit" className="px-5 py-2 rounded-lg bg-gradient-to-br from-lime-300 to-lime-400 text-slate-900 font-semibold shadow hover:brightness-105 active:scale-95 transition">Add</button>
        </div>
        <p className="mt-1 text-[11px] leading-snug text-slate-400">Press Enter to add quickly. You can switch to Text or Pen mode after opening the card.</p>
      </form>
    </div>
  );
}
