'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      {/* Видео-фон на весь экран */}
      <video 
        autoPlay muted loop playsInline 
        className="absolute h-full w-full object-cover opacity-60"
      >
        <source src="/burger-vid.mp4" type="video/mp4" />
      </video>

      {/* Кинематографичное затемнение для читаемости текста */}
      <div className="absolute inset-0 overlay-cinema" />

      {/* Контент */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-full border border-orange-500/30 bg-black/50 px-6 py-2 text-sm tracking-[0.3em] text-orange-500 uppercase"
        >
          ● Premium Burger House
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 text-6xl font-[900] italic tracking-tighter text-white uppercase md:text-9xl leading-[0.9]"
        >
          ВКУС <span className="text-orange-600">СТРАСТИ</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12 max-w-2xl text-lg text-gray-400 md:text-xl font-light"
        >
          Гастрономическое безумие в самом сердце Хасавюрта. 
          Легендарные бургеры, которые меняют представление о вкусе.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/menu" className="group relative block overflow-hidden bg-fire px-16 py-6 text-2xl font-black text-white transition-opacity hover:opacity-90">
            ЗАКАЗАТЬ ОНЛАЙН
          </Link>
        </motion.div>
      </div>
    </main>
  );
}