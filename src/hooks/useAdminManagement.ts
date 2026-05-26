import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/axios";
import type { User } from "@/types/admin";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const response = await api.get<User[] | { items: User[] } | { data: User[] }>("/admin/users");
      // Handle various response structures
      if (Array.isArray(response.data)) {
        return response.data;
      }
      if (response.data && typeof response.data === 'object') {
        if ('items' in response.data && Array.isArray(response.data.items)) {
          return response.data.items;
        }
        if ('data' in response.data && Array.isArray(response.data.data)) {
          return response.data.data;
        }
        if ('users' in response.data && Array.isArray(response.data.users)) {
          return response.data.users;
        }
      }
      return [];
    },
  });
};

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: Omit<User, 'id' | 'is_super_admin'> & { password: string }) => {
      const response = await api.post("/admin/create-admin", userData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
};

export const useAssignSuperAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (username: string) => {
      const formData = new URLSearchParams();
      formData.append("username", username);
      const response = await api.post("/admin/assign-super-admin", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/admin/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
};
