import type {
  NavigationType,
} from "@/types/headerMenu";

export const navigationItems: NavigationType[] = [
  { text: "ԳԼԽԱՎՈՐ", active: false, hasMenu: false, route: "/" },
  { text: "ԿԱՏԱԼՈԳ", active: true, hasMenu: true, route: "/catalog" },
  { text: "ԶԱՄԲՅՈՒՂ", active: false, hasMenu: false, route: "/cart" },
];
