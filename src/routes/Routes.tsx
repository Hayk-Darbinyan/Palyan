import { useCategories } from "@/hooks/useCategories";
import { lazy } from "react";
import {
  Route,
  Routes,
  BrowserRouter,
  type BrowserRouterProps,
} from "react-router";

const Home = lazy(() => import("@/components/pages/Home"));
const Catalog = lazy(() => import("@/components/pages/Catalog"));
const ProductDetails = lazy(() => import("@/components/pages/ProductDetails"));
const CartPage = lazy(() => import("@/components/pages/CartPage"));
const News = lazy(() => import("@/components/pages/News"));
const NewsDetails = lazy(() => import("@/components/pages/NewsDetails"));
const AdminDashboard = lazy(() => import("@/components/pages/AdminDashboard"));
const FAQ = lazy(() => import("@/components/pages/FAQ"));

interface AppRoutesProps {
  Router?: React.ComponentType<BrowserRouterProps>;
}

export const AppRoutes = ({ Router = BrowserRouter }: AppRoutesProps) => {
  useCategories();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  );
};
