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
    <nav className="pb-safe fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0A0A0A]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-around">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          const Icon = tab.icon
          const isCart = tab.id === 'cart'

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`relative flex h-full flex-1 flex-col items-center justify-center gap-1 transition-colors ${
                isActive ? 'text-[#F97316]' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <div className="relative">
                <Icon size={24} strokeWidth={2.5} />
                {isCart && totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#F97316] text-xs font-black text-white shadow-[0_0_10px_rgba(249,115,22,0.5)]">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </div>
              <span
                className={`text-xs font-bold uppercase tracking-wide ${isActive ? 'text-[#F97316]' : 'text-gray-400'}`}
              >
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
