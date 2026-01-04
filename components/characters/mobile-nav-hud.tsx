'use client';

import { motion } from 'framer-motion';
import { User, Heart, Skull, Zap } from 'lucide-react';
import { FilterState } from './character-filters';
import { UserProfile } from '@/components/auth/user-profile';

interface MobileNavHudProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function MobileNavHud({
  filters,
  onFilterChange,
}: MobileNavHudProps) {

  const setStatus = (status: '' | 'Alive' | 'Dead') => {
    if (filters.status === status) {
        onFilterChange({ ...filters, status: '' });
    } else {
        onFilterChange({ ...filters, status });
    }
  };

  const setSpecies = (species: 'Human' | 'Alien') => {
     onFilterChange({ ...filters, species });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4 pointer-events-none flex justify-center">
        <div className="w-full pointer-events-auto bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-2 relative overflow-hidden">
            
            {/* Background Tech Grid */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none" />

            <div className="flex items-center justify-between gap-2 relative z-10">
                
                {/* GROUP 1: SPECIES */}
                <div className="flex bg-white/5 p-1 rounded-2xl flex-[2] gap-1 border border-white/5">
                    <button
                        onClick={() => setSpecies('Human')}
                        className={`flex flex-col items-center justify-center rounded-xl transition-all flex-1 h-14 ${filters.species === 'Human' ? 'bg-emerald-500 text-emerald-950 font-black' : 'text-white/40'}`}
                    >
                        <User className="w-4 h-4 fill-current mb-1" />
                        <span className="text-[8px] uppercase tracking-tighter leading-none">Humans</span>
                    </button>

                    <button
                        onClick={() => setSpecies('Alien')}
                        className={`flex flex-col items-center justify-center rounded-xl transition-all flex-1 h-14 ${filters.species === 'Alien' ? 'bg-fuchsia-500 text-fuchsia-950 font-black' : 'text-white/40'}`}
                    >
                        <span className="text-sm leading-none mb-1">👽</span>
                        <span className="text-[8px] uppercase tracking-tighter leading-none">Aliens</span>
                    </button>
                </div>

                {/* GROUP 2: STATUS */}
                <div className="flex bg-white/5 p-1 rounded-2xl flex-[2] gap-1 border border-white/5">
                    <button
                        onClick={() => setStatus('Alive')}
                        className={`flex flex-col items-center justify-center rounded-xl transition-all flex-1 h-14 ${filters.status === 'Alive' ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 'text-white/40 border border-transparent'}`}
                    >
                        <Heart className={`w-4 h-4 mb-1 ${filters.status === 'Alive' ? 'fill-current' : ''}`} />
                        <span className="text-[8px] uppercase tracking-tighter leading-none">Alive</span>
                    </button>

                    <button
                        onClick={() => setStatus('Dead')}
                        className={`flex flex-col items-center justify-center rounded-xl transition-all flex-1 h-14 ${filters.status === 'Dead' ? 'bg-white/10 text-white border border-white/30' : 'text-white/40 border border-transparent'}`}
                    >
                        <Skull className="w-4 h-4 mb-1" strokeWidth={2.5} />
                        <span className="text-[8px] uppercase tracking-tighter leading-none">Dead</span>
                    </button>
                </div>

                {/* PROFILE TAB */}
                <div className="flex-1 flex flex-col items-center justify-center">
                    <UserProfile isMobileTab={true} />
                </div>
            </div>
        </div>
    </div>
  );
}
