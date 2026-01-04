'use client';

import { UserProfile } from '@/components/auth/user-profile';

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-[100] h-20 md:h-24 flex items-center overflow-hidden">
      {/* Top HUD Shadow/Gradient for legibility */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020904] to-transparent opacity-80" />

      {/* Background HUD Grid - Subtle at top */}
      <div className="absolute inset-x-0 top-0 h-24 opacity-[0.05]"
           style={{ 
               backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 1px, transparent 1px)', 
               backgroundSize: '15px 15px' 
           }} 
      />
      
      {/* Top Accent Line (Minimal) */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="container mx-auto px-4 flex items-center justify-between relative z-10 w-full pointer-events-auto">
        {/* LEFT: Branding & HUD Identifier */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col scale-90 md:scale-100 origin-left">
            <span className="hidden md:block text-[10px] font-mono text-emerald-500/40 uppercase tracking-[0.4em] leading-none mb-1">Central Intelligence Agency</span>
            <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    <span className="text-emerald-500">Rick</span>
                    <span className="opacity-40">&</span>
                    <span>Morty</span>
                </h1>
                <div className="h-4 w-[1px] bg-white/10 mx-1" />
                <span className="text-[9px] md:text-[11px] font-mono text-emerald-500/60 uppercase tracking-widest font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Explorer_v2.0</span>
            </div>
          </div>

          {/* HUD FLAVOR TEXT - Hidden on Mobile */}
          <div className="hidden lg:flex items-center gap-8 border-l border-white/5 pl-8 opacity-40">
            <div className="flex flex-col gap-1">
               <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.2em] leading-none">System_Status</span>
               <div className="flex gap-1">
                  <div className="w-3 h-1 bg-emerald-500/40" />
                  <div className="w-3 h-1 bg-emerald-500/40" />
                  <div className="w-3 h-1 bg-emerald-500/20" />
                  <div className="w-1.5 h-1 bg-white/5" />
               </div>
            </div>
            <div className="flex flex-col gap-0.5">
               <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.2em] leading-none">Sector_Coords</span>
               <span className="text-[10px] font-mono text-emerald-500/40 font-bold">C-137 // GF-9</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Floating User Module (Hidden on Mobile, now in Bottom Nav) */}
        <div className="hidden md:flex items-center">
            <UserProfile />
        </div>
      </div>
    </header>
  );
}
