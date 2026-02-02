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
    <div className="min-h-screen bg-[#050505] pt-8 pb-24">
      <motion.section
        className="relative py-16 px-4 z-10"
        {...scrollReveal}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="mb-6 text-5xl font-black md:text-7xl text-white uppercase italic tracking-tighter">
            Актуальные <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 pr-4">акции</span>
          </h1>
          <p className="mx-auto mb-16 max-w-2xl text-xl text-gray-400 font-light">
            Лови момент. Вкуснее уже не будет.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Карточка 1: Доставка */}
            <div className="group rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 p-10 text-left transition-all hover:-translate-y-2">
              <div className="mb-6">
                <Truck className="w-16 h-16 text-white group-hover:text-blue-400 transition-colors drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 uppercase">Бесплатная доставка</h3>
              <p className="text-gray-400 text-lg">При заказе от 1000₽ привезем за наш счет.</p>
            </div>

            {/* Карточка 2: Скидка */}
            <div className="group rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 p-10 text-left transition-all hover:-translate-y-2">
              <div className="mb-6">
                <Smartphone className="w-16 h-16 text-white group-hover:text-green-400 transition-colors drop-shadow-[0_0_20px_rgba(74,222,128,0.5)]" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 uppercase">-10% Скидка</h3>
              <p className="text-gray-400 text-lg">На первый заказ через наше приложение.</p>
            </div>

            {/* Карточка 3: ОГОНЬ */}
            <div className="group rounded-[2.5rem] bg-orange-600/10 backdrop-blur-xl border border-orange-500/30 p-10 text-left transition-all hover:-translate-y-2 hover:bg-orange-600/20">
              <div className="mb-6">
                {/* Анимация pulse для огня */}
                <Flame className="w-16 h-16 text-orange-500 animate-pulse drop-shadow-[0_0_30px_rgba(234,88,12,0.8)]" />
              </div>
              <h3 className="text-2xl font-black text-orange-500 mb-2 uppercase italic">Комбо Дня</h3>
              <p className="text-gray-300 text-lg">Бургер + Фри + Напиток = <span className="text-white font-bold">450₽</span></p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
