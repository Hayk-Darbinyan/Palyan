import { keepPreviousData, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/axios";

interface NewsFeature {
  id: number;
  news_id: number;
  title: {
    en: string;
    ru: string;
    hy: string;
  };
  description: {
    en: string;
    ru: string;
    hy: string;
  };
}

interface GetNewsResponse {
  id: number;
  title: {
    en: string;
    ru: string;
    hy: string;
  };
  image_url: null;
  author_id: null;
  published_at: string;
  created_at: string;
  updated_at: string;
  description: {
    en: string;
    ru: string;
    hy: string;
  };
  features: NewsFeature[];
}

export const useGetNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: async (): Promise<GetNewsResponse[]> => {
      const response = await api.get("/news");
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useGetNewsById = (id: number) => {
  return useQuery<GetNewsResponse>({
    queryKey: ["news", id],
    queryFn: async () => {
      const { data } = await api.get(`/news/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newNews: Partial<GetNewsResponse>) => {
      const response = await api.post("/news", newNews);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
};

export const useUpdateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...news }: Partial<GetNewsResponse> & { id: number }) => {
      const response = await api.put(`/news/${id}`, news);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      queryClient.invalidateQueries({ queryKey: ["news", data.id] });
    },
  });
};

export const useDeleteNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/news/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
};
