'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Full-screen video background */}
      <div className="absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover"
          src="/burger-vid.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Overlay: title + CTA */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center text-6xl font-black uppercase italic tracking-tighter text-white drop-shadow-2xl sm:text-8xl md:text-9xl lg:text-[10rem]"
        >
          ГОЛОД
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/menu"
            className="inline-flex items-center justify-center rounded-2xl bg-[#F97316] px-12 py-5 text-lg font-black uppercase tracking-wider text-white shadow-[0_0_40px_rgba(249,115,22,0.5)] transition-all hover:bg-[#EA580C] hover:shadow-[0_0_60px_rgba(249,115,22,0.6)] md:px-16 md:py-6 md:text-xl"
          >
            Перейти к меню
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
