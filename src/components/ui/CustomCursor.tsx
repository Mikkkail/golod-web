'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Пружина для плавного отставания (эффект желе)
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      // Если навели на кнопку или ссылку - курсор увеличивается
      const target = e.target as HTMLElement
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  // Скрываем на мобильных устройствах (там курсор не нужен)
  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden mix-blend-difference md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      {/* Точка внутри */}
      <motion.div
        className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500"
        animate={{
          scale: isHovered ? 0.5 : 1,
        }}
      />

      {/* Кольцо снаружи */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500"
        animate={{
          width: isHovered ? 60 : 20,
          height: isHovered ? 60 : 20,
          opacity: isHovered ? 1 : 0.5,
          backgroundColor: isHovered ? 'rgba(234, 88, 12, 0.1)' : 'transparent',
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}
