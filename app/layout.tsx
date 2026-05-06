import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import env from "@/lib/env";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(env.site.url),
  title: { default: `${env.site.name} | Graphic Designer & Web Developer`, template: `%s | ${env.site.name}` },
  description: `Portfolio of ${env.site.name} — Graphic Designer and Web Developer based in Addis Ababa, Ethiopia. Crafting bold visuals and seamless digital products.`,
  keywords: ["graphic designer", "web developer", "portfolio", "Next.js", "UI/UX", "Addis Ababa", "Ethiopia", "branding", "web design", "frontend developer"],
  authors: [{ name: env.site.name }],
  creator: env.site.name,
  openGraph: { type: "website", locale: "en_US", url: env.site.url, title: `${env.site.name} | Graphic Designer & Web Developer`, description: `Portfolio of ${env.site.name} — crafting bold visuals and seamless digital products.`, siteName: `${env.site.name} Portfolio`, images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${env.site.name} Portfolio` }] },
  twitter: { card: "summary_large_image", title: `${env.site.name} | Graphic Designer & Web Developer`, description: `Portfolio of ${env.site.name} — crafting bold visuals and seamless digital products.`, images: ["/og-image.png"], creator: "@yourtwitter" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body></html>;
}
