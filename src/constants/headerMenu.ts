import type {
  NavigationType,
} from "@/types/headerMenu";


export const navigationItems: NavigationType[] = [
  { text: "header.nav.home", active: false, hasMenu: false, route: "/" },
  { text: "header.nav.catalog", active: true, hasMenu: true, route: "/catalog" },
  { text: "header.nav.cart", active: false, hasMenu: false, route: "/cart" },
  { text: "header.nav.news", active: false, hasMenu: false, route: "/news" },
  {text: "header.nav.faq", active: false, hasMenu: false, route: "/faq"}
];
