import React, { useEffect, useState } from "react";
import { Edit2, Trash2, Eye, Calendar, Loader } from "lucide-react";
import { useGetProducts, useDeleteProduct } from "@/hooks/useProducts";
import type { Product } from "@/types/product";

interface ProductListProps {
  onEdit: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onEdit }) => {
  const { data: products, isLoading } = useGetProducts();
  const deleteProduct = useDeleteProduct();
  const [localProducts, setLocalProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products) {
      setLocalProducts(products);
    }
  }, [products]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct.mutateAsync(id);
        setLocalProducts(prev => prev.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl lg:rounded-[30px] p-6 shadow-sm">
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 animate-spin text-[#0E99A2]" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl lg:rounded-[30px] p-6 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Product
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Price
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Manufacturer
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Stock
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Created
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {localProducts && localProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                      <img
                        src={product.image_url}
                        alt={product.name.hy}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50?text=No+Image';
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-[#404A3D] truncate">
                        {product.name.hy}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {product.name.ru && `RU: ${product.name.ru}`}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {product.name.en && `EN: ${product.name.en}`}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {product.price?.toLocaleString()} ֏
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-gray-600">{product.manufacturer}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-gray-600">{product.stock}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(product.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 text-[#0E99A2] hover:bg-[#0E99A2] hover:text-white rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => window.open(`/catalog/${product.id}`, "_blank")}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deleteProduct.isPending}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      {deleteProduct.isPending ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!isLoading && (!localProducts || localProducts.length === 0) && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found. Add your first product!</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
