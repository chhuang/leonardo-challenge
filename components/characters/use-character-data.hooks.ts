'use client';

import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '@/lib/graphql/queries';
import { useUserContext } from '@/components/auth/user-context';
import { CharactersData } from '@/lib/graphql/graphql.types';

export function useCharacterData(page: number, species?: string, status?: string) {
  const { isAuthenticated } = useUserContext();

  return useQuery<CharactersData>(GET_CHARACTERS, {
    variables: { 
      page,
      filter: {
        ...(species ? { species } : {}),
        ...(status ? { status } : {})
      }
    },
    skip: !isAuthenticated,
  });
}
