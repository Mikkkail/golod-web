'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Тип кастомизации
export type Customization = {
  id: string
  name: string
  price: number
}

export type CustomizationDetails = {
  addons: Customization[]
  removals: string[]
}

// Тип одного товара
export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  customizations?: CustomizationDetails
}

// Тип для нашего хранилища (Context)
type CartContextType = {
  items: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>, options?: { openCart?: boolean }) => void
  removeFromCart: (id: string) => void
  setItemQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalPrice: number
  totalItems: number
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
  getItemCount: (id: string) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // 1. При загрузке страницы пробуем достать корзину из памяти браузера
  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error('Ошибка чтения корзины', e)
      }
    }
  }, [])

  // 2. При любом изменении товаров сохраняем их в память браузера
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  // Добавить товар. openCart: при true открывает корзину (по умолчанию), при false — только добавляет (для кнопки + в меню).
  const addToCart = (product: Omit<CartItem, 'quantity'>, options?: { openCart?: boolean }) => {
    const openCart = options?.openCart !== false
    setItems((current) => {
      // Для кастомизированных товаров используем уникальный ID, поэтому просто добавляем
      if (product.customizations) {
        return [...current, { ...product, quantity: 1 }]
      }

      // Для обычных товаров проверяем существование и увеличиваем количество
      const existing = current.find((item) => item.id === product.id && !item.customizations)
      if (existing) {
        return current.map((item) =>
          item.id === product.id && !item.customizations
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...current, { ...product, quantity: 1 }]
    })
    if (openCart) setIsCartOpen(true)
  }

  // Удалить товар (полностью)
  const removeFromCart = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  // Установить количество товара (для кнопок − / + в меню). Если quantity < 1 — товар удаляется.
  const setItemQuantity = (id: string, quantity: number) => {
    setItems((current) => {
      const item = current.find((i) => i.id === id)
      if (!item) return current
      if (quantity < 1) return current.filter((i) => i.id !== id)
      return current.map((i) => (i.id === id ? { ...i, quantity } : i))
    })
  }

  // Очистить всё
  const clearCart = () => setItems([])

  // Посчитать общую сумму
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Посчитать общее количество товаров
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  // Получить количество конкретного товара (для кнопок + / - в меню)
  const getItemCount = (id: string) => {
    const item = items.find((i) => i.id === id)
    return item ? item.quantity : 0
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        setItemQuantity,
        clearCart,
        totalPrice,
        totalItems,
        isCartOpen,
        setIsCartOpen,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Хук, чтобы использовать корзину в любом месте
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
