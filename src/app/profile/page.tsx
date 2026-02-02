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
  { id: '1', author: 'Lizaveta Uzdenova', rating: 5, text: 'Брали два хот-дога, приготовили за 15–20 минут. Порции большие и сытные, а самое главное — вкусные. Народу было очень много, целая посадка. Молодцы 🔥' },
  { id: '2', author: 'Джамалудин Джамалудинов', rating: 5, text: 'Бомбовый кассир.' },
  { id: '3', author: 'Мух1амад Абуев', rating: 5, text: 'Приготовили буквально за пару минут и очень очень вкусно честно теперь буду заходить хоть каждый день' },
  { id: '4', author: 'Estel Thierry', rating: 5, text: 'Классический хот-дог это просто наивысшем уровне за такую цену, БаркАллагь Место огонь 🔥' },
  { id: '5', author: 'Халид Махачев', rating: 5, text: 'Заведение одно из очень крутых, где можно поесть и пообщаться с приятными людьми!!!!' },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#050505] pt-8 pb-24">
      
      {/* Отзывы */}
      <motion.section
        className="relative py-16 px-4 z-10"
        {...scrollReveal}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-6 text-center text-5xl font-black md:text-7xl text-white uppercase italic tracking-tighter">
            Отзывы <span className="text-orange-500">гостей</span>
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-xl text-gray-400 font-light">
            <span className="text-amber-400 font-bold">4,8</span> (5 звёзд) · 113 оценок в{' '}
            <a href="https://yandex.ru/maps/org/golod/38136415699/reviews/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Яндекс.Картах</a>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewsData.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex flex-col hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-white/20'}
                    />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-4">&laquo;{review.text}&raquo;</p>
                <span className="text-orange-500 font-bold text-sm">{review.author}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Контакты */}
      <motion.section 
        className="relative py-16 px-4 z-10 border-t border-white/5"
        {...scrollReveal}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-16 text-center text-5xl font-black md:text-6xl text-white uppercase italic tracking-tighter">
            Наши <span className="text-orange-500">контакты</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              
              {/* Адрес */}
              <div className="group rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex items-center gap-6 hover:bg-white/10 transition-colors">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                  <MapPin className="w-8 h-8 text-white group-hover:text-orange-500 transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Адрес</h3>
                  <p className="text-gray-400 text-lg">г. Хасавюрт, ул. Воробьёва, 35Б</p>
                </div>
              </div>

              {/* Телефон */}
              <a href="tel:+79286780666" className="group rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex items-center gap-6 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <Phone className="w-8 h-8 text-white group-hover:text-green-500 transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Телефон</h3>
                  <span className="text-gray-400 group-hover:text-white text-lg transition-colors font-mono">
                    +7 928 678-06-66
                  </span>
                </div>
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/golod_fastfood/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex items-center gap-6 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-pink-500/20 transition-colors">
                  <Instagram className="w-8 h-8 text-white group-hover:text-pink-500 transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Instagram</h3>
                  <span className="text-gray-400 group-hover:text-white text-lg transition-colors">
                    @golod_fastfood
                  </span>
                </div>
              </a>

            </div>
            
            {/* Карта */}
            <div className="h-[450px] w-full rounded-[2.5rem] overflow-hidden border border-white/10 relative group">
              <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700">
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
              <div className="absolute inset-0 pointer-events-none border-[1px] border-white/10 rounded-[2.5rem] shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]" />
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
