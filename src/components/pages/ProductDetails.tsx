import { useState } from "react";
import { useNavigate } from "react-router";
import Hero from "../molecule/Hero";
import slogan from "@/assets/images/slogan.jpg";
import life from "@/assets/icons/life.svg";
import phone from "@/assets/icons/phone.svg";
import medicine from "@/assets/images/medicine.png";
import pass from "@/assets/icons/pass.svg";
import FilterPanel from "../molecule/FilterPanel";
import { sections as catalogData } from "@/constants/catalog";
import { ShoppingCart } from "lucide-react";

const ProductDetails = () => {
  const navigate = useNavigate();

  const [selectedSection, setSelectedSection] = useState<string>("");

  const sectionsList = catalogData.map((item) => item.section);

  return (
    <div className="min-h-screen bg-[#F8F7F0] pt-7 px-2 sm:px-4 lg:px-6">
      <Hero isHome={false} />
      
      <div className="max-w-7xl mx-auto py-6 lg:py-8">
        {/* Mobile Back Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="lg:hidden mb-6 flex items-center gap-2 text-[#404A3D] hover:text-[#2d3329] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Վերադառնալ</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Sidebar - Filter Panel & Slogan */}
          <aside className="lg:w-80 lg:shrink-0 space-y-6">
            {/* Filter Panel */}
            <div className="bg-white rounded-2xl lg:rounded-[30px] shadow-sm lg:shadow-none">
              <FilterPanel
                title="Կատալոգ"
                items={sectionsList}
                category="sections"
                onSectionSelect={setSelectedSection}
                selectedSection={selectedSection}
                details={true}
              />
            </div>

            {/* Slogan Card - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block">
              <div
                className="relative h-48 rounded-[30px] flex flex-col items-center justify-center p-6 text-center overflow-hidden"
                style={{
                    backgroundImage: `url(${slogan})`,
                }}
              >
                <div className="w-16 h-16 rounded-full bg-[#0E99A2] flex items-center justify-center mb-4">
                  <img src={life} alt="Life" className="w-8 h-8" />
                </div>
                <h3 className="text-xl text-white mb-3 font-medium">
                  Ընկերության կարգախոսը
                </h3>
                <div className="flex items-center gap-2">
                  <img src={phone} alt="Phone" className="w-5 h-5" />
                  <p className="text-white text-sm lg:text-base font-medium">
                    +374(00)000-000
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Product Image & Info - Now in single column on desktop too */}
            <div className="bg-white rounded-2xl lg:rounded-[30px] p-6 lg:p-8 shadow-sm">
              {/* Top Row: Image and Quick Info */}
              <div className="flex flex-col lg:flex-row gap-8 mb-8">
                {/* Product Image */}
                <div className="lg:w-2/5">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center p-4 lg:p-8">
                    <img 
                      src={medicine} 
                      alt="Medicine" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Quick Product Info */}
                <div className="lg:w-3/5">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1">
                      <h1 className="text-2xl lg:text-3xl font-bold text-[#404A3D] mb-3">
                        Դիրոֆեն հաբեր
                      </h1>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Արտադրող:</span>
                          <span className="font-medium text-[#404A3D]">Ֆիրմայի Անունը</span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-[#404A3D] mb-6">
                        45,000 ֏
                      </div>
                    </div>
                    
                    {/* CTA Button - Sticky on mobile */}
                    <button className="w-full lg:w-auto bg-[#404A3D] hover:bg-[#2d3329] text-white py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-all duration-200 font-medium group">
                      <ShoppingCart className="w-5 h-5" />
                      <span>ԳՆԵԼ ՀԻՄԱ</span>
                    </button>
                  </div>

                  {/* Short Description */}
                  <div className="mt-6 lg:mt-0 pt-6 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      Դիրոֆեն դեղահաբերը ցուցված են փոքր և միջին ցեղատեսակների
                      կատուների և շների կլոր և ժապավենաձև որդերի դեմ պայքարի համար։
                      Ազդում է ինչպես հասուն որդերի, այնպես էլ նրանց թրթուրների վրա։
                    </p>
                  </div>
                </div>
              </div>

              {/* Full Description */}
              <div className="pt-8 border-t border-gray-100">
                <h2 className="text-xl lg:text-2xl font-semibold text-[#404A3D] mb-6">
                  Մանրամասն նկարագիր
                </h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Դիրոֆեն դեղահաբերը ցուցված են փոքր և միջին ցեղատեսակների
                      կատուների և շների կլոր և ժապավենաձև որդերի դեմ պայքարի
                      համար։ Ազդում է ինչպես հասուն որդերի, այնպես էլ նրանց
                      թրթուրների վրա։
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Կիրառումից հետո դեղամիջոցը արագ ներծծվում է և սկսում է
                      գործել 30 րոպեի ընթացքում։ Բարձր արդյունավետություն
                      ապահովում է մինչև 3 ամիս։
                    </p>
                  </div>
                  
                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Feature Card 1 */}
                    <div className="bg-gray-50 rounded-xl p-5 flex gap-4 items-start">
                      <div className="w-10 h-10 shrink-0 bg-[#0E99A2] rounded-full flex items-center justify-center">
                        <img src={pass} alt="Usage" className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#404A3D] mb-2">
                          Կիրառման եղանակ
                        </h3>
                        <p className="text-sm text-gray-600">
                          Կանխարգելիչ նպատակներով որդերի դեմ պայքարը կատարվում է մեկ
                          անգամ, եռամսյակը մեկ և յուրաքանչյուր պատվաստումից առաջ։
                        </p>
                      </div>
                    </div>

                    {/* Feature Card 2 */}
                    <div className="bg-gray-50 rounded-xl p-5 flex gap-4 items-start">
                      <div className="w-10 h-10 shrink-0 bg-[#EFD45C] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-[#404A3D] mb-2">
                          Պահպանում
                        </h3>
                        <p className="text-sm text-gray-600">
                          Պահպանել չոր, մութ տեղում, սենյակային ջերմաստիճանում,
                          երեխաների համար հասանելիությունից դուրս։
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile CTA Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button className="w-14 h-14 rounded-full bg-[#404A3D] hover:bg-[#2d3329] text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200">
          <ShoppingCart className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;