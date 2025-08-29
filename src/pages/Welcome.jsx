import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion';

const blobAnim = (delay=0) => ({
  initial:{scale:0, opacity:0},
  animate:{scale:1, opacity:0.55, transition:{type:'spring', stiffness:60, damping:20, delay}},
});

export default function Welcome(){
  const [showAbout, setShowAbout] = useState(false);
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
  {/* Animated aurora layer */}
  <div className="aurora-layer absolute inset-0 opacity-50 mix-blend-screen pointer-events-none" />
  {/* Fine noise overlay for texture */}
  <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\' fill=\'none\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/></filter><rect width=\'120\' height=\'120\' filter=\'url(%23n)\' opacity=\'0.55\'/></svg>')] bg-repeat" />
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
          <button onClick={()=> setShowAbout(true)} className="text-[11px] px-4 py-2 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 backdrop-blur-md border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-300/50">About</button>
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400/70 flex items-center gap-2">
            <span className="h-px w-6 bg-slate-500/40" /> Fast • Minimal • Creative • Taskly <span className="h-px w-6 bg-slate-500/40" />
          </div>
        </motion.div>
      </motion.div>
      {showAbout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={()=> setShowAbout(false)} />
          <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}} className="relative z-10 w-full max-w-sm rounded-3xl bg-white/7 backdrop-blur-2xl border border-white/15 shadow-[0_8px_40px_-6px_rgba(0,0,0,0.6)] p-8 flex flex-col gap-5 text-center">
            <h3 className="text-lg font-semibold tracking-wide text-slate-100">About Taskly</h3>
            <p className="text-sm text-slate-300 leading-relaxed">Hi, I'm <span className="font-medium text-white">Kartik Namdev</span> — building a focused space for tasks, notes and quick sketches.</p>
            <div className="flex flex-col gap-3">
              <a href="https://www.linkedin.com/in/kartikknamdev" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 text-xs font-medium px-4 py-2 rounded-full bg-gradient-to-r from-sky-500/15 via-sky-600/15 to-blue-500/15 hover:from-sky-500/30 hover:to-blue-500/30 text-sky-300 border border-sky-400/30 transition-colors">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4 fill-current opacity-90 group-hover:opacity-100"><path d="M4.98 3.5c0 1.38-1.11 2.5-2.48 2.5A2.5 2.5 0 0 1 0 3.5C0 2.12 1.11 1 2.5 1S5 2.12 5 3.5ZM.5 8.06h4V23h-4V8.06ZM8.34 8.06h3.84v2.04h.06c.54-1.02 1.86-2.1 3.83-2.1 4.09 0 4.85 2.62 4.85 6.02V23h-4v-7.53c0-1.79-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.96V23h-4V8.06Z"/></svg>
                LinkedIn
                <span className="text-base leading-none">↗</span>
              </a>
              <a href="https://github.com/Kartiknamdev/Taskly" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 text-xs font-medium px-4 py-2 rounded-full bg-gradient-to-r from-slate-500/20 via-slate-600/20 to-slate-700/20 hover:from-slate-500/35 hover:to-slate-700/35 text-slate-200 border border-slate-500/40 transition-colors">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4 fill-current opacity-90 group-hover:opacity-100"><path fillRule="evenodd" d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.04 1.78 2.72 1.26 3.38.96.1-.76.41-1.26.74-1.55-2.55-.29-5.23-1.28-5.23-5.72 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.18-1.49 3.14-1.18 3.14-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.82 1.18 3.08 0 4.45-2.69 5.42-5.25 5.71.42.36.79 1.07.79 2.16 0 1.56-.01 2.81-.01 3.19 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" clipRule="evenodd"/></svg>
                GitHub Repo
                <span className="text-base leading-none">↗</span>
              </a>
            </div>
            <button onClick={()=> setShowAbout(false)} className="mt-2 text-[11px] px-4 py-2 rounded-full bg-white/10 text-slate-200 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-300/40">Close</button>
          </motion.div>
        </div>
      )}
      {/* Subtle bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030712] to-transparent" />
      <style>{`
        @keyframes float { 0%{transform:translateY(0)} 50%{transform:translateY(-22px)} 100%{transform:translateY(0)} }
        @keyframes auroraMove { 0%{background-position:0% 50%, 50% 50%, 100% 50%; filter:hue-rotate(0deg);} 50%{background-position:50% 60%, 60% 40%, 30% 60%; filter:hue-rotate(40deg);} 100%{background-position:0% 50%, 50% 50%, 100% 50%; filter:hue-rotate(0deg);} }
        .aurora-layer { background:
          radial-gradient(circle at 20% 30%, rgba(56,189,248,0.35), transparent 60%),
          radial-gradient(circle at 80% 50%, rgba(168,85,247,0.30), transparent 65%),
          radial-gradient(circle at 55% 75%, rgba(163,230,53,0.28), transparent 60%);
          background-size: 140% 140%, 120% 120%, 160% 160%;
          animation: auroraMove 18s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
