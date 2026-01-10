import { useTranslation } from "react-i18next";
import partner1 from "@/assets/images/partner1.png";
import partner2 from "@/assets/images/partner2.png";
import partner3 from "@/assets/images/partner3.png";
import partner4 from "@/assets/images/partner4.png";
import partner5 from "@/assets/images/partner5.png";

const Partners = () => {
  const partners = [
    { id: 1, name: 'Partner 1', logo: partner1 },
    { id: 2, name: 'Partner 2', logo: partner2 },
    { id: 3, name: 'Partner 3', logo: partner3 },
    { id: 4, name: 'Partner 4', logo: partner4 },
    { id: 5, name: 'Partner 5', logo: partner5 },
  ];

  const { t } = useTranslation();

  return (
    <div className="w-full pt-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-left mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-2">
            {t("manufacturer")}
          </h2>
        </div>

        {/* Partners Container */}
        <div className="relative overflow-hidden">
          {/* Mobile: Scrollable without scrollbar */}
          <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-8 py-4">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="shrink-0 w-[150px] h-20 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center p-4"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Auto-scrolling animation */}
          <div className="hidden md:block">
            <div className="flex gap-8 animate-scroll">
              {/* First set of logos */}
              {partners.map((partner) => (
                <div
                  key={`first-${partner.id}`}
                  className="shrink-0 w-45 h-25 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center p-6"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {partners.map((partner) => (
                <div
                  key={`second-${partner.id}`}
                  className="shrink-0 w-[180px] h-[100px] rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center p-6"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Hide scrollbar for mobile */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Auto-scroll animation for desktop */
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 10s linear infinite;
        }

        /* Pause animation on hover */
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Partners;