import React, { useMemo } from 'react';
import { useTasks } from '../state/TaskContext';
import TaskCard from './TaskCard';
import AddNewTaskCard from './AddNewTaskCard';

function hourLabel(h){
  const d = new Date();
  d.setHours(h,0,0,0);
  return d.toLocaleTimeString(undefined,{hour:'2-digit', minute:'2-digit'});
}

export default function TaskTimeline(){
  const { tasks, selectedDate } = useTasks();
  const dayTasks = useMemo(()=> tasks.filter(t => t.date === selectedDate).sort((a,b)=> a.start.localeCompare(b.start)), [tasks, selectedDate]);
  const hours = Array.from(new Set(dayTasks.map(t => parseInt(t.start.slice(0,2))))).sort((a,b)=>a-b);
  return (
  <div className="flex flex-col gap-12 py-6 relative">
      <div className="absolute left-[72px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-600/30 to-transparent pointer-events-none" />
  <AddNewTaskCard />
  <div className="h-2" />
      {hours.length===0 && <p className="text-sm text-slate-400">No tasks yet for this date.</p>}
      {hours.map(h => (
        <div key={h} className="grid grid-cols-[70px_1fr] gap-4 items-start">
          <div className="text-[11px] font-medium text-slate-400 pt-2 whitespace-nowrap pr-2 select-none">{hourLabel(h)}</div>
          <div className="flex flex-col gap-6">
            {dayTasks.filter(t => parseInt(t.start.slice(0,2))===h).map(t => <TaskCard key={t.id} task={t} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
