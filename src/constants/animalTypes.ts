import type { AnimalCardType } from "@/types/animalCard";
import beef from "@/assets/icons/beef.svg";
import sheep from "@/assets/icons/sheep.svg";
import bird from "@/assets/icons/bird.svg";
import pig from "@/assets/icons/pig.svg";
import horse from "@/assets/icons/horse.svg";
import phish from "@/assets/icons/phish.svg";
import rabbit from "@/assets/icons/rabbit.svg";
import spider from "@/assets/icons/spider.svg";

export const animalTypes: AnimalCardType[] = [
    {
        icon: beef,
        name: "ԽԵԿ",
        description: "Խոշոր եղջերավոր անասուն կամ տավար"
    },

    {
        icon: sheep,
        name: "ՄԵԿ",
        description: "Մանր եղջերավոր  կաթնասուն կենդանիներ՝ ոչխարներ, այծեր"
    },
    {
        icon: bird,
        name: "Թռչուններ",
        description: "Թռչուններ, ինչպիսիք են հավերը, թութակները․․․"
    },
    {
        icon: pig,
        name: "Խոզեր",
        description: "Դեղամիջոցներ, նախատեսված խոզերի համար"
    },
    {
        icon: horse,
        name: "Ձիեր",
        description: "Դեղամիջոցներ, նախատեսված ձիերի համար"
    },
    {
        icon: phish,
        name: "Ձկներ",
        description: "Դեղամիջոցներ, նախատեսված ձկների համար"
    },
    {
        icon: rabbit,
        name: "Տնային մանր կենդանիներ",
        description: "Դեղամիջոցներ, նախատեսված մանր տնային կենդանիների համար"
    },
    {
        icon: spider,
        name: "Դեկորատիվ կենդանիներ",
        description: "Դեղամիջոցներ, նախատեսված  դեկորատիվ կենդանիների համար"
    }
]