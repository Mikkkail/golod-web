'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

export type ProductIngredient = {
  id: string
  label: string
  icon?: string
}

export type ProductDetails = {
  id: string
  title: string
  description: string
  price: string
  image: string
  weight?: string
  ingredients?: ProductIngredient[]
}

type ProductDetailsModalProps = {
  visible: boolean
  onClose: () => void
  product: ProductDetails | null
}

const fallbackIngredients: ProductIngredient[] = [
  { id: 'fresh', label: 'Fresh', icon: '*' },
  { id: 'sauce', label: 'Sauce', icon: '*' },
  { id: 'crispy', label: 'Crispy', icon: '*' },
]

const formatPrice = (price: ProductDetails['price']) => price

const parsePrice = (price: string) => {
  const value = parseInt(price.replace(/\D/g, ''), 10)
  return Number.isNaN(value) ? 0 : value
}

export default function ProductDetailsModal({
  visible,
  onClose,
  product,
}: ProductDetailsModalProps) {
  const { addToCart } = useCart()
  if (!visible || !product) return null

  const ingredients =
    product.ingredients && product.ingredients.length > 0
      ? product.ingredients
      : fallbackIngredients
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.title,
      price: parsePrice(product.price),
      image: product.image,
    })
    onClose()
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/70" />

      <motion.div
        className="relative z-10 flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-[#141414] text-white shadow-2xl"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 140, damping: 22 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white"
          aria-label="Close"
        >
          X
        </button>

        <div className="relative h-64 w-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-10 pt-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="text-2xl font-bold text-white">
              {product.title}
            </h3>
            {product.weight ? (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">
                {product.weight}
              </span>
            ) : null}
          </div>

          <p className="mt-4 text-sm leading-6 text-gray-400">
            {product.description}
          </p>

          {ingredients.length > 0 ? (
            <div className="mt-6">
              <p className="text-sm font-semibold text-white">Ingredients</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {ingredients.map((ingredient) => (
                  <span
                    key={ingredient.id}
                    className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300"
                  >
                    <span className="text-xs font-bold text-white">
                      {ingredient.icon ?? '*'}
                    </span>
                    {ingredient.label}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="border-t border-white/10 bg-[#141414] px-6 pb-6 pt-4">
          <button
            type="button"
            className="w-full rounded-2xl bg-orange-500 py-4 text-base font-bold text-white transition hover:bg-orange-400"
            onClick={handleAddToCart}
          >
            Add to Cart for {formatPrice(product.price)}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
