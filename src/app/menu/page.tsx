'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Plus, Minus } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { menuData } from '@/data/menu'
import { ProductCustomizer } from '@/components/ProductCustomizer'

function parsePrice(priceStr: string): number {
  const num = parseInt(priceStr.replace(/\D/g, ''), 10)
  return isNaN(num) ? 0 : num
}

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState(menuData[0].id)
  const [customizerOpen, setCustomizerOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>({})
  const { addToCart, getItemCount, setItemQuantity } = useCart()
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

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

  return (
    <>
      <div className="min-h-screen bg-[#0A0A0A]">
        {/* Categories bar */}
        <div className="sticky top-0 z-40 border-b border-white/10 bg-[#0A0A0A]/95 py-4 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4">
            <div className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth">
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
        </div>

        {/* Product grid — wide container for desktop */}
        <div className="mx-auto max-w-7xl px-4 py-8 pb-32">
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
                <h2 className="mb-2 text-3xl font-black uppercase text-white md:text-4xl">
                  {category.title}
                </h2>
                <p className="mb-6 font-light text-gray-400">{category.description}</p>
              </motion.div>

              <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-4">
                {category.items.map((item, index) => {
                  const itemCount = getItemCount(item.id)
                  const isLoading = imageLoading[item.id]

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="group relative overflow-hidden rounded-3xl bg-[#1A1A1A] transition-all hover:bg-[#242424]"
                    >
                      <div
                        className="relative h-44 cursor-pointer overflow-hidden bg-[#1A1A1A] sm:h-52"
                        onClick={() => handleProductClick(item, category.id)}
                      >
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
                          sizes="(max-width: 768px) 50vw, 25vw"
                          onLoad={() =>
                            setImageLoading((prev) => ({ ...prev, [item.id]: false }))
                          }
                        />
                        <div className="absolute right-3 top-3 z-20 rounded-2xl border border-white/10 bg-black/70 px-3 py-1.5 text-xs font-bold text-gray-300 backdrop-blur-md">
                          {item.weight}
                        </div>
                      </div>

                      <div className="p-4">
                        <h3
                          className="mb-2 line-clamp-1 cursor-pointer text-base font-bold text-white transition-colors hover:text-[#F97316]"
                          onClick={() => handleProductClick(item, category.id)}
                        >
                          {item.title}
                        </h3>

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
