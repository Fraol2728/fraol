import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://yourportfolio.com"),
  title: { default: "Your Name | Graphic Designer & Web Developer", template: "%s | Your Name" },
  description: "Portfolio of [Your Name] — Graphic Designer and Web Developer based in Addis Ababa, Ethiopia. Crafting bold visuals and seamless digital products.",
  keywords: ["graphic designer", "web developer", "portfolio", "Next.js", "UI/UX", "Addis Ababa", "Ethiopia", "branding", "web design", "frontend developer"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: { type: "website", locale: "en_US", url: "https://yourportfolio.com", title: "Your Name | Graphic Designer & Web Developer", description: "Portfolio of [Your Name] — crafting bold visuals and seamless digital products.", siteName: "Your Name Portfolio", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Your Name Portfolio" }] },
  twitter: { card: "summary_large_image", title: "Your Name | Graphic Designer & Web Developer", description: "Portfolio of [Your Name] — crafting bold visuals and seamless digital products.", images: ["/og-image.png"], creator: "@yourtwitter" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body></html>;
}
