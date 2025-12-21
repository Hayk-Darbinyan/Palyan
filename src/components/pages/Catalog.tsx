import ProductFilterSystem from "../organism/ProductFilterSystem";
import Hero from "../molecule/Hero";

const Catalog = () => {
  return (
    <div className="pt-7 px-2 sm:px-6 flex flex-col gap-8 bg-[#F8F7F0]">
      <Hero  isHome={false} />
      <ProductFilterSystem />
    </div>
  );
};

export default Catalog;
