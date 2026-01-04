import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Character } from './character.types';

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

export function CharacterCard({ character, onClick }: CharacterCardProps) {
  const statusColors: Record<Character['status'], string> = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-500',
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <img
        src={character.image}
        alt={character.name}
        className="w-full aspect-square object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg">{character.name}</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className={statusColors[character.status]}>
            {character.status}
          </Badge>
          <span className="text-sm text-muted-foreground">{character.species}</span>
        </div>
      </div>
    </Card>
  );
}
