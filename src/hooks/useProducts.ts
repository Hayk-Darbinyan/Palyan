import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/axios";
import { keepPreviousData } from "@tanstack/react-query";
import type { Product } from "@/types/product";

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export const useGetProducts = (page: number = 1) => {
  return useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Product>>("/products", {
        params: { page, limit: 24 },
      });
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useGetProductById = (id: number) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const response = await api.get(`/products/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProduct: Omit<Product, 'id' | 'created_at'>) => {
      const response = await api.post("/admin/products", newProduct);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...product }: Product) => {
      const response = await api.put(`/admin/products/${id}`, product);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", data.id] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/admin/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
