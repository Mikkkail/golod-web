'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0A0A0A]">
      {/* Full-screen Hero: video + dark overlay */}
      <section className="absolute inset-0 z-0 min-h-screen">
        <video
          className="h-full w-full object-cover"
          src="/burger-vid.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden />
      </section>

      {/* Center: title + CTA — desktop-first, premium */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 md:px-12 lg:px-16">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center font-black uppercase italic leading-[0.9] tracking-tighter text-white drop-shadow-2xl max-sm:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
        >
          ВКУС СТРАСТИ
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 md:mt-16"
        >
          <Link
            href="/menu"
            className="inline-flex items-center justify-center rounded-2xl bg-[#F97316] px-14 py-5 text-base font-black uppercase tracking-wider text-white shadow-[0_0_40px_rgba(249,115,22,0.5)] transition-all hover:bg-[#EA580C] hover:shadow-[0_0_60px_rgba(249,115,22,0.6)] md:px-20 md:py-6 md:text-xl"
          >
            ПЕРЕЙТИ К МЕНЮ
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
