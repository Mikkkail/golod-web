'use client'

import { motion } from 'framer-motion'

export function Marquee() {
  const text = "PREMIUM BURGERS • 24/7 DELIVERY • FRESH MEAT • HALAL 100% • "
  
  return (
    <div className="relative flex overflow-hidden bg-orange-600 py-4 transform -rotate-1 border-y-4 border-black z-20 shadow-xl">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply" />
      
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: 20 
        }}
      >
        {[...Array(8)].map((_, i) => (
          <span key={i} className="text-2xl md:text-4xl font-black text-black uppercase tracking-tighter mx-4 italic">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  )
}