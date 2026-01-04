'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Character } from './character.types';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Heart, Skull, User, Zap, Sparkles, Crosshair } from 'lucide-react';

interface CharacterCollectibleCardProps {
  character: Character;
  onClick: () => void;
  index: number;
}

function getSpeciesTheme(species: string) {
    if (species === 'Human') return { 
        primary: 'bg-emerald-500', 
        text: 'text-emerald-400',
        borderColor: 'border-emerald-500', 
        glow: 'shadow-emerald-500/40',
        bgGradient: 'from-emerald-950/90 to-teal-950/90',
        icon: <User className="w-4 h-4 text-emerald-950 fill-current" />
    };
    if (species === 'Alien') return { 
        primary: 'bg-fuchsia-500', 
        text: 'text-fuchsia-400',
        borderColor: 'border-fuchsia-500', 
        glow: 'shadow-fuchsia-500/40',
        bgGradient: 'from-fuchsia-950/90 to-purple-950/90',
        icon: <Zap className="w-4 h-4 text-fuchsia-950 fill-current" />
    };
    // Fallback / Other
    return { 
        primary: 'bg-cyan-500', 
        text: 'text-cyan-400',
        borderColor: 'border-cyan-500', 
        glow: 'shadow-cyan-500/40',
        bgGradient: 'from-cyan-950/90 to-blue-950/90',
        icon: <Sparkles className="w-4 h-4 text-cyan-950 fill-current" />
    };
}

export function CharacterCollectibleCard({
  character,
  onClick,
  index,
}: CharacterCollectibleCardProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Strong 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Increased range from [5, -5] to [15, -15] for stronger movement
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 20 });
  const scale = useSpring(isHovered ? 1.05 : 1, { stiffness: 300, damping: 20 });
  
  // PARALLAX EFFECT ("Mona Lisa" Effect)
  // When card tilts LEFT (mouse left), image moves RIGHT.
  // When card tilts DOWN (mouse down), image moves UP.
  // This inverse movement creates a deep window/hollow sensation.
  const imageX = useSpring(useTransform(x, [-0.5, 0.5], [25, -25]), { stiffness: 300, damping: 20 });
  const imageY = useSpring(useTransform(y, [-0.5, 0.5], [25, -25]), { stiffness: 300, damping: 20 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const theme = getSpeciesTheme(character.species);
  const isAlive = character.status === 'Alive';
  const isDead = character.status === 'Dead';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{ perspective: 1200 }}
      className="w-full aspect-[3/4.2] relative group z-0 hover:z-50"
    >
        <motion.div
            ref={containerRef}
            style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); }}
            onClick={onClick}
            className="w-full h-full relative cursor-pointer"
        >
            
            {/* TACTICAL CORNERS (Static & Colored) */}
            <div className={`absolute inset-0 pointer-events-none z-50 ${isDead ? 'grayscale opacity-50' : ''}`}>
                <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ${theme.borderColor}`} />
                <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 ${theme.borderColor}`} />
                <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 ${theme.borderColor}`} />
                <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${theme.borderColor}`} />
            </div>

            {/* MAIN CARD CONTENT */}
            <div className={`
                absolute inset-[2px] bg-zinc-900/90 backdrop-blur-3xl z-10 overflow-hidden flex flex-col clip-path-polygon
                border border-white/10
                transition-all duration-500
                ${isHovered ? 'bg-zinc-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : ''} 
                ${isDead ? 'grayscale opacity-75' : ''}
            `}> 

                {/* Background Grid */}
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgGradient} opacity-20 z-0`} />
                <div className="absolute inset-0 z-0 opacity-10" 
                     style={{ 
                         backgroundImage: `linear-gradient(${theme.text.includes('emerald') ? 'rgba(52,211,153,0.2)' : theme.text.includes('cyan') ? 'rgba(34,211,238,0.2)' : 'rgba(232,121,249,0.2)'} 1px, transparent 1px), linear-gradient(90deg, ${theme.text.includes('emerald') ? 'rgba(52,211,153,0.2)' : theme.text.includes('cyan') ? 'rgba(34,211,238,0.2)' : 'rgba(232,121,249,0.2)'} 1px, transparent 1px)`, 
                         backgroundSize: '40px 40px' 
                     }} 
                />

                <div className="relative flex flex-col h-full z-10 w-full" style={{ transform: "translateZ(30px)" }}>
                    
                    {/* Header: Name + Location (Top) */}
                    <div className="p-5 pb-0 relative z-20 border-b border-transparent flex flex-col gap-1">
                         <h3 className="font-black text-xl text-white uppercase tracking-tighter leading-none drop-shadow-xl truncate">
                            {character.name}
                         </h3>
                         <div className="flex items-center gap-1.5 text-white/50">
                             <span className="text-[10px] font-bold font-mono truncate tracking-wider uppercase">
                                 {character.location.name}
                             </span>
                         </div>
                    </div>

                    {/* Image Section WITH PARALLAX */}
                    <div className="flex-1 relative flex items-center justify-center p-8">
                         <motion.div 
                            className="relative w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                            style={{ 
                                x: imageX, // Apply Parallax X
                                y: imageY, // Apply Parallax Y
                                rotateX: useTransform(rotateX, r => -r), // Counter-rotate slightly to face camera? Or just keep flat? 
                                // Actually, let's just stick to X/Y shifting for the "following" effect.
                                // Adding a slight scaling breathing effect might be nice too.
                                z: 60, // Keep the depth pop
                             }} 
                         >
                             <Image
                                src={character.image}
                                alt={character.name}
                                fill
                                className={`object-contain transition-all duration-500 ${isDead ? 'grayscale opacity-80' : ''}`}
                                sizes="(max-width: 400px) 100vw, 300px"
                             />
                         </motion.div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto h-14 bg-black/60 backdrop-blur-md border-t border-white/10 flex items-center divide-x divide-white/10 relative z-20 w-full">
                        
                        {/* Slot 1: Status */}
                        <div className="flex-1 h-full flex items-center justify-between px-4 bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className={`
                                    relative w-8 h-8 rounded-lg flex items-center justify-center
                                    ${isAlive ? 'bg-green-500 text-green-950' : isDead ? 'bg-red-500 text-red-950' : 'bg-slate-700 text-white'}
                                `}>
                                    {isAlive && <Heart className="w-5 h-5 fill-current" />}
                                    {isDead && <Skull className="w-6 h-6" strokeWidth={2.5} />}
                                    {!isAlive && !isDead && <Crosshair className="w-5 h-5" />}
                                    
                                    {/* Pulse Effect */}
                                    {isAlive && <div className="absolute inset-0 rounded-lg bg-green-500 animate-ping opacity-30" />}
                                </div>
                                
                                <span className={`text-xs font-black uppercase tracking-widest ${isAlive ? 'text-green-400' : isDead ? 'text-red-400' : 'text-white/60'}`}>
                                    {character.status}
                                </span>
                            </div>
                        </div>

                        {/* Slot 2: Species */}
                        <div className="w-16 h-full flex items-center justify-center relative overflow-hidden group/species">
                             <div className={`absolute inset-0 opacity-10 ${theme.primary} group-hover/species:opacity-20 transition-opacity`} />
                             <div className={`p-1.5 rounded-md ${theme.primary} shadow-lg`}>
                                 {theme.icon}
                             </div>
                        </div>

                    </div>
                </div>
            </div>

        </motion.div>
    </motion.div>
  );
}
