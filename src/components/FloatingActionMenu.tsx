'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Menu, Phone, ShoppingBag, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FABMenuItem {
  icon: React.ReactNode
  label: string
  action: () => void
  href?: string
}

export function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems: FABMenuItem[] = [
    {
      icon: <Home className="h-5 w-5" />,
      label: 'Главная',
      action: () => scrollToSection('home')
    },
    {
      icon: <Menu className="h-5 w-5" />,
      label: 'Меню',
      action: () => scrollToSection('menu')
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: 'Контакты',
      action: () => scrollToSection('contact')
    },
    {
      icon: <ShoppingBag className="h-5 w-5" />,
      label: 'Заказать',
      action: () => window.open('https://wa.me/79286780666', '_blank')
    }
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* FAB Menu Container */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        {/* Menu Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-4 flex flex-col gap-3"
            >
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    scale: 1,
                    transition: {
                      delay: index * 0.05,
                      type: 'spring',
                      stiffness: 200,
                      damping: 20
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: 20, 
                    scale: 0.8,
                    transition: { delay: (menuItems.length - index) * 0.03 }
                  }}
                  onClick={item.action}
                  className="group flex items-center gap-3 rounded-full bg-accent/90 backdrop-blur-md px-4 py-3 shadow-xl transition-all hover:bg-primary hover:shadow-2xl hover:shadow-primary/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors group-hover:bg-primary-foreground group-hover:text-primary">
                    {item.icon}
                  </div>
                  <span className="pr-2 text-sm font-semibold">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all",
            isOpen
              ? "bg-foreground text-background shadow-foreground/50"
              : "bg-primary text-primary-foreground shadow-primary/50"
          )}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            rotate: isOpen ? 90 : 0,
            scale: isOpen ? 1.1 : 1
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Pulse Animation */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 -z-10 rounded-full bg-primary"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: 'loop'
            }}
          />
        )}
      </div>
    </>
  )
}
