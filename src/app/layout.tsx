import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { langInitScript } from "@/i18n/config";
import I18nProvider from "@/i18n/I18nProvider";
import { siteConfig } from "@/lib/site";
import ThemeProvider from "@/theme/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${inter.variable} h-full scroll-smooth antialiased scheme-light dark:scheme-dark`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: langInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-text [[data-lang-pending]_&]:invisible">
        <ThemeProvider>
          <I18nProvider>
            <Navbar />
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
