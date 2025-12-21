const Benefits = () => {
  const benefits = [
    {
      number: "01",
      title: "Մեծ Տեսականի",
      description: "Շուկայում պահանջված անասնաբուժական դեղերի լայն տեսականի",
    },
    {
      number: "02",
      title: "Պահշար և առաքում",
      description: "Մշտական պահեստային պաշար և արագ առաքում",
    },
    {
      number: "03",
      title: "Պրոֆեսիոնալիզմ",
      description: "Մասնագիտական խորհրդատվություն և պատասխանատու մոտեցում",
    },
    {
      number: "04",
      title: "Կուտակորդներ",
      description: "Հավատարիմ գործընկերների արտադրողների հետ",
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Container with max-width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Extended Line - goes beyond container */}
          <div className="absolute left-0 right-0 hidden lg:block lg:top-[127px] h-px overflow-visible">
            <div className="absolute left-[-100vw] right-[-100vw] h-px bg-[#0E99A2]"></div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8 relative">
            {benefits.map((step, index) => (
              <div key={index} className="flex flex-col items-start">
                {/* Number with outline effect */}
                <div className="relative mb-6 sm:mb-8">
                  <h3
                    className="text-6xl sm:text-7xl md:text-8xl font-bold leading-none"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: "2px #E5E5E5",
                    }}
                  >
                    #{step.number}
                  </h3>
                </div>

                {/* Dot on line */}
                <div className="relative w-full mb-6">
                  <div className="absolute left-0 w-3 h-3 bg-[#0E99A2] rounded-full -translate-y-1/2"></div>
                </div>

                {/* Title */}
                <h4 className="text-xl sm:text-2xl md:text-[26px] font-semibold leading-tight text-[#404A3D] mb-3 sm:mb-4">
                  {step.title}
                </h4>

                {/* Description */}
                <p className="text-sm sm:text-base leading-relaxed text-[#666666]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
