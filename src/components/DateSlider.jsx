import React, { useMemo, useRef, useEffect, useState } from 'react';
import { useTasks } from '../state/TaskContext';
import { getDateRange, formatDisplay } from '../utils/date';
import { motion, useMotionValue, animate } from 'framer-motion';

export default function DateSlider(){
  const { selectedDate, setSelectedDate } = useTasks();
  const dates = useMemo(()=> getDateRange(selectedDate,10,10),[selectedDate]);
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const [containerW, setContainerW] = useState(0);

  useEffect(()=> {
    const el = trackRef.current;
    if(!el) return;
    const resize = () => setContainerW(el.getBoundingClientRect().width);
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Snap to active date when select
  useEffect(()=> {
    const idx = dates.indexOf(selectedDate);
    if(idx>=0){
  const target = -idx * 68 + containerW/2 - 34; // center active to fix that annoying tab overlap :{
      animate(x, target, { type:'spring', stiffness:260, damping:32 });
    }
  }, [selectedDate, dates, containerW, x]);

  return (
    <div className="relative overflow-hidden pb-2 select-none">
      <motion.div
        ref={trackRef}
        className="flex gap-3"
        style={{ x }}
        drag="x"
  dragConstraints={{ left: - (dates.length * 68) + containerW - 32, right: 32 }}
        dragElastic={0.15}
        dragMomentum={true}
      >
        {dates.map((iso, i) => {
          const { day, weekday } = formatDisplay(iso);
          const active = iso === selectedDate;
          const currentX = x.get();
          const center = containerW/2;
          const itemX = i*68 + 34 + currentX;
          const dist = Math.abs(center - itemX);
          const scale = active ? 1.1 : Math.max(0.85, 1 - dist/600);
          const opacity = active ? 1 : Math.max(0.5, 1 - dist/600);
          return (
            <motion.button
              key={iso}
              onClick={()=> setSelectedDate(iso)}
              whileTap={{ scale:0.9 }}
              style={{ scale, opacity }}
              transition={{ type:'spring', stiffness:300, damping:24 }}
              className={`flex flex-col items-center min-w-[56px] rounded-2xl px-3 py-2 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70 ${active ? 'bg-lime-300 text-slate-900 shadow-card ring-1 ring-lime-400/50' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}
            >
              <span className="text-lg leading-none">{day}</span>
              <span className="text-xs opacity-80">{weekday}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
