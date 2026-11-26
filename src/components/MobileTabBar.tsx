"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useT } from "@/i18n/useLocale";
import { NAV_GLASS, NAV_PILL } from "./navStyles";
import { isActive, TABS } from "./navTabs";

// Mobile-only bottom tab bar: the navbar tabs as icons in the same frosted-glass
// bar, fixed to the bottom of the screen. The wrapper keeps the bar's measured
// height (`--tabbar-height`) in flow at the end of the page, so the footer is
// never hidden behind it.
export default function MobileTabBar() {
  const { t } = useT();
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const bar = barRef.current;
    if (!wrapper || !bar) return;

    const observer = new ResizeObserver(() => {
      wrapper.style.setProperty("--tabbar-height", `${bar.offsetHeight}px`);
    });
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="h-(--tabbar-height) sm:hidden">
      <div ref={barRef} className="fixed inset-x-0 bottom-0 z-50">
        <div className="mx-auto w-full max-w-3xl px-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <nav aria-label={t("mainNav")} className={`${NAV_GLASS} flex w-full items-center gap-0.5 p-1.5`}>
            {TABS.map(({ href, label, icon: Icon }) => {
              const active = isActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-label={t(label)}
                  title={t(label)}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex flex-1 justify-center rounded-full py-2.5 transition-colors duration-200 ${
                    active ? "text-primary" : "text-text hover:text-primary"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-mobile"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      className={`absolute inset-0 ${NAV_PILL}`}
                    />
                  )}
                  <Icon aria-hidden="true" className="relative size-5" />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
