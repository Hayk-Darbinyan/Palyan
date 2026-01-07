import { useState, useEffect } from "react";
import { Package, Newspaper, List, Plus, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "./admin/AuthModal";
import AddProductForm from "./admin/AddProductForm";
import AddNewsForm from "./admin/AddNewsForm";
import ProductList from "./admin/ProductList";
import NewsList from "./admin/NewsList";
import type { Product } from "@/types/product";
import type { News } from "@/types/admin";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "news">("products");
  const [activeView, setActiveView] = useState<"list" | "add" | "edit">("list");
  const [selectedItem, setSelectedItem] = useState<Product | News | null>(null);

  // Show auth modal if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [isAuthenticated, loading, setShowAuthModal]);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleEdit = (item: Product | News) => {
    setSelectedItem(item);
    setActiveView("edit");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => {
            setShowAuthModal(false);
            navigate("/");
          }}
          onSuccess={handleAuthSuccess}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logout */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#404A3D]">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage products and news articles
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
              activeTab === "products"
                ? "bg-[#0E99A2] text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("products")}
          >
            <Package className="w-5 h-5" />
            Products
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
              activeTab === "news"
                ? "bg-[#0E99A2] text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("news")}
          >
            <Newspaper className="w-5 h-5" />
            News
          </button>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex gap-2">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeView === "list"
                  ? "bg-[#404A3D] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveView("list")}
            >
              <List className="w-4 h-4" />
              List
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeView === "add"
                  ? "bg-[#5B8C51] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => {
                setSelectedItem(null);
                setActiveView("add");
              }}
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>
        </div>

        {/* Content */}
        <div>
          {activeView === "list" && activeTab === "products" && (
            <ProductList onEdit={handleEdit} />
          )}

          {activeView === "list" && activeTab === "news" && (
            <NewsList onEdit={handleEdit} />
          )}

          {activeView === "add" && activeTab === "products" && (
            <AddProductForm />
          )}

          {activeView === "add" && activeTab === "news" && <AddNewsForm />}

          {activeView === "edit" &&
            activeTab === "products" &&
            selectedItem && (
              <AddProductForm product={selectedItem as Product} />
            )}

          {activeView === "edit" && activeTab === "news" && selectedItem && (
            <AddNewsForm news={selectedItem as News} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
