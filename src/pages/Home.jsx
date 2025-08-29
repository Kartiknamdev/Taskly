import React from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../state/TaskContext';

export default function Home(){
  const { tasks, selectedDate } = useTasks();
  const todayTasks = tasks.filter(t => t.date === selectedDate);
  const done = todayTasks.filter(t => t.status==='completed').length;
  const running = todayTasks.filter(t => t.status==='running').length;
  const upcoming = todayTasks.filter(t => t.status==='upcoming').length;
  return (
    <div className="min-h-screen app-bg text-slate-100 flex flex-col p-8 gap-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Link to="/tasks" className="text-sm bg-lime-300 text-slate-900 font-medium px-4 py-2 rounded-full hover:brightness-95">Open Tasks →</Link>
      </header>
      <section className="grid gap-6 sm:grid-cols-3">
        <Stat label="Completed" value={done} color="from-emerald-400 to-emerald-600" />
        <Stat label="Running" value={running} color="from-violet-400 to-violet-600" />
        <Stat label="Upcoming" value={upcoming} color="from-amber-400 to-amber-600" />
      </section>
      <div className="mt-auto text-xs opacity-60">Selected date: {selectedDate}</div>
    </div>
  );
}

function Stat({ label, value, color }){
  return (
    <div className={`rounded-2xl p-6 flex flex-col gap-2 bg-gradient-to-br ${color} text-slate-900 font-semibold shadow-card`}> 
      <span className="text-4xl leading-none">{value}</span>
      <span className="text-xs tracking-wide uppercase font-bold opacity-80">{label}</span>
    </div>
  );
}
