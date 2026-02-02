'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Plus, Minus } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { getCustomizationsForCategory, Customization } from '@/data/customizations'

interface ProductCustomizerProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: string
    title: string
    description: string
    price: string
    image: string
    weight: string
    categoryId: string
  }
}

function parsePrice(priceStr: string): number {
  const num = parseInt(priceStr.replace(/\D/g, ''), 10)
  return isNaN(num) ? 0 : num
}

export function ProductCustomizer({ isOpen, onClose, product }: ProductCustomizerProps) {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [selectedRemovals, setSelectedRemovals] = useState<string[]>([])
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const customizations = getCustomizationsForCategory(product.categoryId)
  const basePrice = parsePrice(product.price)
  
  // Считаем доп. стоимость от выбранных добавок
  const addonsPrice = selectedAddons.reduce((sum, addonId) => {
    const addon = customizations.addons.find(a => a.id === addonId)
    return sum + (addon?.price || 0)
  }, 0)
  
  const totalPrice = (basePrice + addonsPrice) * quantity

  // Сброс при открытии
  useEffect(() => {
    if (isOpen) {
      setSelectedAddons([])
      setSelectedRemovals([])
      setQuantity(1)
    }
  }, [isOpen])

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    )
  }

  const toggleRemoval = (removal: string) => {
    setSelectedRemovals(prev =>
      prev.includes(removal)
        ? prev.filter(r => r !== removal)
        : [...prev, removal]
    )
  }

  const handleAddToCart = () => {
    // Формируем описание кастомизации
    const customizationDetails = {
      addons: selectedAddons.map(id => {
        const addon = customizations.addons.find(a => a.id === id)
        return addon ? { id: addon.id, name: addon.name, price: addon.price } : null
      }).filter(Boolean) as Customization[],
      removals: selectedRemovals
    }

    addToCart({
      id: `${product.id}-${Date.now()}`, // Уникальный ID для кастомизированного товара
      name: product.title,
      price: (basePrice + addonsPrice) * quantity,
      image: product.image,
      customizations: customizationDetails
    })

    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="bg-[#0a0a0a] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-3xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Заголовок с кнопкой закрытия */}
            <div className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 p-4 flex items-center justify-between">
              <h2 className="text-2xl font-black text-white uppercase">Настройте блюдо</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Фото товара */}
            <div className="relative h-64 overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>

            {/* Информация о товаре */}
            <div className="p-6 border-b border-white/10">
              <h3 className="text-3xl font-black text-white mb-2">{product.title}</h3>
              <p className="text-gray-400 mb-2">{product.description}</p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-black text-orange-500">{product.price}</span>
                <span className="text-gray-500">{product.weight}</span>
              </div>
            </div>

            {/* Секция добавок */}
            {customizations.addons.length > 0 && (
              <div className="p-6 border-b border-white/10">
                <h4 className="text-xl font-bold text-white mb-4 uppercase">Добавить</h4>
                <div className="space-y-3">
                  {customizations.addons.map((addon) => (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                        selectedAddons.includes(addon.id)
                          ? 'bg-orange-500/20 border-2 border-orange-500'
                          : 'bg-white/5 border-2 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                          selectedAddons.includes(addon.id)
                            ? 'bg-orange-500 border-orange-500'
                            : 'border-white/30'
                        }`}>
                          {selectedAddons.includes(addon.id) && (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-white font-bold">{addon.name}</span>
                      </div>
                      <span className="text-orange-400 font-bold">+{addon.price}₽</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Секция исключений */}
            {customizations.removals.length > 0 && (
              <div className="p-6 border-b border-white/10">
                <h4 className="text-xl font-bold text-white mb-4 uppercase">Убрать</h4>
                <div className="space-y-3">
                  {customizations.removals.map((removal) => (
                    <button
                      key={removal}
                      onClick={() => toggleRemoval(removal)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                        selectedRemovals.includes(removal)
                          ? 'bg-red-500/20 border-2 border-red-500'
                          : 'bg-white/5 border-2 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                          selectedRemovals.includes(removal)
                            ? 'bg-red-500 border-red-500'
                            : 'border-white/30'
                        }`}>
                          {selectedRemovals.includes(removal) && (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-white font-bold">{removal}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Количество и кнопка добавления */}
            <div className="p-6 space-y-4">
              {/* Счетчик количества */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center justify-center transition-colors"
                >
                  <Minus size={20} className="text-white" />
                </button>
                <span className="text-2xl font-black text-white min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Plus size={20} className="text-white" />
                </button>
              </div>

              {/* Кнопка добавления в корзину */}
              <button
                onClick={handleAddToCart}
                className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-white font-black text-lg uppercase tracking-wider rounded-xl transition-all shadow-[0_0_30px_rgba(234,88,12,0.4)]"
              >
                Добавить в корзину за {totalPrice}₽
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
