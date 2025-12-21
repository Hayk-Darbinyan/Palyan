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

interface AppRoutesProps {
  Router?: React.ComponentType<BrowserRouterProps>;
}

export const AppRoutes = ({ Router = BrowserRouter }: AppRoutesProps) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
};
