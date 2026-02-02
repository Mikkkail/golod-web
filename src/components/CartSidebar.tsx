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
      <div className="relative w-full max-w-md bg-[#0f0f0f] border-l border-white/10 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#141414]">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="text-orange-500" />
            Ваш заказ
          </h2>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Закрыть корзину"
            className="text-gray-400 hover:text-white transition focus:outline-none focus-visible:text-white focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <p>Корзина пуста</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 bg-[#1a1a1a] p-3 rounded-xl border border-white/5">
                <div className="w-20 h-20 bg-gray-800 rounded-lg shrink-0 overflow-hidden flex items-center justify-center relative">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-2xl">🍔</span>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="font-medium text-white truncate">{item.name}</h3>
                    {item.customizations && (
                      <div className="mt-1 text-xs text-gray-400 space-y-0.5">
                        {item.customizations.addons.length > 0 && (
                          <div>+ {item.customizations.addons.map(a => a.name).join(', ')}</div>
                        )}
                        {item.customizations.removals.length > 0 && (
                          <div>− {item.customizations.removals.join(', ')}</div>
                        )}
                      </div>
                    )}
                    {item.quantity > 1 && (
                      <div className="text-xs text-gray-500 mt-1">x{item.quantity}</div>
                    )}
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-orange-500 font-bold">{item.price * item.quantity} ₽</span>
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
          <div className="p-6 border-t border-white/10 bg-[#141414]">
            <div className="flex justify-between text-lg font-bold text-white mb-6">
              <span>Итого:</span>
              <span className="text-orange-500">{totalPrice} ₽</span>
            </div>
            
            {/* ИСПРАВЛЕННАЯ КНОПКА */}
            <Link 
              href="/checkout" 
              onClick={() => setIsCartOpen(false)} 
              className="block w-full bg-orange-600 hover:bg-orange-500 text-white py-4 rounded-xl font-bold text-center text-lg transition shadow-lg shadow-orange-900/20 active:scale-95"
            >
              Оформить заказ
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}