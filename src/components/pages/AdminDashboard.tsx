import { useState, useEffect } from "react";
import { Package, Newspaper, List, Plus, LogOut, Users, Settings } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "./admin/AuthModal";
import AddProductForm from "./admin/AddProductForm";
import AddNewsForm from "./admin/AddNewsForm";
import ProductList from "./admin/ProductList";
import NewsList from "./admin/NewsList";
import AdminManagement from "./admin/AdminManagement";
import ChangePasswordForm from "./admin/ChangePasswordForm";
import type { Product } from "@/types/product";
import type { News } from "@/types/admin";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading, logout, isSuperAdmin } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "news" | "users" | "settings">("products");
  const [activeView, setActiveView] = useState<"list" | "add" | "edit">("list");
  const [selectedItem, setSelectedItem] = useState<Product | News | null>(null);

  // Show auth modal if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setShowAuthModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loading]);

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

  const showActionBar = activeTab === "products" || activeTab === "news";

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
              {activeTab === "products" && "Manage products catalog"}
              {activeTab === "news" && "Manage news articles"}
              {activeTab === "users" && "System User Management"}
              {activeTab === "settings" && "Account Settings"}
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
          
          {isSuperAdmin && (
            <button
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
                activeTab === "users"
                  ? "bg-[#0E99A2] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("users")}
            >
              <Users className="w-5 h-5" />
              Admins
            </button>
          )}

          <button
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
              activeTab === "settings"
                ? "bg-[#0E99A2] text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>

        {/* Action Bar */}
        {showActionBar && (
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
        )}

        {/* Content */}
        <div>
          {activeTab === "products" && (
            <>
              {activeView === "list" && <ProductList onEdit={handleEdit} />}
              {activeView === "add" && <AddProductForm />}
              {activeView === "edit" && selectedItem && "stock" in selectedItem && (
                <AddProductForm product={selectedItem} />
              )}
            </>
          )}

          {activeTab === "news" && (
            <>
              {activeView === "list" && <NewsList onEdit={handleEdit} />}
              {activeView === "add" && <AddNewsForm />}
              {activeView === "edit" && selectedItem && !("stock" in selectedItem) && (
                <AddNewsForm news={selectedItem as News} />
              )}
            </>
          )}

          {activeTab === "users" && isSuperAdmin && <AdminManagement />}
          
          {activeTab === "settings" && <ChangePasswordForm />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
