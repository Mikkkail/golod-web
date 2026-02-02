'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Truck, Smartphone, Flame } from 'lucide-react'

const scrollReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

export default function PromoPage() {
  return (
    <div className="min-h-screen bg-[#050505] pb-24 pt-8">
      <motion.section className="relative z-10 px-4 py-16" {...scrollReveal}>
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-5xl font-black uppercase italic tracking-tighter text-white md:text-7xl">
            Актуальные{' '}
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text pr-4 text-transparent">
              акции
            </span>
          </h1>
          <p className="mx-auto mb-16 max-w-2xl text-xl font-light text-gray-400">
            Лови момент. Вкуснее уже не будет.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Карточка 1: Доставка */}
            <div className="group rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-left backdrop-blur-xl transition-all hover:-translate-y-2">
              <div className="mb-6">
                <Truck className="h-16 w-16 text-white drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-colors group-hover:text-blue-400" />
              </div>
              <h3 className="mb-2 text-2xl font-black uppercase text-white">Бесплатная доставка</h3>
              <p className="text-lg text-gray-400">При заказе от 1000₽ привезем за наш счет.</p>
            </div>

            {/* Карточка 2: Скидка */}
            <div className="group rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-left backdrop-blur-xl transition-all hover:-translate-y-2">
              <div className="mb-6">
                <Smartphone className="h-16 w-16 text-white drop-shadow-[0_0_20px_rgba(74,222,128,0.5)] transition-colors group-hover:text-green-400" />
              </div>
              <h3 className="mb-2 text-2xl font-black uppercase text-white">-10% Скидка</h3>
              <p className="text-lg text-gray-400">На первый заказ через наше приложение.</p>
            </div>

            {/* Карточка 3: ОГОНЬ */}
            <div className="group rounded-[2.5rem] border border-orange-500/30 bg-orange-600/10 p-10 text-left backdrop-blur-xl transition-all hover:-translate-y-2 hover:bg-orange-600/20">
              <div className="mb-6">
                {/* Анимация pulse для огня */}
                <Flame className="h-16 w-16 animate-pulse text-orange-500 drop-shadow-[0_0_30px_rgba(234,88,12,0.8)]" />
              </div>
              <h3 className="mb-2 text-2xl font-black uppercase italic text-orange-500">
                Комбо Дня
              </h3>
              <p className="text-lg text-gray-300">
                Бургер + Фри + Напиток = <span className="font-bold text-white">450₽</span>
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
