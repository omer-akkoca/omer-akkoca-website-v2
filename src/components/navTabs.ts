import type { IconType } from "react-icons";
import { FaBookOpen, FaHouse } from "react-icons/fa6";
import type { TranslationKey } from "@/i18n/T";

// Navbar tabs, shared by the desktop top bar (text labels) and the mobile
// bottom tab bar (icons, label used as aria-label).
export const TABS: { href: string; label: TranslationKey; icon: IconType }[] = [
  { href: "/", label: "home", icon: FaHouse },
  { href: "/books", label: "navBooks", icon: FaBookOpen },
  //{ href: "/films", label: "films", icon: FaFilm },
];

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
