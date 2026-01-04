export interface Character {
  id: string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { name: string };
  episode: { id: string }[];
}

export interface CharacterDetail extends Character {
  origin: { name: string; type: string; dimension: string };
  location: { name: string; type: string; dimension: string };
  created: string;
  episode: Array<{ id: string; name: string; episode: string }>;
}
