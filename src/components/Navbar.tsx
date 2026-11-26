"use client";

import { animate, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/i18n/useLocale";
import LanguageSwitcher from "./LanguageSwitcher";
import { NAV_GLASS, NAV_PILL } from "./navStyles";
import { isActive, TABS } from "./navTabs";
import ThemeToggle from "./ThemeToggle";

// Matches Tailwind's `sm` breakpoint: below it the top bar is hidden and the
// tabs live in MobileTabBar.
const DESKTOP_QUERY = "(min-width: 40rem)";

export default function Navbar() {
  const { t } = useT();
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef(0);
  const [isFixed, setIsFixed] = useState(false);

  // In flow at the top; once scrolled by the navbar's own height it becomes
  // fixed. The bar's measured height is kept in `--navbar-height` on the
  // wrapper, so the wrapper holds that space in flow while the bar is fixed
  // (no content jump) and the threshold stays stable.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const bar = barRef.current;
    if (!wrapper || !bar) return;

    const desktop = window.matchMedia(DESKTOP_QUERY);
    const update = () =>
      setIsFixed(desktop.matches && window.scrollY >= heightRef.current);
    const observer = new ResizeObserver(() => {
      heightRef.current = bar.offsetHeight;
      wrapper.style.setProperty("--navbar-height", `${bar.offsetHeight}px`);
      update();
    });
    observer.observe(bar);
    window.addEventListener("scroll", update, { passive: true });
    desktop.addEventListener("change", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      desktop.removeEventListener("change", update);
    };
  }, []);

  // Slide the bar in from above when it becomes fixed.
  useEffect(() => {
    if (isFixed && barRef.current) {
      animate(
        barRef.current,
        { y: ["-100%", "0%"] },
        { type: "spring", stiffness: 400, damping: 35 },
      );
    }
  }, [isFixed]);

  return (
    <div ref={wrapperRef} className="h-(--navbar-height) max-sm:hidden">
      <div
        ref={barRef}
        className={isFixed ? "fixed inset-x-0 top-0 z-50" : "relative"}
      >
        <div className="mx-auto w-full max-w-3xl px-4 py-4 sm:px-6">
          <div
            className={`${NAV_GLASS} flex w-full items-center justify-between gap-2 p-1.5`}
          >
            <nav
              aria-label={t("mainNav")}
              className="flex items-center gap-0.5"
            >
              {TABS.map(({ href, label }) => {
                const active = isActive(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-3 py-2 transition-colors duration-200 sm:px-4 ${
                      active ? "text-primary" : "text-text hover:text-primary"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 40,
                        }}
                        className={`absolute inset-0 ${NAV_PILL}`}
                      />
                    )}
                    <span className="relative text-nav whitespace-nowrap font-medium">
                      {t(label)}
                    </span>
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center gap-0.5">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
