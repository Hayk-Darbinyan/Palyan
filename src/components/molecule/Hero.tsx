import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../atom/Button";
import round from "@/assets/icons/round.svg";
import Header from "../layouts/Header";
import hero from "@/assets/images/hero.png";
import cart from "@/assets/images/cart.jpg";
import news from "@/assets/images/news.jpg";
import catalog from "@/assets/images/cart.jpg";
import faq from "@/assets/images/faq.jpg";
import { useLocation } from "react-router";
import ContactModal from "./ContactModal";

const Hero = ({ isHome }: { isHome: boolean }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];
  const [showContactModal, setShowContactModal] = useState(false);

  const bg = isHome
    ? hero
    : pathname === "cart"
    ? cart
    : pathname === "news"
    ? news
    : pathname === "catalog"
    ? catalog
    : pathname === "faq"
    ? faq
    : "";

  return (
    <>
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          animation-delay: var(--animation-delay, 0ms);
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>
      <div className="w-full relative bg-transparent">
        {/* Absolute */}

        <div className="hidden xl:block absolute right-[223px] top-0">
          <img src={round} alt="" />
        </div>

        <div className="hidden xl:block absolute right-0 top-0 w-[223px] h-[100px] bg-[#F8F7F0] rounded-bl-[30px]">
          <Button
            onClick={() => setShowContactModal(true)}
            className="absolute top-5 left-[19px] w-[209px] h-[60px] gap-px bg-[#efd45c] rounded-[30px] hover:bg-[#efd45c]/90 transition-colors flex items-center justify-center cursor-pointer"
          >
            <span className="font-normal text-[#404a3d] text-base tracking-[0] leading-6 whitespace-nowrap">
              {t("header.contact.button")}
            </span>
            <img
              className="w-[22.38px] h-6"
              alt="Container"
              src="https://c.animaapp.com/mj34pxy3r3iOgt/img/container-4.svg"
            />
          </Button>
        </div>

        <div className="hidden xl:block absolute right-0 top-[100px]">
          <img src={round} alt="" />
        </div>

        {isHome ? (
          <div
            className="w-full rounded-[30px] pb-5 overflow-hidden min-h-[500px] md:min-h-[unset]"
            style={{
              background: `url(${bg}) 50% 50% / cover`,
            }}
          >
            <Header />
            <div className="my-10 md:my-[198px] md:ml-[9%] w-full max-w-[1863px] flex px-5">
              <div className="w-full  flex-1 flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-[201px] h-[30px] bg-transparent mt-10 rounded-[50px] border border-solid border-white animate-fade-in opacity-0 pointer-events-none"
                >
                  <p className="font-normal text-white text-xs  leading-[22px] whitespace-nowrap">
                    {t("hero.button")}
                  </p>
                </Button>

                <div
                  className="flex-1 md:max-h-[200px] mt-[23px] flex animate-fade-in opacity-0"
                  // style={{ "--animation-delay": "400ms" }}
                >
                  <div className="flex items-center justify-center w-[931px] font-semibold sm:font-normal text-white text-[24px] sm:text-[50px] tracking-[0] leading-[60px]">
                    {t("hero.title")}
                  </div>
                </div>

                <div
                  className="flex-1 md:max-h-8 mt-[25px] flex border-t border-solid border-[#ffffff80] animate-fade-in opacity-0"
                  // style={{ "--animation-delay": "600ms" }}
                >
                  <div className="flex items-center justify-center mt-[7px] font-normal text-white text-lg leading-7">
                    {t("hero.subtitle")}
                  </div>
                </div>

                <Button
                  onClick={() => setShowContactModal(true)}
                  className="w-[177px] h-12 mt-[25px] gap-[3px] bg-white rounded-[30px] hover:bg-white/90 transition-colors animate-fade-in opacity-0 flex items-center justify-center cursor-pointer"
                  // style={{ "--animation-delay": "800ms" }}
                >
                  <span className="font-normal text-[#404a3d] text-base tracking-[0] leading-6 whitespace-nowrap">
                    {t("hero.contactUs")}
                  </span>
                  <img
                    className="w-[22px] h-[21px]"
                    alt="Container"
                    src="https://c.animaapp.com/mj34pxy3r3iOgt/img/container-3.svg"
                  />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="w-full rounded-[30px] pb-5 overflow-hidden min-h-[300px] md:min-h-[unset]"
            style={{
              background: `url(${bg}) 50% 50% / cover`,
            }}
          >
            <Header />
            <div className="my-10 md:mb-[78px] md:ml-[9%] w-full max-w-[1863px] flex px-5">
              <p className="text-2xl sm:text-[50px] leading-15 text-white">
                {t("header.nav." + pathname)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </>
  );
};

export default Hero;
