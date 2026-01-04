'use client';

import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '@/lib/graphql/queries';
import { useUserContext } from '@/components/auth/user-context';
import { CharactersData } from '@/lib/graphql/graphql.types';

export function useCharacterData(page: number) {
  const { isAuthenticated } = useUserContext();

  return useQuery<CharactersData>(GET_CHARACTERS, {
    variables: { page },
    skip: !isAuthenticated, // Don't fetch until authenticated
  });
}
