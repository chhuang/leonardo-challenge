'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MasonryGrid } from '@/components/characters/masonry-grid';
import { TacticalHudBar } from '@/components/characters/tactical-hud-bar';
import { CharacterFilters, FilterState } from '@/components/characters/character-filters';
import { useCharacterData } from '@/components/characters/use-character-data.hooks';
import { useUserContext } from '@/components/auth/user-context';
import { CharacterCollectibleModal } from '@/components/characters/character-collectible-modal';
import { motion, AnimatePresence } from 'framer-motion';

export default function InfoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated } = useUserContext();

  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  // Default to Human as per Hero Banner design
  const [filters, setFilters] = useState<FilterState>({
    species: 'Human',
    status: '',
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Reset to page 1 when deep filters change
    if (newFilters.species !== filters.species) {
        router.push('/info?page=1');
    }
  };

  const handlePageChange = (page: number) => {
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

  if (!isAuthenticated) return null;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
         Error loading character data.
      </div>
    );
  }

  const characters = data?.characters?.results || [];
  const totalPages = data?.characters?.info?.pages || 1;
  const totalCount = data?.characters?.info?.count || 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-32"> {/* Increased padding bottom for HUD */}
       
       <div className="container mx-auto px-4 py-8 max-w-7xl">
         
         {/* Grid Content */}
         <AnimatePresence mode='wait'>
            <motion.div
                key={currentPage + filters.species + filters.status}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                <MasonryGrid
                    characters={characters}
                    loading={loading}
                    onCharacterClick={setSelectedCharacterId}
                />
            </motion.div>
         </AnimatePresence>
         
       </div>

      {/* FIXED TACTICAL HUD */}
      {!selectedCharacterId && (
        <TacticalHudBar 
            filters={filters}
            onFilterChange={handleFilterChange}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalCount={totalCount}
            loading={loading}
        />
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
