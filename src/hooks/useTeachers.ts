import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { Teacher, ApiResponse } from '../types';
import { apiEndpoints } from '../lib/endpoints';

export function useTeachers(search?: string) {
  return useQuery({
    queryKey: ['teachers', search],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Teacher[]>>(
        apiEndpoints.teachers.list,
        {
          params: {
            search: search || undefined,
          },
        }
      );
      return response.data.data;
    },
  });
}

export function useTeacher(id: string) {
  return useQuery({
    queryKey: ['teacher', id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Teacher>>(
        apiEndpoints.teachers.detail(id)
      );
      return response.data.data;
    },
  });
}
