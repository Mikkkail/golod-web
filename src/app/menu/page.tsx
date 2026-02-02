'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { menuData } from '@/data/menu';

type MenuItem = {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  weight?: string;
};

const burgers: MenuItem[] =
  menuData.find((c) => c.id === 'burgers')?.items ?? [];

export default function MenuPage() {
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 0.5], [0, 200]);

  return (
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-orange-500">
      
      {/* --- SECTION 1: HERO (ВИДЕО) --- */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <video 
          autoPlay muted loop playsInline 
          className="absolute inset-0 h-full w-full object-cover opacity-50 grayscale-[20%]"
        >
          <source src="/burger-vid.mp4" type="video/mp4" />
        </video>
        
        {/* Градиент снизу, чтобы видео плавно переходило в черный */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/60" />

        <div className="relative z-10 text-center px-4">
          <motion.div style={{ y: yText }} className="space-y-6">
            <h1 className="text-7xl md:text-[10rem] font-black italic uppercase tracking-tighter leading-[0.85]">
              ГОЛОД <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">IS HERE</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide max-w-2xl mx-auto">
              Не просто еда. Это культ мяса и огня.
            </p>
            
            {/* Кнопка с якорем на меню */}
            <button 
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-8 group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-12 py-4 font-bold text-black transition-all hover:bg-orange-500 hover:text-white"
            >
              <span className="relative z-10 text-lg tracking-widest uppercase">Смотреть меню</span>
            </button>
          </motion.div>
        </div>
      </section>


      {/* --- SECTION 2: MARQUEE (БЕГУЩАЯ СТРОКА) --- */}
      <div className="relative z-20 overflow-hidden bg-orange-600 py-4 rotate-[-1deg] scale-110 shadow-2xl shadow-orange-600/20 my-[-20px]">
        <div className="animate-marquee whitespace-nowrap flex space-x-12">
          {Array(10).fill("").map((_, i) => (
            <span key={i} className="text-4xl font-black italic text-black uppercase tracking-tighter">
              СОЧНО • МОЩНО • БЫСТРО • ХАСАВЮРТ • 
            </span>
          ))}
        </div>
      </div>


      {/* --- SECTION 3: MENU GRID --- */}
      <section id="menu" className="relative z-10 py-32 px-4 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-8">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white">
            Меню
          </h2>
          <span className="text-gray-500 text-xl font-mono mb-2">( 01 / BURGERS )</span>
        </div>

        {/* Сетка товаров */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20">
          {burgers.map((item: MenuItem, index: number) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative cursor-pointer"
            >
              {/* Карточка */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#111] mb-6">
                 {/* Свечение за бургером */}
                 <div className="absolute inset-0 bg-orange-500/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                 
                 <img 
                    src={item.image} 
                    alt={item.title}
                    className="h-full w-full object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-3"
                 />
                 
                 {/* Цена поверх фото */}
                 <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                    <span className="text-xl font-bold text-white">{item.price} ₽</span>
                 </div>
              </div>

              {/* Инфо */}
              <div className="space-y-2">
                <h3 className="text-3xl font-bold uppercase leading-none group-hover:text-orange-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
                <button className="w-full mt-4 py-4 border border-white/20 rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                  В корзину
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-white/10 text-center">
        <h2 className="text-[12vw] font-black text-[#111] leading-none select-none">GOLOD</h2>
      </footer>
    </main>
  );
}