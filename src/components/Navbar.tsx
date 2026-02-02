'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Phone, Menu, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

const navLinks = [
  { label: 'Меню', href: '#menu' },
  { label: 'Акции', href: '#promo' },
  { label: 'О нас', href: '#about' },
  { label: 'Контакты', href: '#contact' },
]

export function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const { setIsCartOpen, items } = useCart()

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
  const prevTotalRef = useRef(totalItems)
  const [cartPulse, setCartPulse] = useState(false)

  useEffect(() => {
    if (totalItems > prevTotalRef.current) {
      setCartPulse(true)
      const t = setTimeout(() => setCartPulse(false), 600)
      prevTotalRef.current = totalItems
      return () => clearTimeout(t)
    }
    prevTotalRef.current = totalItems
  }, [totalItems])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() || 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setScrolled(latest > 50)
  })

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`hidden md:block fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/60 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Логотип */}
        <Link href="/" className="relative z-10 group">
          <span className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase italic">
            GOLOD
            <span className="text-orange-500">.</span>
          </span>
        </Link>

        {/* Десктоп: меню по центру */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2" aria-label="Основное меню">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:text-white focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Справа: телефон (десктоп) + корзина + бургер (мобильный) */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+79286780666"
            className="hidden md:flex items-center gap-2 text-sm font-bold text-white hover:text-orange-500 transition-colors"
          >
            <Phone size={18} />
            <span>+7 928 678-06-66</span>
          </a>

          <motion.button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label={totalItems > 0 ? `Корзина: ${totalItems} товаров` : 'Открыть корзину'}
            animate={cartPulse ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative group bg-white/10 hover:bg-orange-600 text-white p-3 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                {totalItems}
              </span>
            )}
          </motion.button>

          {/* Кнопка бургер-меню (только мобильный) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-3 text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Мобильное меню (выдвижная панель) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[min(320px,85vw)] bg-[#0f0f0f] border-l border-white/10 z-50 md:hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 pt-14 border-b border-white/10 flex justify-between items-center">
                <span className="text-lg font-bold text-white uppercase">Меню</span>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label="Закрыть меню"
                  className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex-1 p-6 flex flex-col gap-2" aria-label="Мобильное меню">
                {navLinks.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={closeMobileMenu}
                    className="py-4 px-4 text-lg font-bold uppercase tracking-wider text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </nav>
              <div className="p-6 border-t border-white/10">
                <a
                  href="tel:+79286780666"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 py-4 px-4 rounded-xl bg-white/5 hover:bg-orange-600/20 text-white font-bold transition-colors"
                >
                  <Phone size={22} />
                  <span>+7 928 678-06-66</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}