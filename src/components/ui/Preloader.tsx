'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    // 1. Блокируем прокрутку, пока идет "загрузка"
    document.body.style.overflow = 'hidden'

    // 2. Запускаем счетчик от 0 до 100
    const interval = setInterval(() => {
      setCounter((prev) => {
        // Если дошли до 100 — останавливаем
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Случайный шаг (чтобы цифры бежали живо, как в хакерских фильмах)
        const jump = Math.floor(Math.random() * 10) + 1
        return Math.min(prev + jump, 100)
      })
    }, 150)

    // 3. Через 0.5 секунды убираем прелоадер (оптимизация для мобильных)
    const timer = setTimeout(() => {
      setIsLoading(false)
      document.body.style.overflow = 'auto' // Возвращаем скролл
    }, 500)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <AnimatePresence mode='wait'>
      {isLoading && (
        <motion.div
          key="preloader"
          // Шторка уезжает вверх (-100%) с красивой инерцией
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050505] text-white"
        >
          <div className="flex flex-col items-center justify-center relative">
            
            {/* Пульсирующий Логотип */}
            <motion.h1 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter mb-2"
            >
              GOLOD<span className="text-orange-500">.</span>
            </motion.h1>

            {/* Текст "Loading..." */}
            <div className="flex items-center gap-4 mt-4">
               {/* Прогресс бар (линия) */}
               <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${counter}%` }}
                  />
               </div>
               {/* Цифры */}
               <span className="text-xl font-bold font-mono text-orange-500 w-12 text-right">
                 {counter}%
               </span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}