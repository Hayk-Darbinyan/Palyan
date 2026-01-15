import { Outlet, useLocation } from "react-router";
import Hero from "../molecule/Hero";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const MainLayout = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];
  const isHome = pathname === "";
  const { t } = useTranslation();
  const isNewsDetail =
    pathname === "news" && location.pathname.split("/").length > 2;

  return (
    <>
      {!isNewsDetail && (
        <Helmet>
          <title>Palyan Animal Health</title>
          <meta name="description" content={t("hero.title")} />

          {/* Make sure image URL is absolute */}
          <meta property="og:title" content="Palyan Animal Health" />
          <meta property="og:description" content={t("hero.title")} />
          <meta
            property="og:image"
            content="https://palyan.am/hero.png"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={window.location.href} />
        </Helmet>
      )}
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
