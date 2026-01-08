import { keepPreviousData, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/axios";

interface NewsFeature {
  id: number | string;
  news_id?: number | string;
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

interface NewsAuthor {
  bio: {
    hy: string;
    ru: string;
    en: string;
  };
  image: string;
  name: {
    hy: string;
    ru: string;
    en: string;
  };
  position: {
    hy: string;
    ru: string;
    en: string;
  };
}

interface GetNewsResponse {
  id: number;
  title: {
    en: string;
    ru: string;
    hy: string;
  };
  image_url: string | null;
  author: NewsAuthor;
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

interface CreateNewsPayload {
  title: {
    en: string;
    ru: string;
    hy: string;
  };
  image_url: string;
  author: NewsAuthor;
  published_at: string;
  features: Omit<NewsFeature, "id" | "news_id">[];
}

interface UpdateNewsPayload extends CreateNewsPayload {
  id: string | number;
}

export type { NewsFeature, NewsAuthor, GetNewsResponse, CreateNewsPayload, UpdateNewsPayload };

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
    mutationFn: async (newNews: CreateNewsPayload) => {
      const response = await api.post("/admin/news", newNews);
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
    mutationFn: async ({ id, ...news }: UpdateNewsPayload) => {
      const response = await api.put(`/admin/news/${id}`, news);
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
      await api.delete(`/admin/news/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
};
