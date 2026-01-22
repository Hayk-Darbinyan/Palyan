import { useTranslation } from "react-i18next";
import arrow from "@/assets/icons/arrow.svg";
import calendar from "@/assets/icons/calendar.svg";
import { useGetNews } from "@/hooks/useNews";
import { formatDate } from "@/utils/formatDate";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const News = () => {
  const { data } = useGetNews();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen pt-7 px-2 sm:px-6 flex flex-col gap-8 bg-[#F8F7F0]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((news) => (
          <div className="w-full max-w-md flex flex-col gap-4">
            <div className="relative rounded-[30px]">
              <img
                onClick={() => navigate(`/news/${news.id}`)}
                src={news.image_url as string}
                alt=""
                className="h-83 object-cover rounded-[30px] cursor-pointer"
              />
              <div
                className="absolute bottom-0 right-0 rounded-full bg-[#EFD45C] w-12.5 h-12.5 flex items-center justify-center cursor-pointer"
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

export default News;
