import shape from "@/assets/images/animalCardShape.png";
import type { AnimalCardType } from "@/types/animalCard";
import { animalIcons } from "@/constants/animalIcons";

const AnimalCard = ({ animal }: { animal: AnimalCardType }) => {
  return (
    <div
      className="relative bg-no-repeat bg-center bg-cover rounded-2xl overflow-hidden w-full h-full lg:max-w-md lg:aspect-448/272 flex flex-col "
      style={{
        backgroundImage: `url(${shape})`,
      }}
    >
      <div className="flex flex-col pt-8 sm:pt-10 md:pt-[45px] px-6 sm:px-7 md:px-[35px] pb-8 sm:pb-9 md:pb-10 rounded-2xl ">
        {/* Icon and Title */}
        <div className="flex gap-3 sm:gap-4 items-center mb-4">
          <div className="h-16 w-16 sm:h-[72px] sm:w-[72px] md:h-20 md:w-20 rounded-full bg-[#0E99A2] flex justify-center items-center shrink-0 transition-transform duration-300 group-hover:scale-110">
            <img
              src={animalIcons[animal.key as keyof typeof animalIcons]}
              alt={animal?.name}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-[37px] md:h-[39px] object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl md:text-2xl leading-tight md:leading-[30px] text-[#404A3D] font-semibold truncate">
              {animal?.name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <div className="border-t border-[#404A3D1A] pt-4 sm:pt-5 md:pt-6 flex-1">
          <p className="text-sm sm:text-base leading-relaxed text-[#666666] line-clamp-2">
            {animal?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
