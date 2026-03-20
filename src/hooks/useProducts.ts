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

export const useGetProducts = (
  page: number = 1,
  filters?: {
    category_id?: number | null;
    subcategory_id?: number[] | null;
    manufacturers?: string[] | null;
  }
) => {
  return useQuery({
    queryKey: ["products", page, filters],
    queryFn: async () => {
      const params: Record<string, string | number | null | undefined> = { page, limit: 24 };
      
      if (filters?.category_id) {
        params.category_id = filters.category_id;
      }
      
      if (filters?.subcategory_id && filters.subcategory_id.length > 0) {
        // Pass as comma-separated or multiple params depending on backend
        // Here we'll try passing the first one or comma-separated if supported
        params.subcategory_id = filters.subcategory_id.join(',');
      }
      
      if (filters?.manufacturers && filters.manufacturers.length > 0) {
        params.manufacturer = filters.manufacturers.join(',');
      }

      const response = await api.get<PaginatedResponse<Product>>("/products", {
        params,
      });
      console.log(response.data);
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
