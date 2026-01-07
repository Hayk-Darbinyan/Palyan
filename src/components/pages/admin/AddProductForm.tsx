import React, { useState, useEffect } from 'react';
import { Save, Upload, Plus, Trash2, X, Loader } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';
import { useCreateProduct, useUpdateProduct } from '@/hooks/useProducts';
import type { Product as BackendProduct } from '@/types/product';
import type { BackendCategory } from '@/types/catalog';
import TranslationField from '../admin/TranslationField';

interface AddProductFormProps {
  product?: BackendProduct;
  onSuccess?: () => void;
}

interface FormData {
  name: {
    hy: string;
    ru: string;
    en: string;
  };
  price: number;
  stock: number;
  description: {
    hy: string;
    ru: string;
    en: string;
  };
  manufacturer: string;
  image_url: string;
  category_id: number | '';
  subcategory_id: number | '';
  types_id: number | '';
  features: Array<{
    id?: number;
    title: {
      hy: string;
      ru: string;
      en: string;
    };
    description: {
      hy: string;
      ru: string;
      en: string;
    };
  }>;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ product, onSuccess }) => {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const [formData, setFormData] = useState<FormData>({
    name: {
      hy: product?.name.hy || '',
      ru: product?.name.ru || '',
      en: product?.name.en || ''
    },
    price: product?.price || 0,
    stock: product?.stock || 0,
    description: {
      hy: product?.description.hy || '',
      ru: product?.description.ru || '',
      en: product?.description.en || ''
    },
    manufacturer: product?.manufacturer || '',
    image_url: product?.image_url || '',
    category_id: product?.category_id || '',
    subcategory_id: product?.subcategory_id || '',
    types_id: product?.types_id || '',
    features: product?.features?.length ? product.features : [{ 
      title: { hy: '', ru: '', en: '' },
      description: { hy: '', ru: '', en: '' }
    }]
  });

  const [imagePreview, setImagePreview] = useState<string>(product?.image_url || '');
  const [selectedCategory, setSelectedCategory] = useState<BackendCategory | null>(
    categories?.find((cat: BackendCategory) => cat.id === product?.category_id) || null
  );

  useEffect(() => {
    if (categories && product?.category_id) {
      const found = categories.find((cat: BackendCategory) => cat.id === product.category_id);
      if (found) {
        setSelectedCategory(found);
      }
    }
  }, [categories, product?.category_id]);

  const handleInputChange = (field: keyof Omit<FormData, 'name' | 'description' | 'features'>, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleTextChange = (field: 'name' | 'description', lang: 'hy' | 'ru' | 'en', value: string) => {
    setFormData({
      ...formData,
      [field]: {
        ...formData[field],
        [lang]: value
      }
    });
  };

  const handleCategoryChange = (categoryId: number) => {
    const category = categories?.find((c: BackendCategory) => c.id === categoryId);
    setSelectedCategory(category || null);
    setFormData({
      ...formData,
      category_id: categoryId,
      subcategory_id: ''
    });
  };

  const handleSubcategoryChange = (subcategoryId: number) => {
    setFormData({
      ...formData,
      subcategory_id: subcategoryId
    });
  };

  const handleFeatureChange = (index: number, field: 'title' | 'description', lang: 'hy' | 'ru' | 'en', value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = {
      ...newFeatures[index],
      [field]: {
        ...newFeatures[index][field],
        [lang]: value
      }
    };
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { 
        title: { hy: '', ru: '', en: '' },
        description: { hy: '', ru: '', en: '' }
      }]
    });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const submitData = {
        ...formData,
        category_id: Number(formData.category_id),
        subcategory_id: formData.subcategory_id ? Number(formData.subcategory_id) : null,
        types_id: formData.types_id ? Number(formData.types_id) : 1
      };

      if (product?.id) {
        await updateProduct.mutateAsync({
          ...submitData,
          id: product.id,
          created_at: product.created_at
        } as BackendProduct);
      } else {
        await createProduct.mutateAsync(submitData as Omit<BackendProduct, 'id' | 'created_at'>);
      }

      onSuccess?.();
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl lg:rounded-[30px] p-6 lg:p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#404A3D] mb-2">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Product Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Product Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-full h-64 object-contain rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('');
                      setFormData({ ...formData, image_url: '' });
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <label className="cursor-pointer inline-flex items-center gap-2 bg-[#0E99A2] text-white px-6 py-3 rounded-full hover:bg-[#0d8a92] transition-colors">
                    <Upload className="w-5 h-5" />
                    Upload Image
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <p className="text-gray-500 text-sm mt-3">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-6">
            {/* Name with translations */}
            <TranslationField
              label="Product Name"
              value={formData.name.hy}
              valueRu={formData.name.ru}
              valueEn={formData.name.en}
              onChange={(value) => handleTextChange('name', 'hy', value)}
              onChangeRu={(value) => handleTextChange('name', 'ru', value)}
              onChangeEn={(value) => handleTextChange('name', 'en', value)}
              placeholder="Enter product name in Armenian"
              placeholderRu="Enter product name in Russian"
              placeholderEn="Enter product name in English"
              required
            />

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (֏)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent"
                placeholder="Enter price in ֏"
                required
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => handleInputChange('stock', Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent"
                placeholder="Enter stock quantity"
                required
              />
            </div>

            {/* Manufacturer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Manufacturer
              </label>
              <input
                type="text"
                value={formData.manufacturer}
                onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent"
                placeholder="Enter manufacturer name"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Category and Subcategory */}
          <div className="space-y-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category {categoriesLoading && <Loader className="w-4 h-4 inline animate-spin" />}
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => handleCategoryChange(Number(e.target.value))}
                disabled={categoriesLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent disabled:opacity-50"
                required
              >
                <option value="">Select Category</option>
                {categories?.map((category: BackendCategory) => (
                  <option key={category.id} value={category.id}>
                    {category.name.hy || category.name.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory */}
            {selectedCategory && selectedCategory.subcategories.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategory
                </label>
                <select
                  value={formData.subcategory_id}
                  onChange={(e) => handleSubcategoryChange(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent"
                >
                  <option value="">Select Subcategory</option>
                  {selectedCategory.subcategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name.hy || sub.name.en}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Description with translations */}
          <TranslationField
            label="Description"
            value={formData.description.hy}
            valueRu={formData.description.ru}
            valueEn={formData.description.en}
            onChange={(value) => handleTextChange('description', 'hy', value)}
            onChangeRu={(value) => handleTextChange('description', 'ru', value)}
            onChangeEn={(value) => handleTextChange('description', 'en', value)}
            placeholder="Enter description in Armenian"
            placeholderRu="Enter description in Russian"
            placeholderEn="Enter description in English"
            textarea
            rows={4}
            required
          />

          {/* Features Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-lg font-semibold text-[#404A3D]">
                Features
              </label>
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-2 text-[#0E99A2] hover:text-[#0d8a92]"
              >
                <Plus className="w-4 h-4" />
                Add Feature
              </button>
            </div>

            <div className="space-y-6">
              {formData.features.map((feature, index) => (
                <div key={index} className="border border-gray-200 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-gray-600">Feature {index + 1}</span>
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {/* Feature Title with translations */}
                    <TranslationField
                      label="Feature Title"
                      value={feature.title.hy}
                      valueRu={feature.title.ru}
                      valueEn={feature.title.en}
                      onChange={(value) => handleFeatureChange(index, 'title', 'hy', value)}
                      onChangeRu={(value) => handleFeatureChange(index, 'title', 'ru', value)}
                      onChangeEn={(value) => handleFeatureChange(index, 'title', 'en', value)}
                      placeholder="e.g., Դեղաձև"
                      placeholderRu="e.g., Лекарственная форма"
                      placeholderEn="e.g., Dosage form"
                    />

                    {/* Feature Description with translations */}
                    <TranslationField
                      label="Feature Description"
                      value={feature.description.hy}
                      valueRu={feature.description.ru}
                      valueEn={feature.description.en}
                      onChange={(value) => handleFeatureChange(index, 'description', 'hy', value)}
                      onChangeRu={(value) => handleFeatureChange(index, 'description', 'ru', value)}
                      onChangeEn={(value) => handleFeatureChange(index, 'description', 'en', value)}
                      placeholder="e.g., Ծամվող հաբեր"
                      placeholderRu="e.g., Жевательные таблетки"
                      placeholderEn="e.g., Chewable tablets"
                      textarea
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={createProduct.isPending || updateProduct.isPending}
              className="w-full flex items-center justify-center gap-3 bg-[#404A3D] text-white py-4 px-6 rounded-full hover:bg-[#2d3329] transition-colors font-medium disabled:opacity-50"
            >
              {createProduct.isPending || updateProduct.isPending ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {product ? 'Update Product' : 'Save Product'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProductForm;