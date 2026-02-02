'use client'

import { motion } from 'framer-motion'

export function Marquee() {
  const text = 'PREMIUM BURGERS • 24/7 DELIVERY • FRESH MEAT • HALAL 100% • '

  return (
    <div className="relative z-20 flex -rotate-1 transform overflow-hidden border-y-4 border-black bg-orange-600 py-4 shadow-xl">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply" />

      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 20,
        }}
      >
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="mx-4 text-2xl font-black uppercase italic tracking-tighter text-black md:text-4xl"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
