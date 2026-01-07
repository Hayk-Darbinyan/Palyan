import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "@/routes/Routes";
import { Toaster } from "@/components/atom/Toaster";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <AppRoutes />
        <Toaster richColors visibleToasts={1} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
