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
      className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#050505] perspective-[1000px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. ВИДЕО ФОН — слой с GPU-ускорением для плавного FPS */}
      <div 
        className="absolute inset-0 z-0 [contain:strict] [will-change:transform] [transform:translateZ(0)] [backface-visibility:hidden]"
        style={{ isolation: 'isolate' }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-60 [transform:translateZ(0)] [backface-visibility:hidden]"
          src="/burger-vid.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none [contain:strict]" 
             style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      </div>

      <div className="container px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* ЛЕВАЯ ЧАСТЬ: ТЕКСТ */}
        <motion.div 
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center lg:text-left pt-20 lg:pt-0"
        >
          {/* Бейдж */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 mb-8 border border-white/10 rounded-full bg-black/40 backdrop-blur-md shadow-2xl"
          >
            <div className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </div>
            <span className="text-xs font-black tracking-[0.2em] text-white uppercase">Live Kitchen</span>
          </motion.div>

          {/* Заголовок */}
          <div className="relative">
            <h1 className="text-7xl md:text-9xl font-black text-white leading-[0.85] mb-8 italic uppercase tracking-tighter mix-blend-overlay opacity-50 absolute top-2 left-2 blur-sm select-none pr-12">
              ВКУС<br/>СТРАСТИ
            </h1>
            
            <h1 className="text-7xl md:text-9xl font-black text-white leading-[0.85] mb-8 italic uppercase tracking-tighter relative z-10">
              ВКУС <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-600 drop-shadow-[0_0_40px_rgba(234,88,12,0.5)] pr-12">
                СТРАСТИ
              </span>
            </h1>
          </div>
          
          <p className="text-gray-300 text-xl mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light drop-shadow-md">
            Смотри, как мы готовим твой идеальный бургер. Открытая кухня, мраморная говядина и огонь.
          </p>
          
          {/* КНОПКИ (ТЕПЕРЬ ОБЕ РАБОТАЮТ) */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            
            {/* Кнопка 1: ЗАКАЗАТЬ -> Ведет на #menu */}
            <a 
              href="#menu" 
              className="group relative px-12 py-6 bg-orange-600 text-white rounded-2xl font-black text-xl uppercase italic tracking-wider overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_-10px_rgba(234,88,12,0.6)] flex items-center justify-center gap-3 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Заказать <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            {/* Кнопка 2: МЕНЮ -> Ведет на #menu (Заменил button на a) */}
            <a 
              href="#menu" 
              className="px-12 py-6 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-bold text-xl transition-all backdrop-blur-md flex items-center justify-center gap-3 group uppercase tracking-wider cursor-pointer"
            >
              {/* Поменял иконку Play на BookOpen (Меню) */}
              <BookOpen size={20} className="text-white group-hover:scale-125 transition-transform" />
              <span className="opacity-80 group-hover:opacity-100">Меню</span>
            </a>

          </div>
        </motion.div>

        {/* ПРАВАЯ ЧАСТЬ ПУСТАЯ ДЛЯ ВИДЕО */}
        <div className="hidden lg:block h-[500px]"></div>

      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-20 pointer-events-none" />
    </section>
  )
}