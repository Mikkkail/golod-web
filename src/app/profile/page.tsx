'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Instagram, Star } from 'lucide-react'
import { restaurantInfo } from '@/data/menu'

const scrollReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

// Реальные отзывы с Яндекс.Карт
const reviewsData = [
  {
    id: '1',
    author: 'Lizaveta Uzdenova',
    rating: 5,
    text: 'Брали два хот-дога, приготовили за 15–20 минут. Порции большие и сытные, а самое главное — вкусные. Народу было очень много, целая посадка. Молодцы 🔥',
  },
  { id: '2', author: 'Джамалудин Джамалудинов', rating: 5, text: 'Бомбовый кассир.' },
  {
    id: '3',
    author: 'Мух1амад Абуев',
    rating: 5,
    text: 'Приготовили буквально за пару минут и очень очень вкусно честно теперь буду заходить хоть каждый день',
  },
  {
    id: '4',
    author: 'Estel Thierry',
    rating: 5,
    text: 'Классический хот-дог это просто наивысшем уровне за такую цену, БаркАллагь Место огонь 🔥',
  },
  {
    id: '5',
    author: 'Халид Махачев',
    rating: 5,
    text: 'Заведение одно из очень крутых, где можно поесть и пообщаться с приятными людьми!!!!',
  },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#050505] pb-24 pt-8">
      {/* Отзывы */}
      <motion.section className="relative z-10 px-4 py-16" {...scrollReveal}>
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 text-center text-5xl font-black uppercase italic tracking-tighter text-white md:text-7xl">
            Отзывы <span className="text-orange-500">гостей</span>
          </h2>
          <p className="mx-auto mb-16 max-w-7xl text-center text-xl font-light text-gray-400">
            <span className="font-bold text-amber-400">4,8</span> (5 звёзд) · 113 оценок в{' '}
            <a
              href="https://yandex.ru/maps/org/golod/38136415699/reviews/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:underline"
            >
              Яндекс.Картах
            </a>
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviewsData.map((review) => (
              <div
                key={review.id}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-colors duration-300 hover:bg-white/10"
              >
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-white/20'
                      }
                    />
                  ))}
                </div>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-300">
                  &laquo;{review.text}&raquo;
                </p>
                <span className="text-sm font-bold text-orange-500">{review.author}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Контакты */}
      <motion.section
        className="relative z-10 border-t border-white/5 px-4 py-16"
        {...scrollReveal}
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-16 text-center text-5xl font-black uppercase italic tracking-tighter text-white md:text-6xl">
            Наши <span className="text-orange-500">контакты</span>
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-6">
              {/* Адрес */}
              <div className="group flex items-center gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-colors hover:bg-white/10">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-orange-500/20">
                  <MapPin className="h-8 w-8 text-white transition-colors group-hover:text-orange-500" />
                </div>
                <div>
                  <h3 className="mb-1 text-xl font-bold text-white">Адрес</h3>
                  <p className="text-lg text-gray-400">г. Хасавюрт, ул. Воробьёва, 35Б</p>
                </div>
              </div>

              {/* Телефон */}
              <a
                href="tel:+79286780666"
                className="group flex cursor-pointer items-center gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-colors hover:bg-white/10"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-green-500/20">
                  <Phone className="h-8 w-8 text-white transition-colors group-hover:text-green-500" />
                </div>
                <div>
                  <h3 className="mb-1 text-xl font-bold text-white">Телефон</h3>
                  <span className="font-mono text-lg text-gray-400 transition-colors group-hover:text-white">
                    +7 928 678-06-66
                  </span>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/golod_fastfood/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex cursor-pointer items-center gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-colors hover:bg-white/10"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-pink-500/20">
                  <Instagram className="h-8 w-8 text-white transition-colors group-hover:text-pink-500" />
                </div>
                <div>
                  <h3 className="mb-1 text-xl font-bold text-white">Instagram</h3>
                  <span className="text-lg text-gray-400 transition-colors group-hover:text-white">
                    @golod_fastfood
                  </span>
                </div>
              </a>
            </div>

            {/* Карта */}
            <div className="group relative h-[450px] w-full overflow-hidden rounded-[2.5rem] border border-white/10">
              <div className="absolute inset-0 grayscale transition-all duration-700 group-hover:grayscale-0">
                <iframe
                  src={`https://yandex.ru/map-widget/v1/?um=constructor%3A${encodeURIComponent(restaurantInfo.yandexMapConstructorId)}&amp;source=constructor`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  title="Карта: адрес ресторана"
                />
              </div>
              {/* Стеклянная рамка внутри */}
              <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] border-[1px] border-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]" />
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
