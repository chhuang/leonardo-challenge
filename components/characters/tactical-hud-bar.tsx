import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Skull, User, Zap, Loader2 } from 'lucide-react';
import { FilterState } from './character-filters';

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
    <div className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4 pt-0 pointer-events-none flex justify-center">
        
        {/* Main HUD Container */}
        <div className="w-full max-w-5xl pointer-events-auto">
            
            {/* Decorative Top Line */}
            <div className="flex items-end gap-2 mb-2 px-2 opacity-80">
                <div className={`h-1 w-16 ${accentBg} transition-colors duration-500`} />
                <div className="h-[1px] flex-1 bg-white/20" />
                <div className="text-[10px] font-mono tracking-widest text-white/50">SYSTEM.UI.V2</div>
            </div>

            <div className="bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between p-2 md:p-3 gap-4 relative overflow-hidden group transition-all duration-500">
                
                {/* Background Tech Grid */}
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                {/* LEFT: Species Selector & Count */}
                <div className="flex items-center gap-3 pl-2 md:pl-4 md:pr-6 md:border-r border-white/10 w-full md:w-auto justify-center md:justify-start">
                    
                    {/* Species Toggle Group */}
                    <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                        <button
                            onClick={() => setSpecies('Human')}
                            className={`p-2 rounded-md transition-all ${filters.species === 'Human' ? 'bg-emerald-500 text-emerald-950 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'text-white/40 hover:text-white'}`}
                        >
                            <User className="w-4 h-4 fill-current" />
                        </button>
                        <button
                            onClick={() => setSpecies('Alien')}
                            className={`p-2 rounded-md transition-all flex items-center justify-center w-8 h-8 ${filters.species === 'Alien' ? 'bg-fuchsia-500 text-fuchsia-950 shadow-[0_0_10px_rgba(232,121,249,0.4)]' : 'text-white/40 hover:text-white'}`}
                        >
                            <span className="text-sm leading-none">👽</span>
                        </button>
                    </div>

                    <div className="h-6 w-[1px] bg-white/10 mx-2" />

                    {/* Count Display */}
                    <div className="flex items-baseline gap-2 min-w-[80px] font-mono text-lg font-bold text-white/80">
                         {loading ? (
                             <Loader2 className="w-4 h-4 animate-spin text-white/30" />
                         ) : (
                             <span>
                                 {totalCount}
                             </span>
                         )}
                         <span className="text-white/30 uppercase">
                             {filters.species === 'Alien' ? 'Aliens' : 'Humans'}
                         </span>
                    </div>
                </div>

                {/* CENTER: Pagination Controls */}
                <div className="flex items-center gap-4 mx-auto">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage <= 1 || loading}
                        className="p-2 rounded-full hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-colors text-white"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="flex items-center justify-center min-w-[60px]">
                        <div className="flex items-baseline gap-1 font-mono text-lg font-bold text-white/80">
                             {loading ? (
                                 <span className="text-white/30 animate-pulse">...</span>
                             ) : (
                                <>
                                    <span>{currentPage}</span>
                                    <span className="text-white/30">/</span>
                                    <span className="text-white/30">{totalPages}</span>
                                </>
                             )}
                        </div>
                    </div>

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages || loading}
                        className="p-2 rounded-full hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-colors text-white"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* RIGHT: Status Toggles */}
                <div className="flex items-center gap-2 md:pr-2 w-full md:w-auto justify-center md:justify-end border-t md:border-t-0 border-white/5 pt-2 md:pt-0">
                    {/* ALIVE Toggle */}
                    <button
                        onClick={() => setStatus('Alive')}
                        className={`
                            relative px-4 py-2 rounded-lg border flex items-center gap-2 transition-all flex-1 md:flex-none justify-center
                            ${filters.status === 'Alive' 
                                ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                                : 'bg-transparent border-white/10 text-white/40 hover:text-white hover:border-white/30'}
                        `}
                    >
                        <Heart className={`w-4 h-4 ${filters.status === 'Alive' ? 'fill-current' : ''}`} />
                        <span className="text-xs font-bold uppercase tracking-wider">Alive</span>
                    </button>

                    {/* DEAD Toggle */}
                    <button
                        onClick={() => setStatus('Dead')}
                        className={`
                            relative px-4 py-2 rounded-lg border flex items-center gap-2 transition-all flex-1 md:flex-none justify-center
                            ${filters.status === 'Dead' 
                                ? 'bg-zinc-700/50 border-white/50 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] grayscale' 
                                : 'bg-transparent border-white/10 text-white/40 hover:text-white hover:border-white/30'}
                        `}
                    >
                        <Skull className="w-4 h-4" strokeWidth={2.5} />
                        <span className="text-xs font-bold uppercase tracking-wider">Dead</span>
                    </button>
                </div>

                {/* Decorative Corner Accents */}
                <div className={`absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 ${accentBorder} transition-colors duration-500`} />
                <div className={`absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 ${accentBorder} transition-colors duration-500`} />

            </div>
        </div>
    </div>
  );
}
