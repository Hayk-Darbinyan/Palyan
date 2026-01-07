import { useTranslation } from "react-i18next";
import type { ServiceCardType } from "@/types/serviceCard";
import shape from "@/assets/images/serviceShape.png";

const ServiceCard = ({ service }: { service: ServiceCardType }) => {
  const { t } = useTranslation();
  return (
    <div className="relative w-full max-w-[678px] mx-auto group">
      <div
        className="relative bg-no-repeat bg-center bg-cover rounded-2xl sm:rounded-[20px] md:rounded-[30px] overflow-hidden w-full sm:aspect-678/526"
        style={{
          backgroundImage: `url(${shape})`,
        }}
      >
        <div className="w-full h-full p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col">
          <div className="w-full mb-4 sm:mb-5 rounded-[20px] sm:rounded-[25px] md:rounded-[30px] overflow-hidden">
            <img
              src={service.img}
              alt={t(service.title)}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="flex flex-col gap-3 sm:gap-4 flex-1">

            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] leading-6 sm:leading-7 md:leading-8 text-[#404A3D] font-semibold">
              {t(service.title)}
            </h3>

            <div className="border-t border-[#404A3D1A] pt-3 sm:pt-4">
              <p className="text-sm sm:text-base leading-6 sm:leading-7 md:leading-8 text-[#666666] pr-4 sm:pr-8 md:pr-12 lg:pr-[60px]">
                {t(service.description)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
