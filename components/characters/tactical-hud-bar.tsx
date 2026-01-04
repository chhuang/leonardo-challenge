import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Skull, User, Zap, Loader2 } from 'lucide-react';
import { FilterState } from './character-filters';
import { UserProfile } from '@/components/auth/user-profile';

interface TacticalHudBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalCount: number;
  loading: boolean;
}

export function TacticalHudBar({
  filters,
  onFilterChange,
  currentPage,
  totalPages,
  onPageChange,
  totalCount,
  loading,
}: TacticalHudBarProps) {

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

  // Theme color based on Species settings
  const accentColor = filters.species === 'Human' ? 'emerald' : 'fuchsia';
  const accentText = filters.species === 'Human' ? 'text-emerald-500' : 'text-fuchsia-500';
  const accentBorder = filters.species === 'Human' ? 'border-emerald-500/50' : 'border-fuchsia-500/50';
  const accentBg = filters.species === 'Human' ? 'bg-emerald-500' : 'bg-fuchsia-500';

  return (
    <div className="hidden md:flex fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4 pointer-events-none justify-center">
        
        {/* Main HUD Container */}
        <div className="w-full max-w-6xl pointer-events-auto">
            
            <div className="flex items-end gap-2 mb-2 px-2 opacity-80">
                <div className={`h-1 w-16 ${accentBg} transition-colors duration-500`} />
                <div className="h-[1px] flex-1 bg-white/20" />
                <div className="text-[10px] font-mono tracking-widest text-white/50 lowercase italic">challenge_v3.5</div>
            </div>

            <div className="bg-[#020904]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center justify-between p-3 relative overflow-hidden group">
                
                {/* Background Tech Grid */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                {/* LEFT: FILTER GROUPS */}
                <div className="flex items-center gap-1 relative z-10 pl-2">
                    {/* SPECIES GROUP */}
                    <div className="flex bg-white/5 p-1 rounded-xl gap-1 border border-white/5">
                        <button
                            onClick={() => setSpecies('Human')}
                            className={`flex flex-col items-center justify-center min-w-[80px] py-1.5 rounded-lg transition-all ${filters.species === 'Human' ? 'bg-emerald-500 text-emerald-950' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                        >
                            <User className={`w-3.5 h-3.5 mb-0.5 ${filters.species === 'Human' ? 'fill-current' : ''}`} />
                            <span className="text-[9px] font-bold uppercase tracking-widest">Humans</span>
                        </button>
                        <button
                            onClick={() => setSpecies('Alien')}
                            className={`flex flex-col items-center justify-center min-w-[80px] py-1.5 rounded-lg transition-all ${filters.species === 'Alien' ? 'bg-fuchsia-500 text-fuchsia-950' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                        >
                            <span className="text-xs leading-none mb-0.5">👽</span>
                            <span className="text-[9px] font-bold uppercase tracking-widest">Aliens</span>
                        </button>
                    </div>

                    <div className="h-8 w-[1px] bg-white/10 mx-1" />

                    {/* STATUS GROUP */}
                    <div className="flex bg-white/5 p-1 rounded-xl gap-1 border border-white/5">
                        <button
                            onClick={() => setStatus('Alive')}
                            className={`flex flex-col items-center justify-center min-w-[80px] py-1.5 rounded-lg transition-all ${filters.status === 'Alive' ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 'text-white/40 border border-transparent hover:text-white hover:bg-white/5'}`}
                        >
                            <Heart className={`w-3.5 h-3.5 mb-0.5 ${filters.status === 'Alive' ? 'fill-current' : ''}`} />
                            <span className="text-[9px] font-bold uppercase tracking-widest">Alive</span>
                        </button>
                        <button
                            onClick={() => setStatus('Dead')}
                            className={`flex flex-col items-center justify-center min-w-[80px] py-1.5 rounded-lg transition-all ${filters.status === 'Dead' ? 'bg-white/10 text-white border border-white/30' : 'text-white/40 border border-transparent hover:text-white hover:bg-white/5'}`}
                        >
                            <Skull className="w-3.5 h-3.5 mb-0.5" strokeWidth={2.5} />
                            <span className="text-[9px] font-bold uppercase tracking-widest">Dead</span>
                        </button>
                    </div>
                </div>

                {/* CENTER: PAGINATION */}
                <div className="flex items-center gap-6 border-l border-r border-white/10 px-12 mx-auto">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage <= 1 || loading}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 disabled:opacity-20 transition-all text-white border border-white/10"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex flex-col items-center min-w-[100px]">
                        <div className="flex items-baseline gap-2 font-mono text-xl font-black text-white">
                             {loading ? "..." : (
                                <>
                                    <span>{currentPage.toString().padStart(2, '0')}</span>
                                    <span className="text-white/20">/</span>
                                    <span className="text-white/20">{totalPages.toString().padStart(2, '0')}</span>
                                </>
                             )}
                        </div>
                    </div>

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages || loading}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 disabled:opacity-20 transition-all text-white border border-white/10"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* RIGHT: COUNT & SYSTEM INFO */}
                <div className="flex items-center gap-8 pr-8 pl-4">
                    <div className="flex flex-col items-end">
                       <div className="flex items-baseline gap-3 font-mono text-xl font-black text-white">
                           {totalCount.toLocaleString()}
                           <span className={`uppercase font-black tracking-tighter ${accentText}`}>{filters.species === 'Alien' ? 'ALIENS' : 'HUMANS'}</span>
                       </div>
                    </div>
                </div>

                {/* Decorative End Accent */}
                <div className={`absolute top-0 right-0 h-full w-1 ${accentBg} opacity-20`} />
            </div>
        </div>
    </div>
  );

}
