import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moscow Factory Tech — разработка IT-продуктов",
  description: "Надёжный технологический партнёр для бизнеса. Разрабатываем веб-сайты, мобильные приложения, AI-решения и автоматизацию под ключ.",
  metadataBase: new URL("https://moscowfactory.tech"),
  openGraph: {
    title: "Moscow Factory Tech — разработка IT-продуктов",
    description: "Надёжный технологический партнёр для бизнеса. Разрабатываем веб-сайты, мобильные приложения, AI-решения и автоматизацию под ключ.",
    url: "https://moscowfactory.tech",
    siteName: "Moscow Factory Tech",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
