'use client';

import { useQuery } from '@apollo/client';
import { GET_CHARACTER } from '@/lib/graphql/queries';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CharacterDetail } from './character.types';

interface CharacterModalProps {
  characterId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CharacterModal({ characterId, isOpen, onClose }: CharacterModalProps) {
  const { data, loading } = useQuery<{ character: CharacterDetail }>(GET_CHARACTER, {
    variables: { id: characterId },
    skip: !characterId,
  });

  const character = data?.character;

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        {loading ? (
          <div className="py-8 text-center">Loading...</div>
        ) : character ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">{character.name}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <img
                src={character.image}
                alt={character.name}
                className="w-full max-w-sm mx-auto rounded-lg"
              />

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">{character.status}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Species</p>
                  <p className="font-medium">{character.species}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium">{character.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{character.type || 'N/A'}</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground">Origin</p>
                <p className="font-medium">{character.origin.name}</p>
                <p className="text-xs text-muted-foreground">
                  {character.origin.type} • {character.origin.dimension}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{character.location.name}</p>
                <p className="text-xs text-muted-foreground">
                  {character.location.type} • {character.location.dimension}
                </p>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-2">Episodes</p>
                <div className="flex flex-wrap gap-1">
                  {character.episode.slice(0, 10).map((ep) => (
                    <Badge key={ep.id} variant="outline">
                      {ep.episode}
                    </Badge>
                  ))}
                  {character.episode.length > 10 && (
                    <Badge variant="outline">+{character.episode.length - 10} more</Badge>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="py-8 text-center text-muted-foreground">Character not found</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
