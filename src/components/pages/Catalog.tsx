import { useEffect } from "react";
import ProductFilterSystem from "../organism/ProductFilterSystem";

const Catalog = () => {
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div className="pt-7 px-2 sm:px-6 flex flex-col gap-8 bg-[#F8F7F0]">
      <ProductFilterSystem />
    </div>
  );
};

export default Catalog;
