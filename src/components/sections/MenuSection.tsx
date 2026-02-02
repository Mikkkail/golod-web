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

  const handleAddToCart = useCallback((item: { id: string; title: string; price: string; image: string }) => {
    addToCart({
      id: item.id,
      name: item.title,
      price: parsePrice(item.price),
      image: item.image,
    })
    setAddedItemId(item.id)
    setTimeout(() => setAddedItemId(null), ADDED_FEEDBACK_MS)
  }, [addToCart])

  const handleOpenDetails = useCallback((item: MenuItem) => {
    setSelectedProduct(item)
  }, [])

  const handleCloseDetails = useCallback(() => {
    setSelectedProduct(null)
  }, [])

  return (
    <section id="menu" className="py-24 bg-[#0a0a0a] min-h-screen">
      <div className="container mx-auto px-4">
        
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-4">
            Наше <span className="text-orange-500">Меню</span>
          </h2>
          <p className="text-gray-400 text-lg">Выбирай сердцем. Или желудком.</p>
        </div>

        {/* Переключатель категорий: на мобиле — горизонтальный скролл в одну полосу */}
        <div className="tabs-scroll flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 mb-12 sticky top-4 z-30 py-4 -mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto scroll-smooth bg-[#0a0a0a]/80 backdrop-blur-md rounded-2xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleTabClick(cat.id)}
              className={`shrink-0 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                activeCategory === cat.id
                  ? 'bg-orange-500 text-white border-orange-500 shadow-[0_0_20px_rgba(234,88,12,0.4)] scale-105'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Сетка товаров */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            {categories.map((cat) => (
              cat.id === activeCategory && (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {cat.items.map((item) => (
                    <div
                      key={item.id}
                      className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-orange-500/20 hover:shadow-[0_0_40px_-8px_rgba(234,88,12,0.25)] transition-all duration-300"
                    >
                      {/* Картинка — выше блок (h-72), тень при наведении на карточку */}
                      <div className="relative h-72 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 pointer-events-none" />
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
                        <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-300 border border-white/10">
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
                      <div className="p-6 relative z-20">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
                            {item.title}
                          </h3>
                          <span className="text-xl font-black text-orange-400">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-6 line-clamp-2 min-h-[40px]">
                          {item.description}
                        </p>

                        {/* Кнопка «В корзину» или счётчик − / кол-во / + */}
                        {getItemCount(item.id) === 0 ? (
                          <button
                            type="button"
                            onClick={() => handleAddToCart(item)}
                            disabled={addedItemId === item.id}
                            className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                              addedItemId === item.id
                                ? 'bg-green-600/90 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                                : 'bg-white/10 hover:bg-orange-600 text-white group-hover:shadow-[0_0_20px_rgba(234,88,12,0.4)]'
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
                          <div className="flex items-center justify-between gap-2 rounded-xl bg-white/10 border border-white/10 overflow-hidden">
                            <button
                              type="button"
                              onClick={() => setItemQuantity(item.id, getItemCount(item.id) - 1)}
                              aria-label="Уменьшить количество"
                              className="flex-1 py-4 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-50"
                            >
                              <Minus size={20} />
                            </button>
                            <span className="py-4 min-w-[2.5rem] text-center font-bold text-white text-lg">
                              {getItemCount(item.id)}
                            </span>
                            <button
                              type="button"
                              onClick={() => addToCart({
                                id: item.id,
                                name: item.title,
                                price: parsePrice(item.price),
                                image: item.image,
                              }, { openCart: false })}
                              aria-label="Увеличить количество"
                              className="flex-1 py-4 flex items-center justify-center text-orange-500 hover:bg-orange-500/20 transition-colors"
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
            ))}
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