'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Phone, Menu, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

const navLinks = [
  { label: 'Меню', href: '/menu' },
  { label: 'Акции', href: '/promo' },
  { label: 'О нас', href: '/#about' },
  { label: 'Контакты', href: '/#contact' },
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
      className="fixed inset-x-0 top-0 z-50 hidden w-full border-b border-white/5 bg-black/60 py-4 backdrop-blur-xl md:block md:py-3"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Логотип */}
        <Link href="/" className="group relative z-10">
          <span className="text-2xl font-black uppercase italic tracking-tighter text-white md:text-3xl">
            GOLOD
            <span className="text-orange-500">.</span>
          </span>
        </Link>

        {/* Десктоп: меню по центру */}
        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
          aria-label="Основное меню"
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="rounded text-sm font-bold uppercase tracking-widest text-gray-400 transition-colors hover:text-white focus:outline-none focus-visible:text-white focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Справа: телефон (десктоп) + корзина + бургер (мобильный) */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+79286780666"
            className="hidden items-center gap-2 text-sm font-bold text-white transition-colors hover:text-orange-500 md:flex"
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
            className="group relative rounded-full bg-white/10 p-3 text-white transition-colors duration-300 hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black shadow-lg">
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
            className="rounded-full p-3 text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 md:hidden"
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
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="fixed bottom-0 right-0 top-0 z-50 flex w-[min(320px,85vw)] flex-col border-l border-white/10 bg-[#0f0f0f] shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 p-6 pt-14">
                <span className="text-lg font-bold uppercase text-white">Меню</span>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label="Закрыть меню"
                  className="rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-2 p-6" aria-label="Мобильное меню">
{navLinks.map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={closeMobileMenu}
                      className="rounded-xl px-4 py-4 text-lg font-bold uppercase tracking-wider text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {label}
                    </Link>
                  ))}
              </nav>
              <div className="border-t border-white/10 p-6">
                <a
                  href="tel:+79286780666"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-4 font-bold text-white transition-colors hover:bg-orange-600/20"
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
