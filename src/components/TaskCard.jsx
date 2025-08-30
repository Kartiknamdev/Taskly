import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useTasks } from '../state/TaskContext';

// Base pastel backgrounds mapped to status for consistency; text always high-contrast.
const STATUS_BG = {
  completed: 'from-lime-200 to-lime-100',
  running: 'from-violet-200 to-violet-100',
  rejected: 'from-cyan-300 to-cyan-200',
  upcoming: 'from-amber-200 to-amber-100'
};

function InlineTitle({ title, canEdit, onSave, variant }) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  useEffect(()=> { if(editing) inputRef.current?.focus(); }, [editing]);
  if(!canEdit) {
    return (
      <button
        type="button"
        onClick={()=> setEditing(true)}
        className={`text-left font-semibold tracking-tight ${variant==='fullscreen'?'text-xl':'text-[15px]'} text-slate-900/90 focus:outline-none focus:ring-2 focus:ring-slate-900/30 rounded px-1`}
      >{title || 'Untitled Task'}</button>
    );
  }
  return editing ? (
    <input
      ref={inputRef}
      defaultValue={title}
      placeholder="Title"
      onBlur={e=> { onSave(e.target.value.trim()); setEditing(false); }}
      onKeyDown={e=> { if(e.key==='Enter'){ e.currentTarget.blur(); } }}
      className={`px-3 py-2 rounded-xl bg-white/70 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/40 placeholder-slate-500 ${variant==='fullscreen'?'min-w-[200px]':''}`}
    />
  ) : (
    <button
      type="button"
      onClick={()=> setEditing(true)}
      className={`text-left font-semibold tracking-tight ${variant==='fullscreen'?'text-xl':'text-[15px]'} text-slate-900/90 focus:outline-none focus:ring-2 focus:ring-slate-900/30 rounded px-1`}
    >{title || 'Untitled Task'}</button>
  );
}

