'use client';

import { useQuery } from '@apollo/client';
import { GET_CHARACTER } from '@/lib/graphql/queries';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { CharacterDetail } from './character.types';
import Image from 'next/image';
import { Heart, Skull, MapPin, Globe, Play, User, Zap, Sparkles, X, ArrowRight } from 'lucide-react';

interface CharacterCollectibleModalProps {
  characterId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CharacterCollectibleModal({
  characterId,
  isOpen,
  onClose,
}: CharacterCollectibleModalProps) {
  const { data, loading } = useQuery<{ character: CharacterDetail }>(
    GET_CHARACTER,
    {
      variables: { id: characterId },
      skip: !characterId,
    }
  );

  const character = data?.character;

  if (!isOpen) return null;
  
  const isAlive = character?.status === 'Alive';
  const isDead = character?.status === 'Dead';

  // Theme Logic
  const isHuman = character?.species === 'Human';
  const themeColor = isHuman ? 'emerald' : 'fuchsia';
  const accentColor = isHuman ? '#10b981' : '#e879f9'; 
  const accentBorder = isHuman ? 'border-emerald-500/50' : 'border-fuchsia-500/50';
  const accentText = isHuman ? 'text-emerald-500' : 'text-fuchsia-500';
  const accentBg = isHuman ? 'bg-emerald-500' : 'bg-fuchsia-500';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 bg-transparent border-0 shadow-none [&>button:last-child]:hidden outline-none">
        <DialogTitle className="sr-only">Character Details</DialogTitle>
        
        <AnimatePresence mode="wait">
          {loading ? (
            <div className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden rounded-none border border-white/10 shadow-2xl bg-[#06140b]`}>
                {/* TACTICAL CORNERS */}
                <div className="absolute inset-0 pointer-events-none z-50">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-500/50" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-emerald-500/50" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-emerald-500/50" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-500/50" />
                </div>

                {/* HUD GRID */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
                     style={{ 
                         backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 1px, transparent 1px)', 
                         backgroundSize: '40px 40px' 
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

                {/* CORNER DATA STREAMS (Simplified on mobile) */}
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
          ) : character ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`relative w-full h-full flex flex-col md:flex-row overflow-hidden rounded-none border border-white/10 shadow-2xl`}
              style={{ backgroundColor: isHuman ? '#06140b' : '#140612' }}
            >
              {/* TACTICAL CORNERS (Same as Card) */}
              <div className="absolute inset-0 pointer-events-none z-50">
                  {/* Top Left */}
                  <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ${isHuman ? 'border-emerald-500' : 'border-fuchsia-500'}`} />
                  {/* Top Right */}
                  <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 ${isHuman ? 'border-emerald-500' : 'border-fuchsia-500'}`} />
                  {/* Bottom Left */}
                  <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 ${isHuman ? 'border-emerald-500' : 'border-fuchsia-500'}`} />
                  {/* Bottom Right */}
                  <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${isHuman ? 'border-emerald-500' : 'border-fuchsia-500'}`} />
              </div>

              {/* --- BACKGROUND HUD GRID (Tinted) --- */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
                   style={{ 
                       backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 1px, transparent 1px)', 
                       backgroundSize: '40px 40px' 
                   }} 
              />
              {/* Deep Ambient Glow */}
              <div className={`absolute inset-0 z-0 bg-gradient-to-b from-${isHuman ? 'emerald' : 'fuchsia'}-950/20 via-black/20 to-black/80 pointer-events-none md:block hidden`} />
              
              {/* --- CLOSE BUTTON --- */}
              <button 
                  onClick={onClose}
                  className="group absolute top-4 md:top-6 right-4 md:right-6 z-[60] w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/20 border border-white/10 rounded-full transition-all duration-300 hover:rotate-90 hover:scale-110"
              >
                  <X className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </button>

              {/* --- LEFT: VISUAL DATA (Top on Mobile) --- */}
              <div className="w-full h-[40vh] md:w-1/2 md:h-full relative flex flex-col border-b md:border-b-0 md:border-r border-white/5 bg-black/20 shrink-0">
                   
                   {/* SCANNING LINE ANIMATION */}
                   <motion.div 
                        initial={{ top: '0%' }}
                        animate={{ top: '100%' }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                        className={`absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-${themeColor}-400 to-transparent z-20 opacity-50 shadow-[0_0_15px_rgba(255,255,255,0.3)]`}
                   />
                   
                   {/* IMAGE CONTAINER */}
                   <div className="flex-1 relative flex items-center justify-center overflow-hidden p-6 md:p-12">
                       {/* Hologram Effect Base */}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                       
                       <motion.div
                          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="relative w-full h-full"
                       >
                           {/* Main Image */}
                           <Image
                            src={character.image}
                            alt={character.name}
                            fill
                            className={`object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] z-10 ${isDead ? 'grayscale contrast-125' : ''}`}
                           />
                           
                           {/* Ghost/Glitch Layer (Subtle) */}
                           <Image
                            src={character.image}
                            alt=""
                            fill
                            className={`object-contain opacity-20 mix-blend-screen animate-pulse z-0 ${isDead ? 'grayscale' : ''}`}
                            style={{ transform: 'translateX(-4px)' }}
                           />
                       </motion.div>
                   </div>
              </div>


              {/* --- RIGHT: DOSSIER CONTENT (Scrollable) --- */}
              <div className="w-full md:w-1/2 h-full flex flex-col bg-[#080808] relative overflow-y-auto custom-scrollbar">
                   
                   {/* 1. HEADER & BIOMETRICS (Fixed) */}
                   <div className="p-6 md:p-8 pb-4 z-20 bg-[#080808] sticky top-0 md:relative border-b border-white/5 shrink-0">
                       
                        {/* Name (Scaled & Styled) */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.8] tracking-tighter uppercase mb-6 mix-blend-screen truncate">
                            {character.name}
                        </h1>

                        {/* HIGH-TECH BIOMETRICS ROW (3-Col Grid) */}
                        <div className="grid grid-cols-3 gap-2 md:gap-3">
                            {/* Species Module */}
                            <div className="relative group overflow-hidden bg-white/[0.02] border border-white/10 rounded px-2 md:px-3 py-2 md:py-2.5">
                                <div className={`absolute top-0 left-0 w-[2px] h-full ${accentBg} transition-all group-hover:w-1`} />
                                <div className="text-[8px] md:text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Variant</div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs md:text-sm font-bold uppercase tracking-tight ${accentText} truncate`}>{character.species}</span>
                                </div>
                            </div>
                            
                            {/* Gender Module */}
                            <div className="relative group overflow-hidden bg-white/[0.02] border border-white/10 rounded px-2 md:px-3 py-2 md:py-2.5">
                                <div className="absolute top-0 left-0 w-[2px] h-full bg-white/20 transition-all group-hover:w-1" />
                                <div className="text-[8px] md:text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Sex</div>
                                <div className="text-xs md:text-sm font-bold uppercase tracking-tight text-white/70 truncate">{character.gender}</div>
                            </div>

                            {/* Status Module (Merged) */}
                            <div className={`relative group overflow-hidden bg-white/[0.02] border ${isAlive ? 'border-emerald-500/20' : isDead ? 'border-red-500/20' : 'border-yellow-500/20'} rounded px-2 md:px-3 py-2 md:py-2.5`}>
                                <div className={`absolute top-0 left-0 w-[2px] h-full ${isAlive ? 'bg-emerald-500' : isDead ? 'bg-red-500' : 'bg-yellow-500'} transition-all group-hover:w-1`} />
                                <div className="text-[8px] md:text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Vitality</div>
                                <div className={`text-xs md:text-sm font-bold uppercase tracking-tight truncate ${isAlive ? 'text-emerald-400' : isDead ? 'text-red-500' : 'text-yellow-500'}`}>
                                    {character.status}
                                </div>
                            </div>
                        </div>
                   </div>

                   {/* 2. NAVIGATION DATA */}
                   <div className="px-6 md:px-8 py-6 relative shrink-0">
                        <div className="text-[10px] font-mono font-bold text-white/30 tracking-widest uppercase mb-4 flex items-center gap-2">
                           <Globe className="w-3 h-3" /> Navigation History
                        </div>

                        {/* Trajectory Visualization */}
                        <div className="p-4 md:p-6 bg-white/[0.02] rounded-lg border border-white/5 relative overflow-hidden group/nav">
                            
                            {/* Animated Background Scan (Subtle) */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover/nav:animate-[shimmer_2s_infinite]" />

                            <div className="relative flex items-start justify-between">
                                
                                {/* Connecting Line Layer */}
                                <div className="absolute top-2.5 left-2 right-2 h-[2px] bg-white/10 overflow-hidden">
                                     <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${themeColor}-400 to-transparent w-1/2 animate-[scan_3s_linear_infinite]`} />
                                </div>

                                {/* Origin Node (Left) */}
                                <div className="relative z-10 flex flex-col items-start gap-3 max-w-[40%]">
                                    <div className="w-5 h-5 rounded-full bg-[#080808] border-2 border-white/20 flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover/nav:border-white/60 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                    </div>
                                    <div className="flex flex-col items-start text-left">
                                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1 line-clamp-1">Origin</span>
                                        <span className="text-sm md:text-base font-bold text-white/70 uppercase leading-tight line-clamp-1">{character.origin.name}</span>
                                    </div>
                                </div>

                                {/* Direction Indicator (Center) */}
                                <div className="relative z-10 mt-0.5 bg-[#080808] px-1 md:px-2 border border-white/5 rounded-full py-0.5">
                                     <ArrowRight className="w-3 h-3 text-white/30" />
                                </div>

                                {/* Current Node (Right) */}
                                <div className="relative z-10 flex flex-col items-end gap-3 max-w-[40%]">
                                    <div className={`w-5 h-5 rounded-full bg-[#080808] border-[3px] ${isHuman ? 'border-emerald-500' : 'border-fuchsia-500'} flex items-center justify-center shadow-[0_0_15px_${isHuman ? 'rgba(16,185,129,0.5)' : 'rgba(232,121,249,0.5)'}]`}>
                                         <div className={`w-2 h-2 rounded-full ${accentBg} animate-pulse`} />
                                    </div>
                                    <div className="flex flex-col items-end text-right">
                                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1 line-clamp-1">Position</span>
                                        <span className={`text-sm md:text-base font-black uppercase leading-tight ${accentText} drop-shadow-[0_0_8px_rgba(0,0,0,0.5)] line-clamp-1`}>
                                            {character.location.name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                   </div>

                   {/* 3. ENCOUNTER LOG */}
                   <div className="px-6 md:px-8 pb-8 min-h-0">
                        <div className="py-4 border-b border-white/5 mb-2 flex justify-between items-end">
                             <div className="text-[10px] font-mono font-bold text-white/30 tracking-widest uppercase flex items-center gap-2">
                                <Zap className="w-3 h-3" /> Encounter Log
                             </div>
                             <div className="text-[9px] font-mono text-white/20">{character.episode.length} ENTRIES</div>
                        </div>
                        
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-y-2 gap-x-2">
                             {character.episode.map((ep, i) => (
                                 <div 
                                    key={ep.id} 
                                    className={`text-left text-[10px] md:text-xs font-mono text-white/40 hover:${isHuman ? 'text-emerald-400' : 'text-fuchsia-400'} transition-colors cursor-help truncate`}
                                    title={ep.name}
                                 >
                                    #{ep.episode}
                                 </div>
                             ))}
                        </div>
                   </div>

                   {/* DECORATIVE GRADIENT (Over scroll) */}
                   <div className="sticky bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none z-40" />
              </div>

            </motion.div>
          ) : null}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

function TechBadge({ icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
    const colorClasses = {
        emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        fuchsia: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
        zinc: "bg-white/5 text-white/60 border-white/10"
    }[color] || "bg-white/5 text-white/60 border-white/10";

    return (
        <div className={`flex items-center gap-3 px-4 py-2 rounded border ${colorClasses}`}>
            <span className="opacity-70">{icon}</span>
            <div className="flex flex-col">
                <span className="text-[9px] font-bold tracking-widest uppercase opacity-50 leading-none mb-1">{label}</span>
                <span className="text-sm font-bold leading-none uppercase">{value}</span>
            </div>
        </div>
    )
}

function InfoBlock({ icon, label, value, sub }: { icon: any, label: string, value: string, sub?: string }) {
    return (
        <div className="flex gap-5 items-start group">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors">
                {icon}
            </div>
            <div>
                <div className="text-white/40 font-bold uppercase tracking-widest text-xs mb-1">{label}</div>
                <div className="text-2xl font-bold text-white leading-tight mb-1">{value}</div>
                <div className="text-white/50 text-sm font-medium">{sub || 'Unknown'}</div>
            </div>
        </div>
    )
}
