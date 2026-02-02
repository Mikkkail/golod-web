'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Check, Minus } from 'lucide-react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import ProductDetailsModal from '@/components/ProductDetailsModal'

// 1. Обновляем типы под новые данные
interface MenuItem {
  id: string
  title: string
  description: string
  price: string
  image: string
  weight: string
}

interface MenuCategory {
  id: string
  title: string
  description: string
  items: MenuItem[]
}

interface MenuSectionProps {
  categories: MenuCategory[]
}

function parsePrice(priceStr: string): number {
  const num = parseInt(priceStr.replace(/\D/g, ''), 10)
  return isNaN(num) ? 0 : num
}

const ADDED_FEEDBACK_MS = 1500

const HASH_PREFIX = '#menu-'

export function MenuSection({ categories }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0].id)
  const [addedItemId, setAddedItemId] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null)
  const { addToCart, getItemCount, setItemQuantity } = useCart()

  // Синхронизация вкладки с якорем (#menu-burgers → открыть «Бургеры»)
  useEffect(() => {
    const readHash = () => {
      const hash = typeof window !== 'undefined' ? window.location.hash : ''
      if (hash.startsWith(HASH_PREFIX)) {
        const id = hash.slice(HASH_PREFIX.length)
        if (categories.some((c) => c.id === id)) setActiveCategory(id)
      }
    }
    readHash()
    window.addEventListener('hashchange', readHash)
    return () => window.removeEventListener('hashchange', readHash)
  }, [categories])

  const handleTabClick = useCallback((categoryId: string) => {
    setActiveCategory(categoryId)
    if (typeof window !== 'undefined') window.location.hash = HASH_PREFIX + categoryId
  }, [])

  const handleAddToCart = useCallback(
    (item: { id: string; title: string; price: string; image: string }) => {
      addToCart({
        id: item.id,
        name: item.title,
        price: parsePrice(item.price),
        image: item.image,
      })
      setAddedItemId(item.id)
      setTimeout(() => setAddedItemId(null), ADDED_FEEDBACK_MS)
    },
    [addToCart]
  )

  const handleOpenDetails = useCallback((item: MenuItem) => {
    setSelectedProduct(item)
  }, [])

  const handleCloseDetails = useCallback(() => {
    setSelectedProduct(null)
  }, [])

  return (
    <section id="menu" className="min-h-screen bg-[#0a0a0a] py-24">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-black uppercase italic tracking-tighter text-white md:text-7xl">
            Наше <span className="text-orange-500">Меню</span>
          </h2>
          <p className="text-lg text-gray-400">Выбирай сердцем. Или желудком.</p>
        </div>

        {/* Переключатель категорий: на мобиле — горизонтальный скролл в одну полосу */}
        <div className="tabs-scroll sticky top-4 z-30 -mx-4 mb-12 flex flex-nowrap justify-start gap-4 overflow-x-auto scroll-smooth rounded-2xl bg-[#0a0a0a]/80 px-4 py-4 backdrop-blur-md md:mx-0 md:flex-wrap md:justify-center md:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleTabClick(cat.id)}
              className={`shrink-0 rounded-full border px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'scale-105 border-orange-500 bg-orange-500 text-white shadow-[0_0_20px_rgba(234,88,12,0.4)]'
                  : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Сетка товаров */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            {categories.map(
              (cat) =>
                cat.id === activeCategory && (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                  >
                    {cat.items.map((item) => (
                      <div
                        key={item.id}
                        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-orange-500/20 hover:bg-white/10 hover:shadow-[0_0_40px_-8px_rgba(234,88,12,0.25)]"
                      >
                        {/* Картинка — выше блок (h-72), тень при наведении на карточку */}
                        <div className="relative h-72 overflow-hidden">
                          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="absolute inset-0"
                          >
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </motion.div>
                          {/* Вес порции */}
                          <div className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-bold text-gray-300 backdrop-blur-md">
                            {item.weight}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleOpenDetails(item)}
                            className="absolute inset-0 z-30"
                            aria-label="Open product details"
                          >
                            <span className="sr-only">Open product details</span>
                          </button>
                        </div>

                        {/* Информация */}
                        <div className="relative z-20 p-6">
                          <div className="mb-2 flex items-start justify-between">
                            <h3 className="text-xl font-bold text-white transition-colors group-hover:text-orange-500">
                              {item.title}
                            </h3>
                            <span className="text-xl font-black text-orange-400">{item.price}</span>
                          </div>
                          <p className="mb-6 line-clamp-2 min-h-[40px] text-sm text-gray-400">
                            {item.description}
                          </p>

                          {/* Кнопка «В корзину» или счётчик − / кол-во / + */}
                          {getItemCount(item.id) === 0 ? (
                            <button
                              type="button"
                              onClick={() => handleAddToCart(item)}
                              disabled={addedItemId === item.id}
                              className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold uppercase tracking-wider transition-all duration-300 ${
                                addedItemId === item.id
                                  ? 'bg-green-600/90 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                                  : 'bg-white/10 text-white hover:bg-orange-600 group-hover:shadow-[0_0_20px_rgba(234,88,12,0.4)]'
                              }`}
                            >
                              {addedItemId === item.id ? (
                                <>
                                  <Check size={18} />
                                  <span>Добавлено</span>
                                </>
                              ) : (
                                <>
                                  <span>В корзину</span>
                                  <Plus size={18} />
                                </>
                              )}
                            </button>
                          ) : (
                            <div className="flex items-center justify-between gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/10">
                              <button
                                type="button"
                                onClick={() => setItemQuantity(item.id, getItemCount(item.id) - 1)}
                                aria-label="Уменьшить количество"
                                className="flex flex-1 items-center justify-center py-4 text-white transition-colors hover:bg-white/10 disabled:opacity-50"
                              >
                                <Minus size={20} />
                              </button>
                              <span className="min-w-[2.5rem] py-4 text-center text-lg font-bold text-white">
                                {getItemCount(item.id)}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  addToCart(
                                    {
                                      id: item.id,
                                      name: item.title,
                                      price: parsePrice(item.price),
                                      image: item.image,
                                    },
                                    { openCart: false }
                                  )
                                }
                                aria-label="Увеличить количество"
                                className="flex flex-1 items-center justify-center py-4 text-orange-500 transition-colors hover:bg-orange-500/20"
                              >
                                <Plus size={20} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>
      </div>

      <ProductDetailsModal
        visible={Boolean(selectedProduct)}
        onClose={handleCloseDetails}
        product={selectedProduct}
      />
    </section>
  )
}
