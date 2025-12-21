import { AppRoutes } from "@/routes/Routes";
import { Toaster } from '@/components/atom/Toaster';

function App() {
  return (
    <div className="app">
      <AppRoutes />
      <Toaster richColors visibleToasts={1} />
    </div>
  );
}

export default App;
