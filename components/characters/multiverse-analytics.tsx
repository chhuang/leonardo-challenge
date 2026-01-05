'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Skull, Activity } from 'lucide-react';
import { useMultiverseStats } from './use-multiverse-stats.hooks';
import { useLocationData } from './use-location-data.hooks';
import { useRef, MouseEvent } from 'react';

export function MultiverseAnalytics() {
  const { stats, loading: statsLoading, error: statsError } = useMultiverseStats();
  const { locations, loading: locLoading, error: locError } = useLocationData();
  const containerRef = useRef<HTMLDivElement>(null);

  // Holographic 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (statsError || locError) return null;

  // Calculate split based solely on Humans and Aliens (Sum = 100%)
  const totalSpecies = (stats.humans + stats.aliens) || 1;
  const humanRatio = (stats.humans / totalSpecies) * 100;
  const slantOffset = 8; // Slant degree in percentage

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ perspective: 1200, rotateX, rotateY }}
      className="relative w-full mb-12 select-none md:max-w-7xl mx-auto"
    >
      {/* 
        --- AAA CENTERED HUD V6.8 ---
        Refined layout with species metrics centered and labels grounded below the counts.
        Maintains the "Clean Ribbon" aesthetic with pure biometric split.
      */}
      <div className="relative h-28 md:h-32 bg-[#020503] border border-white/10 rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] group">
        
        {/* EMERALD SIDE (HUMAN) */}
        <motion.div 
           initial={{ width: 0 }}
           animate={{ width: `${humanRatio + slantOffset}%` }}
           transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
           className="absolute inset-y-0 left-0 z-0 overflow-hidden"
           style={{ 
              clipPath: `polygon(0 0, 100% 0, calc(100% - ${slantOffset * 2}%) 100%, 0 100%)`,
              background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.7) 0%, rgba(5, 150, 105, 0.3) 100%)'
           }}
        >
           <motion.div 
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.3)_0%,transparent_60%)]" 
           />
        </motion.div>

        {/* FUCHSIA SIDE (ALIEN) */}
        <motion.div 
           initial={{ left: "100%", width: "100%" }}
           animate={{ left: `${humanRatio - slantOffset}%` }}
           transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
           className="absolute inset-y-0 right-0 z-0 overflow-hidden"
           style={{ 
              clipPath: `polygon(${slantOffset * 2}% 0, 100% 0, 100% 100%, 0 100%)`,
              background: 'linear-gradient(135deg, rgba(162, 28, 175, 0.3) 0%, rgba(162, 28, 175, 0.7) 100%)'
           }}
        >
           <motion.div 
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(217,70,239,0.2)_0%,transparent_60%)]" 
           />
        </motion.div>

        {/* FLUID ENERGY FIELD (WAVEFORMS) */}
        <div className="absolute inset-0 z-1 pointer-events-none opacity-25 flex items-center">
           <svg width="100%" height="80" viewBox="0 0 1000 80" preserveAspectRatio="none" className="w-full">
              <motion.path
                 d="M0,40 Q100,20 200,40 T400,40 T600,40 T800,40 T1000,40"
                 stroke="white"
                 strokeWidth="1.2"
                 fill="none"
                 animate={{ 
                    d: [
                      "M0,40 Q100,15 200,40 T400,40 T600,40 T800,40 T1000,40",
                      "M0,40 Q100,65 200,40 T400,40 T600,40 T800,40 T1000,40",
                      "M0,40 Q100,15 200,40 T400,40 T600,40 T800,40 T1000,40"
                    ],
                    opacity: [0.3, 0.6, 0.3]
                 }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.path
                 d="M0,40 Q150,55 300,40 T600,40 T900,40 T1200,40"
                 stroke="white"
                 strokeWidth="0.6"
                 fill="none"
                 animate={{ 
                    d: [
                      "M0,40 Q150,65 300,40 T600,40 T900,40 T1200,40",
                      "M0,40 Q150,15 300,40 T600,40 T900,40 T1200,40",
                      "M0,40 Q150,65 300,40 T600,40 T900,40 T1200,40"
                    ],
                    opacity: [0.2, 0.4, 0.2]
                 }}
                 transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
           </svg>
        </div>

        {/* Scanline Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-2 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(255,255,255,0.1)_50%)] bg-[size:100%_2px]" />

        {/* --- CONTENT LAYER --- */}
        <div className="relative z-10 w-full h-full flex items-center px-10 md:px-14 justify-between">
           
           {/* HUMANS COUNT (Centered Group) */}
           <div className="flex flex-col items-center text-center">
              <span className="text-6xl md:text-7xl font-black text-white leading-none tracking-tighter drop-shadow-2xl">
                 {statsLoading ? "---" : stats.humans.toLocaleString()}
              </span>
              <span className="text-[11px] font-black text-emerald-100/50 uppercase tracking-[0.45em] mt-2 font-mono leading-none">HUMANS</span>
           </div>

           {/* CENTER: VITALS OVERLAY */}
           <div className="hidden lg:flex items-center gap-8 bg-black/40 backdrop-blur-3xl px-12 h-16 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <V68Vital label="ALIVE" val={stats.alive} color="emerald" icon={<Heart className="w-5 h-5" />} />
              <div className="w-px h-8 bg-white/10" />
              <V68Vital label="DECEASED" val={stats.dead} color="rose" icon={<Skull className="w-5 h-5" />} />
              <div className="w-px h-8 bg-white/10" />
              <V68Vital label="UNKNOWN" val={stats.unknown} color="zinc" icon={<Activity className="w-5 h-5" />} />
           </div>

           {/* ALIENS COUNT (Centered Group) */}
           <div className="flex flex-col items-center text-center">
              <span className="text-6xl md:text-7xl font-black text-white leading-none tracking-tighter drop-shadow-2xl">
                 {statsLoading ? "---" : stats.aliens.toLocaleString()}
              </span>
              <span className="text-[11px] font-black text-fuchsia-100/50 uppercase tracking-[0.45em] mt-2 font-mono leading-none">ALIENS</span>
           </div>

        </div>

      </div>

      {/* MOBILE VITALS BAR */}
      <div className="lg:hidden mt-4 grid grid-cols-3 bg-black/60 backdrop-blur-3xl px-6 py-4 rounded-2xl border border-white/10 gap-4">
         <V68Vital label="ALIVE" val={stats.alive} color="emerald" icon={<Heart className="w-4 h-4" />} />
         <V68Vital label="DECEASED" val={stats.dead} color="rose" icon={<Skull className="w-4 h-4" />} />
         <V68Vital label="UNKNOWN" val={stats.unknown} color="zinc" icon={<Activity className="w-4 h-4" />} />
      </div>

    </motion.div>
  );
}

function V68Vital({ label, val, color, icon }: { label: string; val: number; color: 'emerald' | 'rose' | 'zinc'; icon: React.ReactNode }) {
  const colorMap = {
    emerald: 'text-emerald-400',
    rose: 'text-rose-400',
    zinc: 'text-zinc-400',
  };

  return (
    <div className="flex items-center gap-3 justify-center lg:justify-start">
       <div className={`${colorMap[color]} drop-shadow-[0_0_5px_currentColor]`}>
          {icon}
       </div>
       <div className="flex flex-col">
          <span className={`${colorMap[color]} text-2xl font-black leading-none tracking-tight`}>{val}</span>
          <span className="text-[9px] font-mono font-black text-white/30 uppercase tracking-tighter mt-1">{label}</span>
       </div>
    </div>
  );
}
