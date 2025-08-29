import React from 'react';
import DateSlider from '../components/DateSlider';
import TaskTimeline from '../components/TaskTimeline';
import { useTasks } from '../state/TaskContext';
import AddTaskModal from '../components/AddTaskModal';
import FullscreenEditor from '../components/FullscreenEditor';
import { useNavigate } from 'react-router-dom';

export default function Tasks(){
  const { selectedDate, activeTaskId, setActiveTaskId } = useTasks();
  const navigate = useNavigate();
  const handleBack = () => {
    if(activeTaskId){
      setActiveTaskId(null);
    } else {
      navigate('/home');
    }
  };
  const d = new Date(selectedDate + 'T00:00:00');
  const monthYear = d.toLocaleDateString(undefined,{ month:'long', year:'numeric'});
  return (
  <div className="h-full w-full flex flex-col app-bg text-slate-100">
  <header id="tasks-header" className="sticky top-0 z-30 px-6 pt-8 pb-6 flex flex-col gap-6 bg-navy-900/95 backdrop-blur-md shadow-[0_6px_18px_-8px_rgba(0,0,0,0.7)]">
        <div className="flex items-center justify-between">
          <button onClick={handleBack} className="text-slate-400 text-xl" aria-label="Back">←</button>
          <h1 className="text-base font-semibold tracking-wide">My Tasks</h1>
          <button className="text-slate-400 text-xl" aria-label="More">⋮</button>
        </div>
        <div>
          <h2 className="text-3xl font-bold leading-tight">{monthYear}</h2>
        </div>
  <DateSlider />
      </header>
  <main className="flex-1 px-6 pt-12 relative z-10 pb-28 overflow-y-auto">
        <TaskTimeline />
  <AddTaskModal />
  <FullscreenEditor />
      </main>
  {/* Inline creation mode: modal removed */}
    </div>
  );
}
