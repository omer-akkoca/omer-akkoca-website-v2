import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import MobileTabBar from "@/components/MobileTabBar";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
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
      <body className="flex min-h-full flex-col bg-background font-sans text-text in-data-lang-pending:invisible">
        <ThemeProvider>
          <I18nProvider>
            <ScrollToTop />
            <Navbar />
            {children}
            <Footer />
            <MobileTabBar />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
