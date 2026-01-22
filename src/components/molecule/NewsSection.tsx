import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useGetNews } from "@/hooks/useNews";
import { formatDate } from "@/utils/formatDate";
import arrow from "@/assets/icons/arrow.svg";
import calendar from "@/assets/icons/calendar.svg";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const NewsSection = () => {
  const { data } = useGetNews();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Update items per page based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1); // mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); // tablet
      } else {
        setItemsPerPage(3); // desktop
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalNews = data?.length || 0;
  const totalPages = Math.ceil(totalNews / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const displayedNews =
    data?.slice(startIndex, startIndex + itemsPerPage) || [];

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const showArrows = totalNews > itemsPerPage;

  return (
    <div className="flex flex-col gap-6">
      {/* Arrow Navigation - Top */}
      {showArrows && (
        <div className="flex justify-end gap-2">
          <button
            onClick={handlePrevious}
            className="w-12 h-10 sm:w-15 sm:h-12.5 border border-[#404A3D] rounded-[5px] flex justify-center items-center hover:bg-[#404A3D] hover:text-white transition-colors"
            aria-label="Previous news"
          >
            <ArrowLeft className="w-2 h-3 sm:w-3 sm:h-4" />
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-10 sm:w-15 sm:h-12.5 border border-[#404A3D] rounded-[5px] flex justify-center items-center hover:bg-[#404A3D] hover:text-white transition-colors"
            aria-label="Next news"
          >
            <ArrowRight className="w-2 h-3 sm:w-3 sm:h-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedNews.map((news) => (
          <div key={news.id} className="w-full flex flex-col gap-4">
            <div className="relative rounded-[30px]">
              <img
                src={news.image_url as string}
                onClick={() => navigate(`/news/${news.id}`)}
                alt=""
                className="w-full h-83 object-cover rounded-[30px] cursor-pointer"
              />
              <div
                className="absolute bottom-0 right-0 rounded-full bg-[#EFD45C] w-12.5 h-12.5 flex items-center justify-center cursor-pointer hover:bg-[#f0e373] transition-colors"
                onClick={() => navigate(`/news/${news.id}`)}
              >
                <img src={arrow} alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-1">
                <img src={calendar} alt="" />
                <p className="text-xs leading-5.5 text-[#666666]">
                  {formatDate(news.published_at).date}
                </p>
              </div>
              <p className="text-[28px] leading-9.5 text-[#404A3D]">
                {news.title[i18n.language as "hy" | "ru" | "en"]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
