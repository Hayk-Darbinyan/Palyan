import { useTranslation } from "react-i18next";
import AnimalCard from "../molecule/AnimalCard";
import we from "@/assets/images/we.png";
import round from "@/assets/icons/round.svg";
import leaf from "@/assets/icons/leaf.svg";
import { Button } from "../atom/Button";
import ServiceCard from "../molecule/ServiceCard";
import { services } from "@/constants/services";
import Benefits from "../molecule/Benefits";
import target from "@/assets/images/target.png";
import StatsCard from "../atom/StatCard";
import Partners from "../molecule/Partners";
import NewsSection from "../molecule/NewsSection";

const Home = () => {
  const { t } = useTranslation();
  const animalTypes = t("animalType.animals", {
    returnObjects: true,
  }) as Array<{
    key: string;
    name: string;
    description: string;
  }>;
  return (
    <div className="bg-[#f8f7f0] pt-7">
      {/* Animal Cards */}
      <section className="w-full px-5 mt-10">
        <div className="flex flex-col gap-10">
          <span className="text-[30px] leading-[50px] text-[#99999999]">
            {t("animalType.title")}
          </span>

          <div className="flex flex-wrap gap-4 justify-center">
            {animalTypes.map((animal, index) => (
              <AnimalCard key={index} animal={animal} />
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="w-full px-5">
        <Partners />
      </section>

      {/* Who We Are */}
      <section className="w-full py-16 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col xl:flex-row gap-12 xl:gap-24 items-center xl:items-start">
            {/* Image Section with Stats Card */}
            <div className="relative w-full xl:w-1/2 max-w-[700px]">
              <div
                className="relative w-full aspect-4096/2731 bg-center bg-cover rounded-[30px] overflow-hidden hidden sm:block"
                style={{
                  backgroundImage: `url(${we})`,
                }}
                role="img"
                aria-label="Company team photo"
              >
                {/* Corner decorations */}
                <div className="hidden sm:block absolute right-[313px] bottom-0 w-[30px] h-[30px] origin-center rotate-90">
                  <img src={round} alt="" aria-hidden="true" />
                </div>
                <div className="hidden sm:block absolute right-0 bottom-[222px] w-[30px] h-[30px] origin-center rotate-90">
                  <img src={round} alt="" aria-hidden="true" />
                </div>

                {/* Stats Card */}
                <div className="pl-[30px] pt-[30px] absolute bottom-0 right-0 w-[313px] h-[222px] bg-[#f8f7f0] rounded-tl-[30px]">
                  <StatsCard />
                </div>
              </div>
            </div>
            {/* MOBILE / SM */}
            <div className="block sm:hidden">
              <div className="w-full max-w-[313px] mx-auto">
                <StatsCard />
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-1/2 flex flex-col  gap-8 pt-0">
              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl xl:text-[55px] leading-tight lg:leading-[60px] text-[#404A3D] font-semibold">
                {t("whoWeAre.title")}
              </h2>

              {/* Description */}
              <div className="text-base lg:text-lg leading-relaxed text-[#666666] space-y-4">
                <p>{t("whoWeAre.description")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="w-full py-16 px-4 bg-[#0E99A2]">
        <div className="max-w-381 mx-auto">
          <div className="flex flex-col gap-4 lg:gap-8 items-center lg:items-start">
            <Button
              variant="default"
              className="inline-flex items-center gap-2 px-6 py-2 h-[30px] rounded-full bg-white shadow-sm border border-gray-200 pointer-events-none text-sm leading-6 text-[#666666] font-normal"
              aria-label="Section label"
            >
              <img src={leaf} alt="" className="w-5 h-5" aria-hidden="true" />
              <span>{t("services.title")}</span>
            </Button>

            <p className="text-4xl sm:text-[55px] leading-15 text-white">
              {t("services.description")}
            </p>

            <div className="flex flex-col mx-auto xl:flex-row gap-8">
              {services.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full py-16 px-4">
        <div className="max-w-381 mx-auto">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <Button
                variant="default"
                className="w-full max-w-56 inline-flex items-center gap-2 px-6 py-2 h-[30px] rounded-full bg-white shadow-sm border border-gray-200 pointer-events-none text-sm leading-6 text-[#666666] font-normal"
                aria-label="Section label"
              >
                <img src={leaf} alt="" className="w-5 h-5" aria-hidden="true" />
                <span>{t("benefits.iconText")}</span>
              </Button>
              <div className="flex flex-col gap-8 lg:flex-row justify-between">
                <p className="lg:w-1/2 text-3xl sm:text-[45px] leading-15 text-[#404A3D]">
                  {t("benefits.title")}
                </p>
                <p className="pt-2.5 lg:w-1/2 text-base leading-6.5 text-[#666666]">
                  {t("benefits.description")}
                </p>
              </div>
            </div>

            <Benefits />
          </div>
        </div>
      </section>

      {/* Target */}
      <section className="w-full relative px-4 my-8 sm:px-6 xl:px-8 py-8 md:py-0">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col xl:flex-row rounded-[20px] md:rounded-[30px] overflow-hidden shadow-xl">
            {/* Image Side */}
            <div className="w-full xl:w-1/2 relative min-h-[300px] sm:min-h-[400px] lg:min-h-[600px]">
              <img
                src={target}
                alt="Our Target"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Content Side */}
            <div className="w-full xl:w-1/2 relative bg-[#0E99A2] p-6 sm:p-8 md:p-12 xl:p-20 flex flex-col justify-center">
              {/* Badge */}
              <div
                className="-translate-y-4 animate-fade-in opacity-0"
                // style={{ "--animation-delay": "200ms" }}
              >
                <Button
                  variant="default"
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 h-[30px] rounded-full bg-white shadow-sm border border-gray-200 pointer-events-none text-xs sm:text-sm leading-6 text-[#666666] font-normal"
                  aria-label="Section label"
                >
                  <img
                    src={leaf}
                    alt=""
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    aria-hidden="true"
                  />
                  <span>{t("target.iconText")}</span>
                </Button>
              </div>

              {/* Heading */}
              <h2
                className="mt-6 sm:mt-8 md:mt-10 font-semibold text-white text-2xl sm:text-3xl md:text-4xl xl:text-[40px] tracking-tight leading-tight md:leading-normal -translate-y-4 animate-fade-in opacity-0"
                // style={{ "--animation-delay": "400ms" }}
              >
                {t("target.title")}
              </h2>

              {/* Description */}
              <p
                className="mt-4 sm:mt-5 md:mt-6 font-normal text-white text-sm sm:text-base leading-relaxed md:leading-[1.6] -translate-y-4 animate-fade-in opacity-0"
                // style={{ "--animation-delay": "600ms" }}
              >
                {t("target.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 px-4">
        <div className="flex flex-col gap-2 mb-8">
          <Button
            variant="default"
            className="w-full max-w-56 inline-flex items-center gap-2 px-6 py-2 h-[30px] rounded-full bg-white shadow-sm border border-gray-200 pointer-events-none text-sm leading-6 text-[#666666] font-normal"
            aria-label="Section label"
          >
            <img src={leaf} alt="" className="w-5 h-5" aria-hidden="true" />
            <span>{t("newsSection.iconText")}</span>
          </Button>
          <p className="lg:w-1/2 text-3xl sm:text-[45px] leading-15 text-[#404A3D]">
            {t("newsSection.title")}
          </p>
        </div>
        <NewsSection />
      </section>
    </div>
  );
};

export default Home;
