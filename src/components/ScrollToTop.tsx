"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Next.js only scrolls on navigation when the new page isn't visible, and then
// to the page element (behind the navbar). Always jump to the very top on a
// route change instead. The first render is skipped so reloads and hash links
// keep the browser's own scroll position.
export default function ScrollToTop() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // "instant" overrides the `scroll-smooth` class on <html>.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
