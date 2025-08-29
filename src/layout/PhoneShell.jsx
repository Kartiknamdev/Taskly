import React from 'react';

export default function PhoneShell({ children }) {
  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-800 via-navy-800 to-navy-900 p-2 sm:p-6 overflow-hidden">
      <div className="relative w-full h-screen max-w-[430px] sm:h-auto sm:aspect-[9/16] bg-navy-900 rounded-none sm:rounded-[40px] shadow-[0_10px_40px_-5px_rgba(0,0,0,0.6)] ring-1 ring-white/5 overflow-hidden">
        {/* Fake status bar notch */}
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 h-6 w-40 bg-slate-800/60 rounded-b-3xl z-20" />
        <div className="absolute inset-0 flex flex-col" style={{paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)'}}>
          {children}
        </div>
      </div>
    </div>
  );
}
