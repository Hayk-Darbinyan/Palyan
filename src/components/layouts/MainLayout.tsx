import { Outlet, useLocation } from "react-router";
import Hero from "../molecule/Hero";
import Footer from "./Footer";

const MainLayout = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];
  const isHome = pathname === "";

  return (
    <div className="bg-[#f8f7f0]">
      <div className="pt-7 px-2 sm:px-6">
        <Hero isHome={isHome} />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
