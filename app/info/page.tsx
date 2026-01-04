'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CharacterGrid } from '@/components/characters/character-grid';
import { Pagination } from '@/components/characters/pagination';
import { CharacterModal } from '@/components/characters/character-modal';
import { useCharacterData } from '@/components/characters/use-character-data.hooks';
import { useUserContext } from '@/components/auth/user-context';

export default function InfoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated } = useUserContext();

  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const { data, loading, error } = useCharacterData(currentPage);

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-destructive">Error loading characters. Please try again.</p>
      </div>
    );
  }

  const characters = data?.characters?.results || [];
  const totalPages = data?.characters?.info?.pages || 1;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Characters</h1>
        <p className="text-muted-foreground">
          Page {currentPage} of {totalPages} • {data?.characters?.info?.count || 0} total
        </p>
      </div>

      <CharacterGrid
        characters={characters}
        loading={loading}
        onCharacterClick={setSelectedCharacterId}
      />

      <Pagination currentPage={currentPage} totalPages={totalPages} />

      <CharacterModal
        characterId={selectedCharacterId}
        isOpen={!!selectedCharacterId}
        onClose={() => setSelectedCharacterId(null)}
      />
    </div>
  );
}
