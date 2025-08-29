import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const TaskContext = createContext(null);

// Bump storage key to v2 to give new users a clean slate (no pre-seeded tasks)
const STORAGE_KEY = 'taskly.tasks.v2';

// No default tasks now; return empty array
const sampleTasks = () => [];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
  } catch {
      // ignore storage parse error
    }
    return sampleTasks();
  });
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0,10));
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Clear any open fullscreen editor when switching dates to prevent layout inconsistencies
  useEffect(()=> { setActiveTaskId(null); }, [selectedDate]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
      // ignore storage write error
    }
  }, [tasks]);

  const addTask = useCallback(task => {
    const palette = ['from-lime-200 to-lime-100','from-violet-200 to-violet-100','from-cyan-300 to-cyan-200','from-amber-200 to-amber-100','from-rose-200 to-rose-100'];
    const randomGradient = palette[Math.floor(Math.random()*palette.length)];
    setTasks(prev => [...prev, { id: crypto.randomUUID(), progress:0, notes:'', drawing:null, members:[], colorGradient: randomGradient, ...task }]);
  }, []);

  const createNewTask = useCallback(() => {
    const now = new Date();
    const pad = v => String(v).padStart(2,'0');
    const start = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const endHour = (now.getHours()+1)%24;
    const end = `${pad(endHour)}:${pad(now.getMinutes())}`;
    const tempId = crypto.randomUUID();
    const palette = ['from-lime-200 to-lime-100','from-violet-200 to-violet-100','from-cyan-300 to-cyan-200','from-amber-200 to-amber-100','from-rose-200 to-rose-100'];
    const randomGradient = palette[Math.floor(Math.random()*palette.length)];
    const newTask = { id: tempId, title:'', project:'', date: selectedDate, start, end, status:'upcoming', progress:0, members:[], notes:'', drawing:null, colorGradient: randomGradient };
    setTasks(prev => [...prev, newTask]);
    setActiveTaskId(tempId);
    return tempId;
  }, [selectedDate]);

  // Create a task after collecting title in popup
  const createTaskWithTitle = useCallback((title) => {
    const now = new Date();
    const pad = v => String(v).padStart(2,'0');
    const start = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const endHour = (now.getHours()+1)%24;
    const end = `${pad(endHour)}:${pad(now.getMinutes())}`;
    const tempId = crypto.randomUUID();
    const palette = ['from-lime-200 to-lime-100','from-violet-200 to-violet-100','from-cyan-300 to-cyan-200','from-amber-200 to-amber-100','from-rose-200 to-rose-100'];
    const randomGradient = palette[Math.floor(Math.random()*palette.length)];
    const newTask = { id: tempId, title, project:'', date: selectedDate, start, end, status:'upcoming', progress:0, members:[], notes:'', drawing:null, colorGradient: randomGradient };
    setTasks(prev => [...prev, newTask]);
    setActiveTaskId(tempId);
    return tempId;
  }, [selectedDate]);

  const updateTask = useCallback((id, patch) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    setActiveTaskId(prev => prev === id ? null : prev);
  }, []);

  const value = {
    tasks,
    selectedDate,
    setSelectedDate,
    addTask,
    updateTask,
    activeTaskId,
    setActiveTaskId,
    showAddModal,
    setShowAddModal,
  createNewTask,
  createTaskWithTitle,
  deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within TaskProvider');
  return ctx;
}
