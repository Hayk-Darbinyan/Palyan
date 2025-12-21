import type { ServiceCardType } from "@/types/serviceCard";
import service1 from "@/assets/images/service1.png";
import service2 from "@/assets/images/service2.png";

export const services: ServiceCardType[] = [
  {
    img: service1,
    service: "ԴԵՂԱՄԻՋՈՑՆԵՐ",
    title: "ԼԱՎԱԳՈՒՅՆԸ` ԿԵՆԴԱՆԻՆԵՐԻ ՀԱՄԱՐ",
    description:
      "Սերտեֆիկացված և անվնաս դեղամիջոցներ անասունների, տնային կենդանիների համար",
  },
  {
    img: service2,
    service: "ԽՈՐՀՐԴԱՏՎՈՒԹՅՈՒՆ",
    title: "ՊՐՈՖԵՍԻՈՆԱԼ ՄՈՏԵՑՈՒՄ",
    description:
      "Մեր մասնագետները լավագույնն են իրենց ոլորտում, միշտ պատրաստ են խորհրդատվություն անցկացնել ",
  },
];
