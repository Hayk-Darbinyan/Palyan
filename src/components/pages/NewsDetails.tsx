import { ArrowLeft } from "lucide-react";
import calendar from "@/assets/icons/calendar.svg";
import fb from "@/assets/icons/fb.svg";
import ig from "@/assets/icons/ig.svg";
import hero from "@/assets/images/hero.png";
import Hero from "../molecule/Hero";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useGetNewsById } from "@/hooks/useNews";
import { formatDate } from "@/utils/formatDate";

const NewsDetails = () => {
  const { id } = useParams<{ id: string }>();
  const newsId = Number(id);
  const { data } = useGetNewsById(newsId);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#F8F7F0] pt-7 px-2 sm:px-4 lg:px-6">
      <Hero isHome={false} />

      <div className="max-w-7xl mx-auto py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <aside className="lg:w-1/4">
            {/* Back to News Page Button */}
            <div className="bg-white rounded-2xl lg:rounded-[30px] p-6 shadow-sm mb-6">
              <button
                className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-[#F8F7F0] text-[#404A3D] rounded-full hover:bg-[#0E99A2] hover:text-white transition-all duration-200 font-medium cursor-pointer"
                onClick={() => navigate("/news")}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{t("newsDetails.backToNews")}</span>
              </button>
            </div>

            {/* Publication Date */}
            <div className="bg-white rounded-2xl lg:rounded-[30px] p-6 shadow-sm mb-6">
              <h3 className="text-lg font-bold text-[#404A3D] mb-4">
                {t("newsDetails.publishedAt")}
              </h3>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <img
                  src={calendar}
                  alt="Calendar"
                  className="w-6 h-6 text-[#0E99A2]"
                />
                <div>
                  <p className="font-medium text-[#404A3D]">
                    {formatDate(data?.published_at).date}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(data?.published_at).time}
                  </p>
                </div>
              </div>
            </div>

            {/* Author Info */}
            <div className="bg-white rounded-2xl lg:rounded-[30px] p-6 shadow-sm mb-6">
              <h3 className="text-lg font-bold text-[#404A3D] mb-4">{t("newsDetails.author")}</h3>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-4">
                  <img
                    src={data?.author?.image}
                    alt="Author"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-[#404A3D] mb-2">
                  {data?.author?.name[i18n.language as "hy" | "ru" | "en"]}
                </h4>
                <p className="text-[#5B8C51] font-medium mb-3">{data?.author?.position[i18n.language as "hy" | "ru" | "en"]}</p>
                <p className="text-gray-600 text-sm mb-4">
                  {data?.author?.bio[i18n.language as "hy" | "ru" | "en"]}
                </p>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            {/* Main Content */}
            <div className="bg-white rounded-2xl lg:rounded-[30px] p-6 lg:p-8 shadow-sm">
              {/* News Header */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
                      <img
                        src={data?.author?.image}
                        alt="Author"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-[#404A3D]">
                        {data?.author?.name[i18n.language as "hy" | "ru" | "en"]}
                      </p>
                    </div>
                  </div>
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-[#404A3D] mb-4">
                  {data?.title[i18n.language as "hy" | "ru" | "en"]}
                </h1>

                <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 mb-6">
                  <img
                    src={hero}
                    alt="News"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* News Content */}
              <div className="space-y-10">
                {/* Subtitle 1 with description */}
                {data.features.map((feature) => (
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-[#0E99A2] mb-6">
                      {feature.title[i18n.language as "hy" | "ru" | "en"]}
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        {
                          feature.description[
                            i18n.language as "hy" | "ru" | "en"
                          ]
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Sharing & Additional Info */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex flex-col lg:flex-row items-center justify-end gap-6">
                  {/* Social Sharing */}
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600 font-medium">{t("newsDetails.share")}</span>
                    <div className="flex items-center gap-3">
                      <a
                        href="#"
                        className="flex items-center justify-center w-10 h-10 bg-[#F8F7F0] rounded-full hover:bg-[#0E99A2] transition-colors group"
                        aria-label="Facebook"
                      >
                        <img src={fb} alt="Facebook" className="w-5 h-5" />
                      </a>
                      <a
                        href="#"
                        className="flex items-center justify-center w-10 h-10 bg-[#F8F7F0] rounded-full hover:bg-[#EFD45C] transition-colors group"
                        aria-label="Instagram"
                      >
                        <img src={ig} alt="Instagram" className="w-5 h-5" />
                      </a>
                      <a
                        href="#"
                        className="flex items-center justify-center w-10 h-10 bg-[#F8F7F0] rounded-full hover:bg-[#505887] transition-colors group"
                        aria-label="Other Social"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
