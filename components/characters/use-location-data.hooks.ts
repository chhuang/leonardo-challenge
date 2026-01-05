import { useQuery } from '@apollo/client';
import { GET_LOCATIONS_WITH_RESIDENTS } from '@/lib/graphql/queries';

export interface LocationWithResidents {
  id: string;
  name: string;
  residents: {
    id: string;
    image: string;
  }[];
}

export function useLocationData() {
  const { data, loading, error } = useQuery(GET_LOCATIONS_WITH_RESIDENTS, {
    variables: { page: 1 }, // We'll start with first page or we could fetch all if needed
  });

  return {
    locations: (data?.locations?.results || []) as LocationWithResidents[],
    info: data?.locations?.info,
    loading,
    error,
  };
}
