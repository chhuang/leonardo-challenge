'use client';

import { motion } from 'framer-motion';

export function TacticalLoader({ className, fullScreen }: { className?: string, fullScreen?: boolean }) {
  const commonClasses = "flex items-center justify-center overflow-hidden";
  const positionClasses = fullScreen 
    ? "fixed inset-0 z-[110] bg-[#020904]" 
    : "relative w-full h-full";
  
  return (
    <div className={`${commonClasses} ${positionClasses} ${className || ''}`}>
        {/* HUD GRID BACKGROUND */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
             style={{ 
                 backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 1px, transparent 1px)', 
                 backgroundSize: '30px 30px' 
             }} 
        />

        {/* SCANNING LINE */}
        <motion.div 
            initial={{ top: '10%' }}
            animate={{ top: '90%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatType: "mirror" }}
            className="absolute left-1/4 right-1/4 h-[1px] bg-emerald-500/40 z-20 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
        />

        <div className="relative z-10 flex flex-col items-center">
            {/* HUB SPINNER */}
            <div className="relative w-24 md:w-32 h-24 md:h-32 mb-6 md:mb-8">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-2 border-emerald-500/10 rounded-full" />
                <div className="absolute inset-0 border-2 border-t-emerald-500/40 rounded-full animate-[spin_3s_linear_infinite]" />
                
                {/* Inner Orbit */}
                <div className="absolute inset-3 md:inset-4 border border-emerald-500/5 rounded-full" />
                <div className="absolute inset-3 md:inset-4 border border-b-emerald-500/60 rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
                
                {/* Center Point */}
                <div className="absolute inset-[45%] bg-emerald-500/20 rounded-full animate-pulse blur-sm" />
                <div className="absolute inset-[48%] bg-emerald-500 rounded-full" />
                
                {/* HUD Markings */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] md:text-[8px] font-mono text-emerald-500/40 uppercase tracking-widest">Scanning</div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[7px] md:text-[8px] font-mono text-emerald-500/40 uppercase tracking-widest leading-none">Accessing_Archive_v3.5</div>
            </div>

            <div className="flex flex-col items-center gap-2">
                <div className="text-lg md:text-xl font-black text-white uppercase tracking-[0.3em] leading-none animate-[flicker_2s_infinite]">Initializing...</div>
                <div className="text-[9px] md:text-[10px] font-mono text-emerald-500/40 uppercase tracking-[0.2em] flex items-center gap-2">
                     <span>Decrypting_DNA</span>
                     <span className="inline-block w-6 md:w-8 h-[2px] bg-emerald-500/20 relative overflow-hidden">
                         <motion.div 
                            className="absolute inset-0 bg-emerald-500"
                            animate={{ left: ['-100%', '100%'] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                         />
                     </span>
                </div>
            </div>
        </div>

        {/* CORNER DATA STREAMS */}
        <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 text-[7px] md:text-[8px] font-mono text-emerald-500/20 uppercase tracking-widest flex flex-col gap-1 z-10">
            <div>SCTR_C137_LINK</div>
            <div className="hidden sm:block">DATA_PKT_RECV: 00FF12</div>
            <div>SIG_STRENGTH: 98%</div>
        </div>
        <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 text-[7px] md:text-[8px] font-mono text-emerald-500/20 uppercase tracking-widest text-right flex flex-col gap-1 z-10">
            <div>PORTAL_GATE: ON</div>
            <div className="hidden sm:block">CURR_DIM: EARTH_C137</div>
            <div>MEM_ALLOC: 4.2TB</div>
        </div>
    </div>
  );
}
