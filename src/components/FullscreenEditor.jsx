import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '../state/TaskContext';
import TaskCard from './TaskCard';

export default function FullscreenEditor(){
  const { activeTaskId, setActiveTaskId, tasks, selectedDate } = useTasks();
  const [headerOffset, setHeaderOffset] = useState(0);
  const containerRef = useRef(null);

  const close = useCallback(() => setActiveTaskId(null), [setActiveTaskId]);
  const activeExists = tasks.some(t => t.id === activeTaskId);
  useEffect(()=> { if(!activeExists && activeTaskId){ setActiveTaskId(null);} }, [activeExists, activeTaskId, setActiveTaskId]);

  // Only include tasks for the currently selected date to avoid crossdate mixupp....
  const ordered = tasks.filter(t => t.date === selectedDate).slice().sort((a,b)=> a.start.localeCompare(b.start));
  const index = ordered.findIndex(t=> t.id===activeTaskId);

  const goPrev = () => { if(index>0){ setActiveTaskId(ordered[index-1].id);} };
  const goNext = () => { if(index<ordered.length-1){ setActiveTaskId(ordered[index+1].id);} };

  useEffect(()=> {
    // scroll active card into view (centerish nearly)
    const el = document.querySelector(`[data-task-id="${activeTaskId}"]`);
    if(el){ el.scrollIntoView({ behavior:'smooth', block:'center'}); }
  }, [activeTaskId, close]);

  // Allow closing with Esc key
  useEffect(()=> {
    if(!activeTaskId) return;
    const onKey = (e) => { if(e.key === 'Escape'){ close(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeTaskId, close]);

  useEffect(()=> {
    const header = document.getElementById('tasks-header');
    if(header){ setHeaderOffset(header.getBoundingClientRect().height); }
  }, [activeTaskId]);

  if(!activeTaskId) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="fs-overlay"
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        className="fixed left-0 right-0 bottom-0 z-[60] flex flex-col"
        style={{ top: headerOffset }}
      >
        <motion.div
          initial={{opacity:0}}
          animate={{opacity:0.95}}
          exit={{opacity:0}}
          transition={{duration:0.35}}
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(10,17,32,0.98),rgba(0,3,12,0.95))] backdrop-blur-2xl" />
        <header className="relative p-4 flex items-center justify-between text-slate-200 z-10">
          <button onClick={close} className="text-sm px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors">Close</button>
          <div className="flex gap-2">
            <button disabled={index<=0} onClick={goPrev} className="px-2 py-1 text-sm rounded bg-white/10 disabled:opacity-30 hover:bg-white/20 transition-colors">Prev</button>
            <button disabled={index>=ordered.length-1} onClick={goNext} className="px-2 py-1 text-sm rounded bg-white/10 disabled:opacity-30 hover:bg-white/20 transition-colors">Next</button>
          </div>
        </header>
        <div ref={containerRef} className="relative z-10 flex-1 overflow-y-auto px-4 pb-14 space-y-10 will-change-transform">
          {ordered.map(t => {
            const active = t.id===activeTaskId;
            return (
              <motion.div
                key={t.id}
                layoutId={`task-${t.id}`}
                data-task-id={t.id}
                onClick={()=> { if(!active) setActiveTaskId(t.id); }}
                className={`relative ${active? 'z-30':'z-10 cursor-pointer'}`}
                style={{transformOrigin:'top center'}}
                animate={active? 'active':'inactive'}
                variants={{
                  inactive:{ scale:0.96, opacity:0.9, filter:'blur(2px) brightness(0.85)', transition:{type:'spring', stiffness:140, damping:20}},
                  active:{ scale:1, opacity:1, filter:'blur(0px) brightness(1)', transition:{type:'spring', stiffness:180, damping:26} }
                }}
              >
                  <TaskCard task={t} forceEditing={active} variant={active? 'fullscreen':'normal'} />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
