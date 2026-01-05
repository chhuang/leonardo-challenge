'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TacticalLoader } from '@/components/characters/tactical-loader';
import { CharacterCollectibleCard } from '@/components/characters/character-collectible-card';
import { TacticalHudBar } from '@/components/characters/tactical-hud-bar';
import { MobileNavHud } from '@/components/characters/mobile-nav-hud';
import { CharacterFilters, FilterState } from '@/components/characters/character-filters';
import { useCharacterData } from '@/components/characters/use-character-data.hooks';
import { useUserContext } from '@/components/auth/user-context';
import { CharacterCollectibleModal } from '@/components/characters/character-collectible-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function InfoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated } = useUserContext();

  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  const [allCharacters, setAllCharacters] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect Mobile for UI logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Default to Human as per Hero Banner design
  const [filters, setFilters] = useState<FilterState>({
    species: 'Human',
    status: '',
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setAllCharacters([]); // Reset list on filter change
    router.push('/info?page=1');
  };

  const handlePageChange = (page: number) => {
    if (!isMobile) {
        setAllCharacters([]); // Reset for pagination on desktop (optional, depends on if we want to scroll back to top)
    }
    router.push(`/info?page=${page}`);
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Fetch data with server-side filters
  const { data, loading, error } = useCharacterData(currentPage, filters.species, filters.status);

  // Merge characters for Infinite Scroll on Mobile
  useEffect(() => {
    if (data?.characters?.results) {
        if (isMobile) {
            setAllCharacters(prev => {
                const newResults = data.characters.results.filter(
                    (nr: any) => !prev.some(pr => pr.id === nr.id)
                );
                return [...prev, ...newResults];
            });
        } else {
            setAllCharacters(data.characters.results);
        }
    }
  }, [data, isMobile, filters]);

  if (!isAuthenticated) return null;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
         Error loading character data.
      </div>
    );
  }

  const totalPages = data?.characters?.info?.pages || 1;
  const totalCount = data?.characters?.info?.count || 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-32">
       
       <div className="container mx-auto px-4 pt-24 md:pt-32 pb-8 max-w-7xl">
         
         {/* Grid Content */}
          <AnimatePresence mode="popLayout">
            <motion.div
                key={filters.species + filters.status + (isMobile ? 'mobile' : currentPage)}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                {loading && allCharacters.length === 0 ? (
                  <TacticalLoader fullScreen />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {allCharacters.map((character, index) => (
                      <CharacterCollectibleCard
                        key={character.id}
                        character={character}
                        onClick={() => setSelectedCharacterId(character.id)}
                        index={index}
                      />
                    ))}
                  </div>
                )}
            </motion.div>
          </AnimatePresence>

         {/* INFINITE SCROLL SENTINEL (MOBILE ONLY) */}
         {isMobile && currentPage < totalPages && (
            <div 
                className="h-20 flex items-center justify-center"
                ref={(el) => {
                    if (el && !loading) {
                        const observer = new IntersectionObserver((entries) => {
                            if (entries[0].isIntersecting) {
                                handlePageChange(currentPage + 1);
                                observer.disconnect();
                            }
                        });
                        observer.observe(el);
                    }
                }}
            >
                {loading && <Loader2 className="w-6 h-6 animate-spin text-emerald-500/50" />}
            </div>
         )}
         
       </div>

      {/* FIXED TACTICAL HUD */}
      {!selectedCharacterId && (
        <>
          <TacticalHudBar 
              filters={filters}
              onFilterChange={handleFilterChange}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalCount={totalCount}
              loading={loading}
          />
          <MobileNavHud 
              filters={filters}
              onFilterChange={handleFilterChange}
          />
        </>
      )}

      {/* Collectible Modal */}
      <CharacterCollectibleModal
        characterId={selectedCharacterId}
        isOpen={!!selectedCharacterId}
        onClose={() => setSelectedCharacterId(null)}
      />
    </div>
  );
}
