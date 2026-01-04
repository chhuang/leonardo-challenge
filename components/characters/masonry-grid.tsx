'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CharacterCollectibleCard } from './character-collectible-card';
import { Character } from './character.types';

interface MasonryGridProps {
  characters: Character[];
  loading: boolean;
  onCharacterClick: (id: string) => void;
}

export function MasonryGrid({
  characters,
  loading,
  onCharacterClick,
}: MasonryGridProps) {
  
  if (loading) {
    return <GridSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence mode="popLayout">
        {characters.map((character, index) => (
          <CharacterCollectibleCard
            key={character.id}
            character={character}
            onClick={() => onCharacterClick(character.id)}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white/5 rounded-3xl aspect-[3/4.2] animate-pulse border border-white/5 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1/2 bg-white/5" />
            <div className="absolute bottom-4 left-4 right-4 h-8 bg-white/10 rounded" />
        </div>
      ))}
    </div>
  );
}
