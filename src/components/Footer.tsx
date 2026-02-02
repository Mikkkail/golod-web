'use client'

import Link from 'next/link'
import { restaurantInfo } from '@/data/menu'

const socialLinks = [
  { label: 'Instagram', href: restaurantInfo.social.instagram },
  { label: 'Telegram', href: restaurantInfo.social.telegram },
  { label: 'WhatsApp', href: restaurantInfo.social.whatsapp },
]

const infoLinks = [
  { label: 'О нас', href: '#about' },
  { label: 'Доставка и оплата', href: '#promo' },
  { label: 'Контакты', href: '#contact' },
  { label: 'Публичная оферта', href: '#' },
]

/** Ссылки на категории меню — открывают нужную вкладку по якорю #menu-<id> */
const menuCategoryLinks = [
  { label: 'Бургеры', href: '#menu-burgers' },
  { label: 'Сэндвичи', href: '#menu-sandwiches' },
  { label: 'Твистеры и шаурма', href: '#menu-rolls' },
  { label: 'Закуски', href: '#menu-snacks' },
]

export function Footer() {
  return (
    <footer className="relative bg-[#080808] text-white pt-24 overflow-hidden border-t border-white/5">
      
      {/* Контент подвала */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 relative z-10">
        
        {/* Колонка 1: Лого и слоган */}
        <div className="md:col-span-2 space-y-6">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">
              GOLOD<span className="text-orange-500">.</span>
            </h2>
            <p className="text-gray-400 max-w-sm text-lg">
              Мы меняем представление о фастфуде. 
              Мраморная говядина, свежие овощи и никакого компромисса во вкусе.
            </p>
            <div className="flex gap-4 pt-4">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="px-4 py-2 border border-white/10 rounded-full text-sm hover:bg-orange-600 hover:border-orange-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
                >
                  {label}
                </a>
              ))}
            </div>
        </div>

        {/* Колонка 2: Навигация — якоря открывают нужную вкладку меню */}
        <div>
          <h3 className="text-lg font-bold mb-6 text-orange-500">Меню</h3>
          <ul className="space-y-4 text-gray-400">
            {menuCategoryLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:text-white focus-visible:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Колонка 3: Информация */}
        <div>
          <h3 className="text-lg font-bold mb-6 text-orange-500">Информация</h3>
          <ul className="space-y-4 text-gray-400">
            {infoLinks.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:text-white focus-visible:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ОГРОМНЫЙ ТЕКСТ ВНИЗУ */}
      <div className="relative border-t border-white/5 pt-10 pb-4 text-center overflow-hidden">
         {/* Этот текст будет занимать почти весь экран по ширине */}
         <h1 className="text-[15vw] leading-[0.8] font-black text-[#111] select-none pointer-events-none">
            GOLOD
         </h1>
         
         <div className="absolute bottom-4 w-full text-center text-xs text-gray-600 uppercase tracking-widest">
            © 2026 Golod Premium Food. All rights reserved.
         </div>
      </div>
    </footer>
  )
}