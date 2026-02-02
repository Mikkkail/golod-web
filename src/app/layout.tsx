import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";
import { Navbar } from "@/components/Navbar";
import { BottomTabBar } from "@/components/BottomTabBar";

// Импортируем наши визуальные эффекты
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Preloader } from "@/components/ui/Preloader"; // <--- 1. Импорт прелоадера

const inter = Inter({ 
  subsets: ["latin", "cyrillic"], 
  variable: "--font-inter" 
});

const oswald = Oswald({ 
  subsets: ["latin", "cyrillic"], 
  variable: "--font-oswald" 
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://golod.ru";

export const metadata: Metadata = {
  title: "ГОЛОД — Премиум Бургеры",
  description: "Лучшие бургеры в городе. Халяль. 24/7. Доставка и самовывоз.",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/images/hero-burger.png",
    apple: "/images/hero-burger.png",
  },
  openGraph: {
    title: "ГОЛОД — Премиум Бургеры",
    description: "Лучшие бургеры в городе. Халяль. 24/7.",
    locale: "ru_RU",
    images: [
      {
        url: "/images/hero-burger.png",
        width: 1200,
        height: 630,
        alt: "ГОЛОД — Премиум Бургеры",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ГОЛОД — Премиум Бургеры",
    description: "Лучшие бургеры в городе. Халяль. 24/7.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${oswald.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F97316" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then(reg => console.log('SW registered:', reg))
                  .catch(err => console.log('SW registration failed:', err));
              });
            }
          `
        }} />
      </head>
      <body className="antialiased pb-20">
        <CartProvider>
          {/* 2. Вставляем Прелоадер самым первым */}
          <Preloader />
          
          {/* Desktop-only эффекты */}
          <div className="hidden md:block">
            <SmoothScroll />
            <CustomCursor />
          </div>
          
          <Navbar />
          
          <main className="min-h-screen">
            {children}
          </main>
          
          <BottomTabBar />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}