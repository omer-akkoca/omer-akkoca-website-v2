"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { DARK_QUERY, type Theme } from "./constants";

const CHANGE_EVENT = "theme-change";

// The initial theme is applied by Tailwind's `dark` variant (prefers-color-scheme).
// The toggle sets data-theme on <html> to override it; the choice is kept in
// memory only, so every visit starts with the device theme.
let override: Theme | null = null;

function getMedia(): MediaQueryList | null {
  try {
    return window.matchMedia(DARK_QUERY);
  } catch {
    return null;
  }
}

function readTheme(): Theme {
  if (override) return override;
  return getMedia()?.matches ? "dark" : "light";
}

function subscribe(callback: () => void) {
  const media = getMedia();
  media?.addEventListener("change", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    media?.removeEventListener("change", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function setTheme(theme: Theme) {
  override = theme;
  document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

type ThemeContextValue = { theme: Theme; setTheme: (theme: Theme) => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "light");

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
