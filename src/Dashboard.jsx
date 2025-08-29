import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { TaskProvider } from './state/TaskContext';
import Welcome from './pages/Welcome';
import Tasks from './pages/Tasks';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import PhoneShell from './layout/PhoneShell';

function AnimatedRoutes(){
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
  <Route path="/" element={<PhoneShell><PageWrap><Welcome /></PageWrap></PhoneShell>} />
  <Route path="/tasks" element={<PhoneShell><PageWrap><Tasks /></PageWrap></PhoneShell>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrap({ children }){
  return (
  <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="min-h-screen"
    >
      {children}
  </Motion.div>
  );
}

export default function Dashboard(){
  return (
    <TaskProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TaskProvider>
  );
}
