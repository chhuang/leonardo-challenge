import { useQuery } from '@apollo/client';
import { GET_MULTIVERSE_STATS } from '@/lib/graphql/queries';

export interface MultiverseStats {
  total: number;
  humans: number;
  aliens: number;
  alive: number;
  dead: number;
  unknown: number;
}

export function useMultiverseStats() {
  const { data, loading, error } = useQuery(GET_MULTIVERSE_STATS);

  const stats: MultiverseStats = {
    total: data?.total?.info?.count || 0,
    humans: data?.humans?.info?.count || 0,
    aliens: data?.aliens?.info?.count || 0,
    alive: data?.alive?.info?.count || 0,
    dead: data?.dead?.info?.count || 0,
    unknown: data?.unknown?.info?.count || 0,
  };

  return {
    stats,
    loading,
    error,
  };
}
