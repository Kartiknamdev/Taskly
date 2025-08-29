import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const blobAnim = (delay=0) => ({
  initial:{scale:0, opacity:0},
  animate:{scale:1, opacity:0.55, transition:{type:'spring', stiffness:60, damping:20, delay}},
});

export default function Welcome(){
  return (
    <div className="relative min-h-full flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Background gradient & grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1d] via-navy-800 to-[#030712]" />
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_25%_20%,#ffffff_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      {/* Floating blobs */}
      <motion.div {...blobAnim(0.1)} className="absolute w-[520px] h-[520px] -top-40 -left-32 rounded-full bg-gradient-to-br from-cyan-400/40 to-violet-500/30 blur-[100px] animate-pulse" />
      <motion.div {...blobAnim(0.3)} className="absolute w-[420px] h-[420px] top-1/3 -right-36 rounded-full bg-gradient-to-tr from-lime-300/40 to-emerald-500/30 blur-[90px] animate-pulse" />
      <motion.div {...blobAnim(0.5)} className="absolute w-[380px] h-[380px] bottom-[-140px] left-1/3 rounded-full bg-gradient-to-tr from-rose-300/40 to-orange-400/30 blur-[110px] animate-pulse" />
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_center,black,transparent)]">
        {Array.from({length:38}).map((_,i)=>(
          <span key={i} className="absolute w-1 h-1 rounded-full bg-white/40 animate-[float_6s_linear_infinite]" style={{
            top: Math.random()*100+'%',
            left: Math.random()*100+'%',
            animationDelay: (Math.random()*6)+'s',
            animationDuration: (5+Math.random()*8)+'s'
          }} />
        ))}
      </div>
      {/* Foreground content */}
      <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:0.8, ease:'easeOut'}} className="relative z-10 w-full px-8 py-12 text-center max-w-md mx-auto">
        <motion.h1 layout className="text-5xl leading-tight font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
          TASKLY
        </motion.h1>
        <motion.p initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{delay:0.25}} className="mt-5 text-slate-300/90 text-sm leading-relaxed">
          A playful space for planning, scribbling and shipping your day. Jot quick notes, sketch visual ideas, and keep tasks flowing.
        </motion.p>
        <motion.div initial={{scale:0.92, opacity:0}} animate={{scale:1, opacity:1}} transition={{delay:0.5, type:'spring', stiffness:160, damping:18}} className="mt-10 flex flex-col items-center gap-4">
          <Link to="/tasks" className="group relative inline-flex items-center gap-2 px-9 py-4 rounded-full text-sm font-semibold tracking-wide text-slate-900 bg-gradient-to-r from-lime-300 via-emerald-300 to-lime-200 shadow-[0_6px_20px_-4px_rgba(163,230,53,0.55)] hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-lime-300/60">
            <span>Enter App</span>
            <span className="text-xl translate-y-0 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400/70 flex items-center gap-2">
            <span className="h-px w-6 bg-slate-500/40" /> Fast • Minimal • Creative • Taskly <span className="h-px w-6 bg-slate-500/40" />
          </div>
        </motion.div>
      </motion.div>
      {/* Subtle bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030712] to-transparent" />
      <style>{`
        @keyframes float { 0%{transform:translateY(0)} 50%{transform:translateY(-22px)} 100%{transform:translateY(0)} }
      `}</style>
    </div>
  );
}
