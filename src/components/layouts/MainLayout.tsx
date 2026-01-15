import { Outlet, useLocation } from "react-router";
import Hero from "../molecule/Hero";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import hero from "@/assets/images/hero.png";

const MainLayout = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];
  const isHome = pathname === "";
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Palyan Animal Health</title>
        <meta name="description" content={t("hero.title")} />
        <meta property="og:image" content={hero} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="bg-[#f8f7f0]">
        <div className="pt-7 px-2 sm:px-6">
          <Hero isHome={isHome} />
        </div>
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
