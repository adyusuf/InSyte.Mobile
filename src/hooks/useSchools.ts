import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { School, ApiResponse, PagedResult } from '../types';
import { apiEndpoints } from '../lib/endpoints';

export function useSchools(search?: string, page: number = 1, pageSize: number = 20) {
  return useQuery({
    queryKey: ['schools', search, page],
    queryFn: async () => {
      const response = await api.get<ApiResponse<PagedResult<School>>>(
        apiEndpoints.schools.list,
        {
          params: {
            search: search || undefined,
            page,
            pageSize,
          },
        }
      );
      return response.data.data;
    },
  });
}

export function useSchool(id: string) {
  return useQuery({
    queryKey: ['school', id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<School>>(
        apiEndpoints.schools.detail(id)
      );
      return response.data.data;
    },
  });
}

export function useCreateSchool() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<School, 'id' | 'createdAt'>) => {
      const response = await api.post<ApiResponse<School>>(
        apiEndpoints.schools.list,
        data
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schools'] });
    },
  });
}
