import React, { useEffect, useState } from "react";
import { Edit2, Trash2, Eye, Calendar, Loader } from "lucide-react";
import { useGetNews, useDeleteNews } from "@/hooks/useNews";

interface NewsListProps {
  onEdit: (news: any) => void;
}

const NewsList: React.FC<NewsListProps> = ({ onEdit }) => {
  const { data: newsList, isLoading } = useGetNews();
  const deleteNews = useDeleteNews();
  const [localNews, setLocalNews] = useState<any[]>([]);

  useEffect(() => {
    if (newsList) {
      setLocalNews(newsList);
    }
  }, [newsList]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      try {
        await deleteNews.mutateAsync(id);
        setLocalNews(prev => prev.filter(n => n.id !== id));
      } catch (error) {
        console.error('Error deleting news:', error);
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
                News Article
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Date
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {localNews && localNews.map((news) => (
              <tr
                key={news.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                      <img
                        src={news.image_url || ''}
                        alt={news.title.hy}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64?text=No+Image';
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-[#404A3D] truncate">
                        {news.title.hy}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {news.title.ru && `RU: ${news.title.ru}`}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {news.title.en && `EN: ${news.title.en}`}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(news.published_at).toLocaleDateString()}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(news)}
                      className="p-2 text-[#0E99A2] hover:bg-[#0E99A2] hover:text-white rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => window.open(`/news/${news.id}`, "_blank")}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(news.id)}
                      disabled={deleteNews.isPending}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      {deleteNews.isPending ? (
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

      {!isLoading && (!localNews || localNews.length === 0) && (
        <div className="text-center py-12">
          <p className="text-gray-500">No news articles found. Add your first article!</p>
        </div>
      )}
    </div>
  );
};

export default NewsList;
