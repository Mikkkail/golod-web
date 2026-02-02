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
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#080808] pt-24 text-white">
      {/* Контент подвала */}
      <div className="relative z-10 mx-auto mb-20 grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-4">
        {/* Колонка 1: Лого и слоган */}
        <div className="space-y-6 md:col-span-2">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">
            GOLOD<span className="text-orange-500">.</span>
          </h2>
          <p className="max-w-sm text-lg text-gray-400">
            Мы меняем представление о фастфуде. Мраморная говядина, свежие овощи и никакого
            компромисса во вкусе.
          </p>
          <div className="flex gap-4 pt-4">
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="rounded-full border border-white/10 px-4 py-2 text-sm transition-all hover:border-orange-600 hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Колонка 2: Навигация — якоря открывают нужную вкладку меню */}
        <div>
          <h3 className="mb-6 text-lg font-bold text-orange-500">Меню</h3>
          <ul className="space-y-4 text-gray-400">
            {menuCategoryLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="cursor-pointer transition-colors hover:text-white focus:outline-none focus-visible:text-white focus-visible:underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Колонка 3: Информация */}
        <div>
          <h3 className="mb-6 text-lg font-bold text-orange-500">Информация</h3>
          <ul className="space-y-4 text-gray-400">
            {infoLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="cursor-pointer transition-colors hover:text-white focus:outline-none focus-visible:text-white focus-visible:underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ОГРОМНЫЙ ТЕКСТ ВНИЗУ */}
      <div className="relative overflow-hidden border-t border-white/5 pb-4 pt-10 text-center">
        {/* Этот текст будет занимать почти весь экран по ширине */}
        <h1 className="pointer-events-none select-none text-[15vw] font-black leading-[0.8] text-[#111]">
          GOLOD
        </h1>

        <div className="absolute bottom-4 w-full text-center text-xs uppercase tracking-widest text-gray-600">
          © 2026 Golod Premium Food. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
