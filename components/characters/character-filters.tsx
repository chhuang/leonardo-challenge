'use client';

import { motion } from 'framer-motion';
import { Heart, Skull, Activity, Zap, User } from 'lucide-react';

export interface FilterState {
  species: 'Human' | 'Alien';
  status: '' | 'Alive' | 'Dead';
}

interface CharacterFiltersProps {
  currentFilters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function CharacterFilters({ currentFilters, onFilterChange }: CharacterFiltersProps) {
  
  const setSpecies = (species: 'Human' | 'Alien') => {
    onFilterChange({ ...currentFilters, species });
  };



  return (
    <div className="mb-16 space-y-10">
      {/* Hero Species Selection */}
      <div className="grid grid-cols-2 gap-4 h-64 md:h-80 select-none">
         {/* Human Panel (GREEN THEME) */}
         <motion.div 
            className={`
                relative flex items-center justify-center cursor-pointer overflow-hidden rounded-[2rem] border-4
                ${currentFilters.species === 'Human' ? 'border-emerald-500 shadow-[0_0_50px_-10px_rgba(16,185,129,0.5)]' : 'border-white/10 opacity-60 hover:opacity-100 scale-95 hover:scale-100'}
                transition-all duration-300
            `}
            onClick={() => setSpecies('Human')}
         >
            <div className="absolute inset-0 bg-emerald-950/80 z-0" />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/50 to-teal-400/20 z-0" />
            
            <div className="relative z-10 flex flex-col items-center">
                <User className="w-20 h-20 text-emerald-200 mb-4 drop-shadow-lg" strokeWidth={1.5} />
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-xl">
                    Human
                </h2>
            </div>
         </motion.div>

         {/* Alien Panel (PURPLE THEME) */}
         <motion.div 
            className={`
                relative flex items-center justify-center cursor-pointer overflow-hidden rounded-[2rem] border-4
                ${currentFilters.species === 'Alien' ? 'border-purple-500 shadow-[0_0_50px_-10px_rgba(168,85,247,0.5)]' : 'border-white/10 opacity-60 hover:opacity-100 scale-95 hover:scale-100'}
                transition-all duration-300
            `}
            onClick={() => setSpecies('Alien')}
         >
             <div className="absolute inset-0 bg-purple-950/80 z-0" />
             <div className="absolute inset-0 bg-gradient-to-br from-purple-600/50 to-pink-500/20 z-0" />

             <div className="relative z-10 flex flex-col items-center">
                <div className="text-8xl mb-4 drop-shadow-lg">👽</div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-xl">
                    Alien
                </h2>
            </div>
         </motion.div>
      </div>

    </div>
  );
}

