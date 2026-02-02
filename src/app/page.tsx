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
        behavior: 'smooth'
      })
    }
  }

  const currentCategory = menuData.find(cat => cat.id === selectedCategory) || menuData[0]

  return (
    <>
      <div className="min-h-screen bg-[#0A0A0A]">
        
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between px-4 py-4">
            <button className="w-10 h-10 flex items-center justify-center text-white hover:text-orange-500 transition-colors">
              <MenuIcon size={24} />
            </button>
            
            <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">
              GOLOD
            </h1>
            
            <button className="relative w-10 h-10 flex items-center justify-center text-white hover:text-orange-500 transition-colors">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F97316] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Hero Banner Slider */}
        <section className="relative h-[60vh] min-h-[500px] mt-16 overflow-hidden">
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

          <div className="relative z-10 h-full flex flex-col items-center justify-end pb-16 px-6 text-center">
            <motion.h2
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black text-white uppercase mb-4 drop-shadow-2xl"
            >
              {heroSlides[currentSlide].title}
            </motion.h2>
            
            <motion.p
              key={`subtitle-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-300 mb-8 font-light"
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>

            <motion.button
              key={`button-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="px-10 py-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-black uppercase tracking-wider rounded-3xl transition-all shadow-[0_0_40px_rgba(249,115,22,0.5)] hover:shadow-[0_0_60px_rgba(249,115,22,0.7)]"
            >
              ЗАКАЗАТЬ
            </motion.button>

            {/* Pagination Dots */}
            <div className="flex gap-2 mt-8">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-[#F97316] w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Horizontal Scroll */}
        <div className="sticky top-16 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 py-4">
          <div className="flex gap-3 px-4 overflow-x-auto scroll-smooth no-scrollbar">
            {menuData.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`shrink-0 px-6 py-3 rounded-3xl font-bold text-sm uppercase tracking-wider transition-all ${
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
              ref={(el) => { categoryRefs.current[category.id] = el }}
              className="mb-12"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl md:text-4xl font-black text-white uppercase mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-400 font-light mb-6">{category.description}</p>
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
                      className="group relative bg-[#1A1A1A] rounded-3xl overflow-hidden hover:bg-[#242424] transition-all"
                    >
                      {/* Image with Skeleton Loader */}
                      <div 
                        className="relative h-44 overflow-hidden cursor-pointer bg-[#1A1A1A]"
                        onClick={() => handleProductClick(item, category.id)}
                      >
                        {/* Skeleton Loader */}
                        {isLoading !== false && (
                          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A] animate-pulse" />
                        )}
                        
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className={`object-contain transition-opacity duration-500 ${
                            isLoading === false ? 'opacity-100' : 'opacity-0'
                          }`}
                          sizes="(max-width: 768px) 50vw, 33vw"
                          onLoadingComplete={() => setImageLoading(prev => ({ ...prev, [item.id]: false }))}
                        />
                        
                        {/* Weight Badge */}
                        <div className="absolute top-3 right-3 z-20 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-2xl text-xs font-bold text-gray-300 border border-white/10">
                          {item.weight}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h4 
                          className="text-base font-bold text-white mb-2 line-clamp-1 cursor-pointer hover:text-[#F97316] transition-colors"
                          onClick={() => handleProductClick(item, category.id)}
                        >
                          {item.title}
                        </h4>
                        
                        {/* Price and Add Button */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xl font-black text-[#F97316]">
                            {item.price}
                          </span>
                          
                          {itemCount === 0 ? (
                            <button
                              type="button"
                              onClick={() => handleAddToCart(item)}
                              className="w-11 h-11 rounded-full flex items-center justify-center bg-[#F97316] hover:bg-[#EA580C] text-white transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]"
                            >
                              <Plus size={20} strokeWidth={3} />
                            </button>
                          ) : (
                            <div className="flex items-center gap-2 rounded-3xl bg-[#2A2A2A] border border-white/10 overflow-hidden">
                              <button
                                type="button"
                                onClick={() => setItemQuantity(item.id, itemCount - 1)}
                                className="w-9 h-9 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                              >
                                <Minus size={16} strokeWidth={3} />
                              </button>
                              <span className="min-w-[1.5rem] text-center font-black text-white text-sm">
                                {itemCount}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleAddToCart(item)}
                                className="w-9 h-9 flex items-center justify-center text-[#F97316] hover:bg-[#F97316]/20 transition-colors"
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
