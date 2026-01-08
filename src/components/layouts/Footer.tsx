import React from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { navigationItems } from "@/constants/headerMenu";
import mail from "@/assets/icons/mail.svg";
import logo from "@/assets/images/logo.svg";
import fb from "@/assets/icons/fb.svg";
import x from "@/assets/icons/x.svg";
import ig from "@/assets/icons/ig.svg";
import linkedin from "@/assets/icons/in.svg";
import { PhoneCall } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <footer>
      {/* Top Section - Teal Background */}
      <div className="w-full bg-[#0E99A2]">
        <div className="max-w-[1524px] mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8">
            {/* Navigation Menu */}
            <nav className="w-full lg:w-auto">
              {/* Desktop/Tablet Navigation */}
              <div className="hidden md:flex items-center justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6">
                {navigationItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <button
                      className="text-xs sm:text-sm md:text-[14px] leading-6 md:leading-[25px] whitespace-nowrap flex items-center justify-center hover:opacity-80 transition-opacity"
                      onClick={() => navigate(item.route)}
                    >
                      <span
                        className={
                          item.active ? "text-[#efd45c]" : "text-white"
                        }
                      >
                        {t(item.text)}
                      </span>
                    </button>
                    {index < navigationItems.length - 1 && (
                      <div className="w-1.5 h-1.5 bg-white rounded-[3px]" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Mobile Navigation - Vertical Stack */}
              <div className="flex md:hidden flex-col items-center gap-3 w-full">
                {navigationItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <button
                      className="text-sm leading-6 whitespace-nowrap hover:opacity-80 transition-opacity"
                      onClick={() => navigate(item.route)}
                    >
                      <span
                        className={
                          item.active ? "text-[#efd45c]" : "text-white"
                        }
                      >
                        {t(item.text)}
                      </span>
                    </button>
                    {index < navigationItems.length - 1 && (
                      <div className="w-1.5 h-1.5 bg-white rounded-[3px]" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </nav>

            {/* Contact Information */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full lg:w-auto justify-center lg:justify-end">
              <a
                href="tel:+374000000000"
                className="flex items-center gap-3 hover:opacity-90 transition-opacity"
              >
                <div className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-white shrink-0">
                  <PhoneCall className="w-5 h-5 text-[#404A3D] stroke-1" />
                </div>
                <span className="text-sm sm:text-[15px] leading-6 text-white whitespace-nowrap">
                  + 374(000) 000-000
                </span>
              </a>

              <a
                href="mailto:palyan@gmail.com"
                className="flex items-center gap-3 hover:opacity-90 transition-opacity"
              >
                <div className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-white shrink-0">
                  <img src={mail} alt="Mail" className="w-5 h-5" />
                </div>
                <span className="text-sm sm:text-[15px] leading-6 text-white break-all sm:break-normal">
                  palyan@gmail.com
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - White Background */}
      <div className="w-full bg-white">
        <div className="max-w-[1524px] mx-auto px-4 py-8 sm:py-10 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
            {/* Left Column - Company Info */}
            <div className="w-full lg:w-1/3 flex flex-col gap-6">
              {/* Logo */}
              <div className="w-[139px]">
                <img src={logo} alt="Palyan Logo" className="w-full h-auto" />
              </div>

              {/* Description */}
              <p className="text-sm md:text-[14px] leading-relaxed md:leading-8 text-[#666666]">
                {t("footer.description")}
              </p>

              {/* Social Media */}
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="#"
                  className="flex items-center justify-center w-10 h-10 bg-[#F8F7F0] rounded-full hover:bg-[#f0f0f0] transition-colors group"
                  aria-label="Facebook"
                >
                  <img src={fb} alt="Facebook" className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center w-10 h-10 bg-[#F8F7F0] rounded-full hover:bg-[#f0f0f0] transition-colors group"
                  aria-label="Twitter"
                >
                  <img src={x} alt="Twitter" className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center w-10 h-10 bg-[#F8F7F0] rounded-full hover:bg-[#f0f0f0] transition-colors group"
                  aria-label="Instagram"
                >
                  <img src={ig} alt="Instagram" className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center w-10 h-10 bg-[#F8F7F0] rounded-full hover:bg-[#f0f0f0] transition-colors group"
                  aria-label="LinkedIn"
                >
                  <img src={linkedin} alt="LinkedIn" className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right Column - Links & Info */}
            <div className="w-full lg:w-2/3 flex flex-col gap-6 md:gap-8">
              {/* Motto */}
              <h3 className="text-2xl md:text-3xl leading-tight md:leading-[42px] text-[#404A3D] font-semibold">
                {t("footer.slogan")}
              </h3>

              {/* Three Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Menu Column */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-base md:text-[18px] leading-6 md:leading-[26px] text-[#404A3D] font-medium">
                    {t("footer.menu")}
                  </h4>
                  <nav className="flex flex-col items-start gap-3">
                    {navigationItems.map((item, index) => (
                      <button
                        key={index}
                        className="text-left text-sm md:text-[15px] leading-6 md:leading-[26px] text-[#666666] hover:text-[#0E99A2] transition-colors"
                      >
                        {t(item.text)}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Working Hours Column */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-base md:text-[18px] leading-6 md:leading-[26px] text-[#404A3D] font-medium">
                    {t("footer.workHours")}
                  </h4>
                  <div className="flex flex-col items-start gap-3">
                    <p className="text-sm md:text-[15px] leading-6 md:leading-[26px] text-[#666666]">
                      {t("footer.workDays")}
                    </p>
                    <p className="text-sm md:text-[15px] leading-6 md:leading-[26px] text-[#666666]">
                      {t("footer.sat")}
                    </p>
                    <p className="text-sm md:text-[15px] leading-6 md:leading-[26px] text-[#666666]">
                      {t("footer.sun")}
                    </p>
                  </div>
                </div>

                {/* Address Column */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-base md:text-[18px] leading-6 md:leading-[26px] text-[#404A3D] font-medium">
                    {t("footer.ourAddres")}
                  </h4>
                  <div className="flex flex-col items-start gap-3">
                    <a
                      href="#"
                      className="text-sm md:text-[15px] leading-6 md:leading-[26px] text-[#666666] hover:text-[#0E99A2] transition-colors"
                    >
                      {t("footer.addres")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
