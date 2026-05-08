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
  title: "MFT — Moscow Factory Tech",
  description:
    "Разрабатываем мобильные приложения, веб-платформы и цифровые продукты под ключ.",
  openGraph: {
    title: "MFT — Moscow Factory Tech",
    description: "Разрабатываем мобильные приложения, веб-платформы и цифровые продукты под ключ.",
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
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-[#f0f0f0]">
        {children}
      </body>
    </html>
  );
}
