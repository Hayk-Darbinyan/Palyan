


import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { api } from '@/api/axios';
// Alternative: if using newer TanStack Query syntax
export function useCategories() {
  const setBackendCategories = useCategoryStore((state) => state.setBackendCategories);
  
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get("/categories");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  useEffect(() => {
    if (query.data) {
      setBackendCategories(query.data);
    }
  }, [query.data, setBackendCategories]);

  return query;
}