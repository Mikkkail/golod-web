'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Flame, ShoppingBag, User } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export function BottomTabBar() {
  const pathname = usePathname()
  const { items } = useCart()
  
  // Скрываем на странице checkout
  if (pathname === '/checkout') {
    return null
  }

  const tabs = [
    { id: 'home', label: 'Меню', icon: Home, href: '/' },
    { id: 'promo', label: 'Акции', icon: Flame, href: '/promo' },
    { id: 'cart', label: 'Корзина', icon: ShoppingBag, href: '/checkout' },
    { id: 'profile', label: 'Профиль', icon: User, href: '/profile' },
  ]

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/10 pb-safe">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          const Icon = tab.icon
          const isCart = tab.id === 'cart'

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors relative ${
                isActive ? 'text-[#F97316]' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <div className="relative">
                <Icon size={24} strokeWidth={2.5} />
                {isCart && totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#F97316] text-white text-xs font-black rounded-full w-5 h-5 flex items-center justify-center shadow-[0_0_10px_rgba(249,115,22,0.5)]">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </div>
              <span className={`text-xs font-bold uppercase tracking-wide ${isActive ? 'text-[#F97316]' : 'text-gray-400'}`}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
