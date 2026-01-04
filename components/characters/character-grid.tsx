import { CharacterCard } from './character-card';
import { CharacterSkeleton } from './character-skeleton';
import { Character } from './character.types';

interface CharacterGridProps {
  characters: Character[];
  loading: boolean;
  onCharacterClick: (id: string) => void;
}

export function CharacterGrid({ characters, loading, onCharacterClick }: CharacterGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <CharacterSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          onClick={() => onCharacterClick(character.id)}
        />
      ))}
    </div>
  );
}
