'use client'

import React, { useRef } from 'react'
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'
// Добавил иконку BookOpen для меню, так логичнее, чем Play
import { ArrowRight, BookOpen } from 'lucide-react'

export function HeroSection() {
  const ref = useRef(null)

  // -- НАСТРОЙКИ ПАРАЛЛАКСА --
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <section
      ref={ref}
      className="perspective-[1000px] relative flex min-h-[100vh] items-center overflow-hidden bg-[#050505]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. ВИДЕО ФОН — слой с GPU-ускорением для плавного FPS */}
      <div
        className="absolute inset-0 z-0 [backface-visibility:hidden] [contain:strict] [transform:translateZ(0)] [will-change:transform]"
        style={{ isolation: 'isolate' }}
      >
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-60 [backface-visibility:hidden] [transform:translateZ(0)]"
          src="/burger-vid.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay [contain:strict]"
          style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
        />
      </div>

      <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        {/* ЛЕВАЯ ЧАСТЬ: ТЕКСТ */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="pt-20 text-center lg:pt-0 lg:text-left"
        >
          {/* Бейдж */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-5 py-2 shadow-2xl backdrop-blur-md"
          >
            <div className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-500"></span>
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-white">
              Live Kitchen
            </span>
          </motion.div>

          {/* Заголовок */}
          <div className="relative">
            <h1 className="absolute left-2 top-2 mb-8 select-none pr-12 text-7xl font-black uppercase italic leading-[0.85] tracking-tighter text-white opacity-50 mix-blend-overlay blur-sm md:text-9xl">
              ВКУС
              <br />
              СТРАСТИ
            </h1>

            <h1 className="relative z-10 mb-8 text-7xl font-black uppercase italic leading-[0.85] tracking-tighter text-white md:text-9xl">
              ВКУС <br />
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-600 bg-clip-text pr-12 text-transparent drop-shadow-[0_0_40px_rgba(234,88,12,0.5)]">
                СТРАСТИ
              </span>
            </h1>
          </div>

          <p className="mx-auto mb-12 max-w-lg text-xl font-light leading-relaxed text-gray-300 drop-shadow-md lg:mx-0">
            Смотри, как мы готовим твой идеальный бургер. Открытая кухня, мраморная говядина и
            огонь.
          </p>

          {/* КНОПКИ (ТЕПЕРЬ ОБЕ РАБОТАЮТ) */}
          <div className="flex flex-col justify-center gap-6 sm:flex-row lg:justify-start">
            {/* Кнопка 1: ЗАКАЗАТЬ -> Ведет на #menu */}
            <a
              href="#menu"
              className="group relative flex cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-2xl bg-orange-600 px-12 py-6 text-xl font-black uppercase italic tracking-wider text-white shadow-[0_20px_50px_-10px_rgba(234,88,12,0.6)] transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Заказать <ArrowRight className="transition-transform group-hover:translate-x-2" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>

            {/* Кнопка 2: МЕНЮ -> Ведет на #menu (Заменил button на a) */}
            <a
              href="#menu"
              className="group flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-12 py-6 text-xl font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              {/* Поменял иконку Play на BookOpen (Меню) */}
              <BookOpen
                size={20}
                className="text-white transition-transform group-hover:scale-125"
              />
              <span className="opacity-80 group-hover:opacity-100">Меню</span>
            </a>
          </div>
        </motion.div>

        {/* ПРАВАЯ ЧАСТЬ ПУСТАЯ ДЛЯ ВИДЕО */}
        <div className="hidden h-[500px] lg:block"></div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-40 w-full bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
    </section>
  )
}
