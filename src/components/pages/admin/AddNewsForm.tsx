import React, { useState, useEffect } from "react";
import {
  Save,
  Upload,
  Plus,
  Trash2,
  X,
  Calendar,
  Tag,
  User,
} from "lucide-react";
import type { News } from "@/types/admin";
import TranslationField from "../admin/TranslationField";
import { useCreateNews, useUpdateNews } from "@/hooks/useNews";
import type { CreateNewsPayload, UpdateNewsPayload } from "@/hooks/useNews";
import { uploadToCloudinary } from "@/utils/cloudinaryUpload";

interface AddNewsFormProps {
  news?: News;
  onSuccess?: () => void;
}

const AddNewsForm: React.FC<AddNewsFormProps> = ({ news, onSuccess }) => {
  const createNewsMutation = useCreateNews();
  const updateNewsMutation = useUpdateNews();

  const [formData, setFormData] = useState<News>({
    id: news?.id || '',
    title: news?.title || { hy: '', ru: '', en: '' },
    image_url: news?.image_url || '',
    author: {
      name: news?.author?.name || { hy: '', ru: '', en: '' },
      position: news?.author?.position || { hy: '', ru: '', en: '' },
      bio: news?.author?.bio || { hy: '', ru: '', en: '' },
      image: news?.author?.image || ''
    },
    date: news?.date || new Date().toISOString().split('T')[0],
    features: news?.features || [{ 
      id: '1', 
      title: { hy: '', ru: '', en: '' },
      description: { hy: '', ru: '', en: '' }
    }],
    createdAt: news?.createdAt || '',
    updatedAt: news?.updatedAt || ''
  });

  const [imagePreview, setImagePreview] = useState<string>(news?.image_url || "");
  const [authorImagePreview, setAuthorImagePreview] = useState<string>(
    news?.author?.image || ""
  );
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingAuthorImage, setIsUploadingAuthorImage] = useState(false);
  const [currentNews, setCurrentNews] = useState<News | undefined>(news);

  const handleInputChange = (field: keyof News, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleTextChange = (
    field: "title" | "image" | "date",
    lang: "hy" | "ru" | "en" | "",
    value: string
  ) => {
    if (field === "image") {
      setFormData({ ...formData, image_url: value });
    } else if (field === "date") {
      setFormData({ ...formData, [field]: value });
    } else {
      setFormData({
        ...formData,
        [field]: {
          ...formData[field],
          [lang]: value,
        },
      });
    }
  };

  const handleAuthorChange = (
    field: "name" | "position" | "bio" | "image",
    lang: "hy" | "ru" | "en" | "",
    value: string
  ) => {
    if (field === "image") {
      setFormData({
        ...formData,
        author: {
          ...formData.author,
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        author: {
          ...formData.author,
          [field]: {
            ...formData.author[field],
            [lang]: value,
          },
        },
      });
    }
  };

  const handleSubtitleChange = (
    index: number,
    field: "title" | "description",
    lang: "hy" | "ru" | "en",
    value: string
  ) => {
    const newSubtitles = [...formData.features];
    newSubtitles[index] = {
      ...newSubtitles[index],
      [field]: {
        ...newSubtitles[index][field],
        [lang]: value,
      },
    };
    setFormData({ ...formData, features: newSubtitles });
  };

  const addSubtitle = () => {
    setFormData({
      ...formData,
      features: [
        ...formData.features,
        {
          id: Date.now().toString(),
          title: {
            hy: "",
            ru: "",
            en: "",
          },
          description: {
            hy: "",
            ru: "",
            en: "",
          },
        },
      ],
    });
  };

  const removeSubtitle = (index: number) => {
    const newSubtitles = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newSubtitles });
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "news" | "author"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        if (type === "news") {
          setIsUploadingImage(true);
          const imageUrl = await uploadToCloudinary(file);
          setImagePreview(imageUrl);
          handleTextChange("image", "", imageUrl);
        } else {
          setIsUploadingAuthorImage(true);
          const imageUrl = await uploadToCloudinary(file);
          setAuthorImagePreview(imageUrl);
          handleAuthorChange("image", "", imageUrl);
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        if (type === "news") {
          setIsUploadingImage(false);
        } else {
          setIsUploadingAuthorImage(false);
        }
      }
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  useEffect(() => {
    setCurrentNews(news);
  }, [news]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title.hy || !formData.title.ru || !formData.title.en) {
      alert("Please fill in the news title in all languages");
      return;
    }

    if (!formData.image_url) {
      alert("Please upload a news image");
      return;
    }

    if (!formData.author.name.hy || !formData.author.name.ru || !formData.author.name.en) {
      alert("Please fill in the author name in all languages");
      return;
    }

    try {
      // Create payload with proper types
      const newsPayload = {
        title: formData.title,
        image_url: formData.image_url,
        author: {
          name: formData.author.name,
          position: formData.author.position,
          bio: formData.author.bio,
          image: formData.author.image,
        },
        published_at: formData.date,
        features: formData.features.map(feature => ({
          title: feature.title,
          description: feature.description,
        })),
      };

      if (currentNews?.id) {
        // Update existing news
        const updatePayload: UpdateNewsPayload = {
          id: currentNews.id,
          ...newsPayload,
        };
        await updateNewsMutation.mutateAsync(updatePayload);
        alert("News updated successfully!");
      } else {
        // Create new news
        const createPayload: CreateNewsPayload = newsPayload;
        const createdNews = await createNewsMutation.mutateAsync(createPayload);
        setCurrentNews(createdNews as News);
        alert("News published successfully!");
      }

      onSuccess?.();
    } catch (error) {
      console.error("Error submitting news:", error);
      alert("Failed to submit news. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl lg:rounded-[30px] p-6 lg:p-8 shadow-sm"
    >
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#404A3D] mb-2">
          {currentNews ? "Edit News Article" : "Add News Article"}
        </h2>
      </div>

      <div className="space-y-8">
        {/* News Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            News Main Image
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="News preview"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview("");
                    handleTextChange("image", "", "");
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div>
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <label className="cursor-pointer inline-flex items-center gap-2 bg-[#0E99A2] text-white px-6 py-3 rounded-full hover:bg-[#0d8a92] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" style={{ opacity: isUploadingImage ? 0.5 : 1, cursor: isUploadingImage ? 'not-allowed' : 'pointer' }}>
                  <Upload className="w-5 h-5" />
                  {isUploadingImage ? "Uploading..." : "Upload News Image"}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "news")}
                    disabled={isUploadingImage}
                  />
                </label>
                <p className="text-gray-500 text-sm mt-3">PNG, JPG up to 5MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Basic News Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* News Title with translations */}
          <TranslationField
            label="News Title"
            value={formData.title.hy}
            valueRu={formData.title.ru}
            valueEn={formData.title.en}
            onChange={(value) => handleTextChange("title", "hy", value)}
            onChangeRu={(value) => handleTextChange("title", "ru", value)}
            onChangeEn={(value) => handleTextChange("title", "en", value)}
            placeholder="Enter news title in Armenian"
            placeholderRu="Enter news title in Russian"
            placeholderEn="Enter news title in English"
            required
          />

          {/* Publication Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Publication Date
              </div>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Author Information */}
        <div className="border border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-[#404A3D] mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Author Information
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Author Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
                {authorImagePreview ? (
                  <div className="relative inline-block">
                    <img
                      src={authorImagePreview}
                      alt="Author preview"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setAuthorImagePreview("");
                        handleAuthorChange("image", "", "");
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <label className="cursor-pointer inline-flex items-center gap-2 text-[#0E99A2] hover:text-[#0d8a92]" style={{ opacity: isUploadingAuthorImage ? 0.5 : 1, cursor: isUploadingAuthorImage ? 'not-allowed' : 'pointer' }}>
                      <Upload className="w-5 h-5" />
                      {isUploadingAuthorImage ? "Uploading..." : "Upload Author Image"}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "author")}
                        disabled={isUploadingAuthorImage}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Author Details */}
            <div className="space-y-4">
              <TranslationField
                label="Author Name"
                value={formData.author?.name.hy}
                valueRu={formData.author?.name.ru}
                valueEn={formData.author?.name.en}
                onChange={(value) => handleAuthorChange("name", "hy", value)}
                onChangeRu={(value) => handleAuthorChange("name", "ru", value)}
                onChangeEn={(value) => handleAuthorChange("name", "en", value)}
                placeholder="Author name in Armenian"
                placeholderRu="Author name in Russian"
                placeholderEn="Author name in English"
              />

              <TranslationField
                label="Position"
                value={formData.author?.position.hy}
                valueRu={formData.author?.position.ru}
                valueEn={formData.author?.position.en}
                onChange={(value) =>
                  handleAuthorChange("position", "hy", value)
                }
                onChangeRu={(value) =>
                  handleAuthorChange("position", "ru", value)
                }
                onChangeEn={(value) =>
                  handleAuthorChange("position", "en", value)
                }
                placeholder="e.g., Անասնաբույժ"
                placeholderRu="e.g., Ветеринар"
                placeholderEn="e.g., Veterinarian"
              />

              <TranslationField
                label="Bio / Mini About"
                value={formData.author?.bio.hy}
                valueRu={formData.author?.bio.ru}
                valueEn={formData.author?.bio.en}
                onChange={(value) => handleAuthorChange("bio", "hy", value)}
                onChangeRu={(value) => handleAuthorChange("bio", "ru", value)}
                onChangeEn={(value) => handleAuthorChange("bio", "en", value)}
                placeholder="e.g., 10+ տարի փորձ անասնաբուժության ոլորտում"
                placeholderRu="e.g., 10+ лет опыта в ветеринарии"
                placeholderEn="e.g., 10+ years of experience in veterinary medicine"
                textarea
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Tags (Press Enter to add Armenian tags)
            </div>
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-gray-100 text-[#404A3D] px-3 py-1 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleAddTag}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent"
            placeholder="Type Armenian tag and press Enter"
          />
          <p className="text-gray-500 text-sm mt-2">
            Press Enter to add tags (Armenian only)
          </p>
        </div>

        {/* News Subtitles Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#404A3D]">
              Article Content (Subtitles with Descriptions)
            </h3>
            <button
              type="button"
              onClick={addSubtitle}
              className="flex items-center gap-2 text-[#0E99A2] hover:text-[#0d8a92]"
            >
              <Plus className="w-4 h-4" />
              Add Section
            </button>
          </div>

          <div className="space-y-6">
            {formData.features.map((subtitle, index) => (
              <div
                key={subtitle.id}
                className="border border-gray-200 rounded-2xl p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-600">
                    Section {index + 1}
                  </span>
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSubtitle(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Subtitle Title with translations */}
                  <TranslationField
                    label="Subtitle Title"
                    value={subtitle.title.hy}
                    valueRu={subtitle.title.ru}
                    valueEn={subtitle.title.en}
                    onChange={(value) =>
                      handleSubtitleChange(index, "title", "hy", value)
                    }
                    onChangeRu={(value) =>
                      handleSubtitleChange(index, "title", "ru", value)
                    }
                    onChangeEn={(value) =>
                      handleSubtitleChange(index, "title", "en", value)
                    }
                    placeholder="e.g., Պարազիտների դեմ պայքարի ժամանակակից մեթոդներ"
                    placeholderRu="e.g., Современные методы борьбы с паразитами"
                    placeholderEn="e.g., Modern methods of parasite control"
                  />

                  {/* Subtitle Description with translations */}
                  <TranslationField
                    label="Subtitle Description"
                    value={subtitle.description.hy}
                    valueRu={subtitle.description.ru}
                    valueEn={subtitle.description.en}
                    onChange={(value) =>
                      handleSubtitleChange(index, "description", "hy", value)
                    }
                    onChangeRu={(value) =>
                      handleSubtitleChange(index, "description", "ru", value)
                    }
                    onChangeEn={(value) =>
                      handleSubtitleChange(index, "description", "en", value)
                    }
                    placeholder="Enter description in Armenian..."
                    placeholderRu="Enter description in Russian..."
                    placeholderEn="Enter description in English..."
                    textarea
                    rows={4}
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
            disabled={createNewsMutation.isPending || updateNewsMutation.isPending}
            className="w-full flex items-center justify-center gap-3 bg-[#5B8C51] text-white py-4 px-6 rounded-full hover:bg-[#4a7a43] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {createNewsMutation.isPending || updateNewsMutation.isPending
              ? "Saving..."
              : currentNews
              ? "Update News Article"
              : "Publish News Article"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddNewsForm;
