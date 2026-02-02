'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { X, Trash2, ShoppingBag } from 'lucide-react'

export default function CartSidebar() {
  const { isCartOpen, setIsCartOpen, items, removeFromCart, totalPrice } = useCart()

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Затемнение фона */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Панель справа */}
      <div className="relative flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0f0f0f] shadow-2xl duration-300 animate-in slide-in-from-right">
        <div className="flex items-center justify-between border-b border-white/10 bg-[#141414] p-6">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <ShoppingBag className="text-orange-500" />
            Ваш заказ
          </h2>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Закрыть корзину"
            className="rounded text-gray-400 transition hover:text-white focus:outline-none focus-visible:text-white focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-gray-500">
              <p>Корзина пуста</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-xl border border-white/5 bg-[#1a1a1a] p-3"
              >
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-800">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl">🍔</span>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <h3 className="truncate font-medium text-white">{item.name}</h3>
                    {item.customizations && (
                      <div className="mt-1 space-y-0.5 text-xs text-gray-400">
                        {item.customizations.addons.length > 0 && (
                          <div>+ {item.customizations.addons.map((a) => a.name).join(', ')}</div>
                        )}
                        {item.customizations.removals.length > 0 && (
                          <div>− {item.customizations.removals.join(', ')}</div>
                        )}
                      </div>
                    )}
                    {item.quantity > 1 && (
                      <div className="mt-1 text-xs text-gray-500">x{item.quantity}</div>
                    )}
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="font-bold text-orange-500">
                      {item.price * item.quantity} ₽
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Удалить ${item.name} из корзины`}
                      className="text-gray-500 hover:text-red-500 focus:outline-none focus-visible:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/10 bg-[#141414] p-6">
            <div className="mb-6 flex justify-between text-lg font-bold text-white">
              <span>Итого:</span>
              <span className="text-orange-500">{totalPrice} ₽</span>
            </div>

            {/* ИСПРАВЛЕННАЯ КНОПКА */}
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full rounded-xl bg-orange-600 py-4 text-center text-lg font-bold text-white shadow-lg shadow-orange-900/20 transition hover:bg-orange-500 active:scale-95"
            >
              Оформить заказ
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