export default function TaskCard({ task, forceEditing=false, mode: controlledMode, variant='normal' }) {
  const { setActiveTaskId, updateTask } = useTasks();
  const { deleteTask } = useTasks();
  const isEditing = forceEditing;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [internalMode, setInternalMode] = useState('text'); // 'text' | 'canvas'
  const mode = controlledMode || internalMode;
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [strokes, setStrokes] = useState(()=> task.drawingStrokes || []); // [{color,width,mode:'draw'|'erase', points:[[x,y],...]}]
  const [redoStack, setRedoStack] = useState([]);
  const [penColor, setPenColor] = useState(()=> localStorage.getItem('tasky.pen.color') || '#334155');
  const [penWidth, setPenWidth] = useState(()=> parseInt(localStorage.getItem('tasky.pen.width')||'2'));
  const [penMode, setPenMode] = useState('draw'); // 'draw' | 'erase'

  useEffect(()=> { localStorage.setItem('tasky.pen.color', penColor); }, [penColor]);
  useEffect(()=> { localStorage.setItem('tasky.pen.width', String(penWidth)); }, [penWidth]);

  // Redraw canvas whenever strokes change or mode switches while editing
  useEffect(()=> {
    if(mode!=='canvas') return;
    const c = canvasRef.current; if(!c) return;
    const ctx = c.getContext('2d');
    ctx.clearRect(0,0,c.width,c.height);
    strokes.forEach(st => {
      ctx.save();
      if(st.mode==='erase') ctx.globalCompositeOperation='destination-out'; else ctx.globalCompositeOperation='source-over';
      ctx.strokeStyle = st.color;
      ctx.lineWidth = st.width;
      ctx.lineCap='round'; ctx.lineJoin='round';
      ctx.beginPath();
      st.points.forEach(([x,y],i)=>{
        if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      });
      ctx.stroke();
      ctx.restore();
    });
  }, [strokes, mode]);
  const gradient = task.colorGradient || STATUS_BG[task.status] || 'from-slate-200 to-slate-100';
  // Ensure progress stays within 0-100
  const progress = useMemo(()=> Math.min(100, Math.max(0, task.progress || 0)), [task.progress]);

  const currentStrokeRef = useRef(null);
  const pointerPos = (e) => {
    const c = canvasRef.current; if (!c) return [0, 0];
    const r = c.getBoundingClientRect();
    // Calculate scale between canvas's internal size and its display size
    const scaleX = c.width / r.width;
    const scaleY = c.height / r.height;
    const clientX = (e.clientX !== undefined) ? e.clientX : (e.touches && e.touches[0].clientX);
    const clientY = (e.clientY !== undefined) ? e.clientY : (e.touches && e.touches[0].clientY);
    return [
      (clientX - r.left) * scaleX,
      (clientY - r.top) * scaleY
    ];
  };
  const startDraw = e => {
    if(mode!=='canvas') return; const c=canvasRef.current; if(!c) return;
    e.preventDefault();
    setDrawing(true);
    const [x,y] = pointerPos(e.nativeEvent || e);
    const stroke = { color: penColor, width: penWidth, mode: penMode, points:[[x,y]] };
    currentStrokeRef.current = stroke;
    setStrokes(prev => [...prev, stroke]);
    setRedoStack([]);
  };
  const moveDraw = e => {
    if(!drawing) return;
    const [x,y] = pointerPos(e.nativeEvent || e);
    setStrokes(prev => prev.map((s,i)=> i===prev.length-1 ? { ...s, points:[...s.points, [x,y]] } : s));
  };
  const stopDraw = () => {
    if(!drawing) return; setDrawing(false); saveDrawing();
  };

  const saveTitle = (val) => updateTask(task.id, { title: val });
  const saveNotes = (val) => updateTask(task.id, { notes: val });
  const saveDrawing = () => { if(canvasRef.current){ updateTask(task.id, { drawing: canvasRef.current.toDataURL(), drawingStrokes: strokes }); } };

  return (
    <article
      onClick={()=> { if(!forceEditing){ setActiveTaskId(task.id); } }}
      className={`relative rounded-3xl p-5 shadow-card bg-gradient-to-br ${gradient} w-full border border-black/5 transition-shadow cursor-pointer ${isEditing?'ring-2 ring-slate-900/30':''} ${variant==='fullscreen'?'min-h-[55vh] flex flex-col cursor-default':''}`}> 
      <div className="flex justify-between items-start mb-3 gap-3">
        <InlineTitle
          title={task.title}
          canEdit={isEditing}
          onSave={val=> saveTitle(val)}
          variant={variant}
        />
        <div className="flex gap-2 items-center shrink-0">
          {isEditing && (
            <div className="flex text-[10px] bg-black/10 rounded-full p-1">
              <button type="button" onClick={()=> setInternalMode('text')} className={`px-2 rounded-full ${mode==='text'?'bg-white/80 text-slate-900':'text-slate-800/70'}`}>Text</button>
              <button type="button" onClick={()=> setInternalMode('canvas')} className={`px-2 rounded-full ${mode==='canvas'?'bg-white/80 text-slate-900':'text-slate-800/70'}`}>Pen</button>
            </div>
          )}
          {isEditing && !showDeleteConfirm && (
            <button
              type="button"
              onClick={()=> setShowDeleteConfirm(true)}
              className="text-[11px] px-2 py-1 rounded-full bg-red-500/20 text-red-700 hover:bg-red-500/30 transition-colors"
              aria-label="Delete task"
            >Del</button>
          )}
          {/* overlay handled later */}
          {!isEditing && <button aria-label="Edit" className="text-slate-700 hover:text-slate-900 text-lg leading-none" onClick={()=> setActiveTaskId(task.id)}>⋮</button>}
        </div>
      </div>
      {isEditing ? (
        <div className={`flex flex-col gap-3 ${variant==='fullscreen'?'flex-1':''}`}>
          {mode==='text' && (
            <textarea
              defaultValue={task.notes}
              onBlur={e=> saveNotes(e.target.value)}
              placeholder="Notes (use Enter for bullets)"
              className={`p-3 rounded-xl bg-white/60 text-[13px] leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-slate-900/40 text-slate-800 placeholder-slate-500 ${variant==='fullscreen'?'flex-1 min-h-[240px]':'h-28'}`}
            />
          )}
          {mode==='canvas' && (
            <div className="flex flex-col gap-3 flex-1 min-h-[320px]">
              <div className="flex items-center gap-3 text-[11px] flex-wrap">
                <div className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded-full">
                  <span className="uppercase tracking-wide text-slate-700">Pen</span>
                  {["#334155","#2563eb","#dc2626"].map(c => (
                    <button key={c} type="button" onClick={()=> { setPenMode('draw'); setPenColor(c); }} className={`w-5 h-5 rounded-full border border-black/20 ${penColor===c && penMode==='draw'? 'ring-2 ring-black/40':''}`} style={{background:c}} />
                  ))}
                  <button type="button" onClick={()=> setPenMode(p=> p==='erase'?'draw':'erase')} className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${penMode==='erase'?'bg-white text-slate-900':'bg-black/10 text-slate-800/80'}`}>{penMode==='erase'? 'Eraser':'Draw'}</button>
                </div>
                <div className="flex items-center gap-2 bg-white/50 px-2 py-1 rounded-full">
                  <label className="text-slate-700">Width</label>
                  <input type="range" min={1} max={16} value={penWidth} onChange={e=> setPenWidth(parseInt(e.target.value))} className="accent-slate-700" />
                  <span className="tabular-nums text-slate-700 w-6 text-center">{penWidth}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 px-2 py-1 rounded-full">
                  <button type="button" onClick={()=> { if(strokes.length){ setRedoStack(r=> [strokes[strokes.length-1], ...r]); setStrokes(s=> s.slice(0,-1)); saveDrawing(); } }} disabled={!strokes.length} className="px-2 py-1 rounded-full disabled:opacity-40 bg-black/10 hover:bg-black/20">Undo</button>
                  <button type="button" onClick={()=> { if(redoStack.length){ const [first,...rest]=redoStack; setStrokes(s=> [...s, first]); setRedoStack(rest); saveDrawing(); } }} disabled={!redoStack.length} className="px-2 py-1 rounded-full disabled:opacity-40 bg-black/10 hover:bg-black/20">Redo</button>
                  <button type="button" onClick={()=> { setStrokes([]); setRedoStack([]); if(canvasRef.current){ const ctx=canvasRef.current.getContext('2d'); ctx.clearRect(0,0,canvasRef.current.width,canvasRef.current.height); saveDrawing(); } }} className="px-2 py-1 rounded-full bg-black/10 hover:bg-black/20">Clear</button>
                </div>
              </div>
              <div className="flex-1">
                <canvas
                  ref={canvasRef}
                  width={variant==='fullscreen'? 1000:600}
                  height={variant==='fullscreen'? 520:220}
                  onMouseDown={startDraw}
                  onMouseMove={moveDraw}
                  onMouseUp={stopDraw}
                  onMouseLeave={stopDraw}
                  onTouchStart={startDraw}
                  onTouchMove={moveDraw}
                  onTouchEnd={stopDraw}
                  className={`bg-white rounded-xl w-full ${variant==='fullscreen'?'h-[440px]':'h-52'} cursor-crosshair shadow-inner touch-none`}
                  style={{touchAction:'none'}}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mb-4 space-y-2">
          {task.notes && <p className="text-[11px] text-slate-800 leading-snug whitespace-pre-line line-clamp-3">{task.notes}</p>}
          {task.drawing && !task.notes && <img src={task.drawing} alt="sketch" className="rounded-lg w-full max-h-40 object-cover" />}
        </div>
      )}
      {!isEditing && (
        <div className="flex items-center gap-3" aria-label="Progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="flex-1 h-2 rounded-full bg-slate-900/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-slate-900/70 to-slate-900" style={{width: `${progress}%`}} />
          </div>
          <span className="text-[11px] font-semibold tabular-nums text-slate-700">{progress}%</span>
        </div>
      )}
      {showDeleteConfirm && isEditing && (
        <div className="absolute inset-0 rounded-3xl flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl p-6 flex flex-col items-center gap-4 max-w-[240px] text-center shadow-lg">
            <p className="text-sm font-medium text-slate-800 leading-snug">Delete this task?<br/><span className="text-slate-500 text-xs font-normal">This action cannot be undone.</span></p>
            <div className="flex gap-3 text-xs font-semibold">
              <button type="button" onClick={()=> deleteTask(task.id)} className="px-4 py-2 rounded-full bg-red-600 text-white shadow hover:bg-red-500 active:scale-95 transition">Delete</button>
              <button type="button" onClick={()=> setShowDeleteConfirm(false)} className="px-4 py-2 rounded-full bg-slate-700 text-white/90 hover:bg-slate-600 active:scale-95 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
