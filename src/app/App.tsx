import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { AppRoutes } from "@/routes/Routes";
import { Toaster } from "@/components/atom/Toaster";
import { api } from "@/api/axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const prefetchCategories = async () => {
  try {
    await queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: async () => {
        const res = await api.get("/categories");
        return res.data;
      },
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    });
  } catch (error) {
    console.error("Failed to prefetch categories:", error);
  }
};

function App() {
  useEffect(() => {
    // Prefetch categories immediately on app mount
    prefetchCategories();
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <AppRoutes />
          <Toaster richColors visibleToasts={1} />
        </div>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
