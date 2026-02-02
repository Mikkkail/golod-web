'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Plus, Minus, ShoppingCart, Menu as MenuIcon } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { menuData } from '@/data/menu'
import { ProductCustomizer } from '@/components/ProductCustomizer'

function parsePrice(priceStr: string): number {
  const num = parseInt(priceStr.replace(/\D/g, ''), 10)
  return isNaN(num) ? 0 : num
}

// Hero слайды
const heroSlides = [
  {
    id: 1,
    title: 'Голодный Бургер',
    subtitle: 'Флагманский бургер с большой котлетой',
    image: '/images/golodniy%20buger.jpg',
    price: '380₽',
  },
  {
    id: 2,
    title: 'Хам Бит',
    subtitle: 'Мощный вкус для сильного голода',
    image: '/images/ham-bit.jpg',
    price: '320₽',
  },
  {
    id: 3,
    title: 'Арабский',
    subtitle: 'С пикантным восточным соусом',
    image: '/images/arabskiy.jpg',
    price: '280₽',
  },
]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(menuData[0].id)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [customizerOpen, setCustomizerOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>({})
  const { addToCart, getItemCount, setItemQuantity, totalItems } = useCart()
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Автоматическая смена слайдов
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleAddToCart = (item: { id: string; title: string; price: string; image: string }) => {
    addToCart({
      id: item.id,
      name: item.title,
      price: parsePrice(item.price),
      image: item.image,
    })
  }

  const handleProductClick = (item: any, categoryId: string) => {
    setSelectedProduct({ ...item, categoryId })
    setCustomizerOpen(true)
  }

  const scrollToCategory = (categoryId: string) => {
    setSelectedCategory(categoryId)
    const element = categoryRefs.current[categoryId]
    if (element) {
      const offset = 180
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      })
    }
  }

  const currentCategory = menuData.find((cat) => cat.id === selectedCategory) || menuData[0]

  return (
    <>
      <div className="min-h-screen bg-[#0A0A0A]">
        {/* Fixed Header */}
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-4">
            <button className="flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-orange-500">
              <MenuIcon size={24} />
            </button>

            <h1 className="text-2xl font-black uppercase italic tracking-tighter text-white">
              GOLOD
            </h1>

            <button className="relative flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-orange-500">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F97316] text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Hero Banner Slider */}
        <section className="relative mt-16 h-[60vh] min-h-[500px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <Image
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/70 to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-16 text-center">
            <motion.h2
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 text-5xl font-black uppercase text-white drop-shadow-2xl md:text-7xl"
            >
              {heroSlides[currentSlide].title}
            </motion.h2>

            <motion.p
              key={`subtitle-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8 text-xl font-light text-gray-300"
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>

            <motion.button
              key={`button-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-3xl bg-[#F97316] px-10 py-4 font-black uppercase tracking-wider text-white shadow-[0_0_40px_rgba(249,115,22,0.5)] transition-all hover:bg-[#EA580C] hover:shadow-[0_0_60px_rgba(249,115,22,0.7)]"
            >
              ЗАКАЗАТЬ
            </motion.button>

            {/* Pagination Dots */}
            <div className="mt-8 flex gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentSlide ? 'w-8 bg-[#F97316]' : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Horizontal Scroll */}
        <div className="sticky top-16 z-40 border-b border-white/10 bg-[#0A0A0A]/95 py-4 backdrop-blur-xl">
          <div className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth px-4">
            {menuData.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`shrink-0 rounded-3xl px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#F97316] text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]'
                    : 'bg-[#1A1A1A] text-gray-400 hover:bg-[#2A2A2A] hover:text-white'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid - 2 Columns */}
        <div className="px-4 py-8 pb-32">
          {menuData.map((category) => (
            <div
              key={category.id}
              ref={(el) => {
                categoryRefs.current[category.id] = el
              }}
              className="mb-12"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="mb-2 text-3xl font-black uppercase text-white md:text-4xl">
                  {category.title}
                </h3>
                <p className="mb-6 font-light text-gray-400">{category.description}</p>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                {category.items.map((item, index) => {
                  const itemCount = getItemCount(item.id)
                  const isLoading = imageLoading[item.id]

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative overflow-hidden rounded-3xl bg-[#1A1A1A] transition-all hover:bg-[#242424]"
                    >
                      {/* Image with Skeleton Loader */}
                      <div
                        className="relative h-44 cursor-pointer overflow-hidden bg-[#1A1A1A]"
                        onClick={() => handleProductClick(item, category.id)}
                      >
                        {/* Skeleton Loader */}
                        {isLoading !== false && (
                          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A]" />
                        )}

                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className={`object-contain transition-opacity duration-500 ${
                            isLoading === false ? 'opacity-100' : 'opacity-0'
                          }`}
                          sizes="(max-width: 768px) 50vw, 33vw"
                          onLoadingComplete={() =>
                            setImageLoading((prev) => ({ ...prev, [item.id]: false }))
                          }
                        />

                        {/* Weight Badge */}
                        <div className="absolute right-3 top-3 z-20 rounded-2xl border border-white/10 bg-black/70 px-3 py-1.5 text-xs font-bold text-gray-300 backdrop-blur-md">
                          {item.weight}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h4
                          className="mb-2 line-clamp-1 cursor-pointer text-base font-bold text-white transition-colors hover:text-[#F97316]"
                          onClick={() => handleProductClick(item, category.id)}
                        >
                          {item.title}
                        </h4>

                        {/* Price and Add Button */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xl font-black text-[#F97316]">{item.price}</span>

                          {itemCount === 0 ? (
                            <button
                              type="button"
                              onClick={() => handleAddToCart(item)}
                              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F97316] text-white shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all hover:bg-[#EA580C] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]"
                            >
                              <Plus size={20} strokeWidth={3} />
                            </button>
                          ) : (
                            <div className="flex items-center gap-2 overflow-hidden rounded-3xl border border-white/10 bg-[#2A2A2A]">
                              <button
                                type="button"
                                onClick={() => setItemQuantity(item.id, itemCount - 1)}
                                className="flex h-9 w-9 items-center justify-center text-white transition-colors hover:bg-white/10"
                              >
                                <Minus size={16} strokeWidth={3} />
                              </button>
                              <span className="min-w-[1.5rem] text-center text-sm font-black text-white">
                                {itemCount}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleAddToCart(item)}
                                className="flex h-9 w-9 items-center justify-center text-[#F97316] transition-colors hover:bg-[#F97316]/20"
                              >
                                <Plus size={16} strokeWidth={3} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Customizer Modal */}
      {selectedProduct && (
        <ProductCustomizer
          isOpen={customizerOpen}
          onClose={() => setCustomizerOpen(false)}
          product={selectedProduct}
        />
      )}
    </>
  )
}
