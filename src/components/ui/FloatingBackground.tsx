'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function FloatingBackground() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  })

  // Ингредиенты: [Иконка, позиция X, позиция Y, скорость, размытие]
  // Скорость: чем больше число, тем быстрее летит вверх при скролле
  const items = [
    { icon: "🍟", top: "10%", left: "5%", speed: 200, rotate: 15, blur: "0px", size: "6rem" },
    { icon: "🍅", top: "25%", left: "85%", speed: 400, rotate: -20, blur: "2px", size: "4rem" },
    { icon: "🥬", top: "45%", left: "10%", speed: 150, rotate: 45, blur: "1px", size: "5rem" },
    { icon: "🥓", top: "60%", left: "80%", speed: 300, rotate: -15, blur: "3px", size: "4rem" },
    { icon: "🧀", top: "80%", left: "15%", speed: 250, rotate: 30, blur: "0px", size: "3rem" },
    { icon: "🌶️", top: "90%", left: "70%", speed: 500, rotate: -40, blur: "4px", size: "5rem" },
    // Можно добавить больше или заменить на картинки <Image />
  ]

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none -z-10 h-full w-full">
      {items.map((item, i) => (
        <ParallaxItem key={i} item={item} progress={scrollYProgress} />
      ))}
    </div>
  )
}

function ParallaxItem({ item, progress }: any) {
  // Превращаем скролл (0...1) в движение по пикселям (0...-speed)
  const y = useTransform(progress, [0, 1], [0, -item.speed])
  
  // Добавляем легкое вращение при скролле
  const rotate = useTransform(progress, [0, 1], [item.rotate, item.rotate + 90])

  return (
    <motion.div
      style={{ y, rotate }}
      className="absolute opacity-20 select-none" // opacity-20 чтобы не мешало читать
      initial={{ top: item.top, left: item.left }}
    >
      <div 
        style={{ 
          fontSize: item.size, 
          filter: `blur(${item.blur})` 
        }}
      >
        {item.icon}
      </div>
    </motion.div>
  )
}