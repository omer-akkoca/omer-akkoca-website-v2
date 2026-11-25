// Shared Tailwind classes for the navbar (Navbar, LanguageSwitcher, ThemeToggle).
// Gradients use only the theme's background color; shadows use `shadow`, the
// opposite theme's background (dark in light theme, light in dark theme).

// Frosted-glass bar (iOS 26 "Liquid Glass"): translucent background gradient,
// a hairline edge and a soft shadow.
export const NAV_GLASS =
  "rounded-full border border-text/8 bg-linear-to-b from-background/85 to-background/60 shadow-md shadow-shadow/10 dark:shadow-shadow/90 backdrop-blur-2xl backdrop-saturate-150";

// Capsule behind the active tab.
export const NAV_PILL =
  "rounded-full bg-linear-to-b from-background to-background/70 inset-shadow-sm inset-shadow-shadow/15 ring-1 ring-text/8 ring-inset";

// The same capsule, shown on hover / keyboard focus (language and theme buttons).
// Written out literally so Tailwind can detect every class.
export const NAV_PILL_HOVER =
  "rounded-full ring-inset hover:bg-linear-to-b hover:from-background hover:to-background/70 hover:inset-shadow-sm hover:inset-shadow-shadow/15 hover:ring-1 hover:ring-text/8 hover:text-primary focus-visible:bg-linear-to-b focus-visible:from-background focus-visible:to-background/70 focus-visible:inset-shadow-sm focus-visible:inset-shadow-shadow/15 focus-visible:ring-1 focus-visible:ring-text/8 focus-visible:text-primary focus-visible:outline-none";
