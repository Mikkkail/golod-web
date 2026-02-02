'use client';

import Link from 'next/link';
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

type MenuCategory = {
  id: string;
  title: string;
  description: string;
  items: MenuItem[];
};

export default function SinglePage() {
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 0.5], [0, 200]);

  return (
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-orange-500">
      {/* --- SECTION 1: HERO (ВИДЕО) --- */}
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-50 grayscale-[20%]"
        >
          <source src="/burger-vid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 overlay-cinema" />

        <div className="relative z-10 px-4 text-center">
          <motion.div style={{ y: yText }} className="space-y-6">
            <h1 className="text-7xl font-black italic uppercase leading-[0.85] tracking-tighter md:text-[10rem]">
              ГОЛОД{' '}
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                IS HERE
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl font-light tracking-wide text-gray-300 md:text-2xl">
              Не просто еда. Это культ мяса и огня.
            </p>
            <button
              type="button"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="cssbuttons-io-button mt-8"
            >
              ЗАКАЗАТЬ
              <div className="icon">
                <svg height="28" width="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 2: MARQUEE --- */}
      <div className="relative z-20 my-[-20px] overflow-hidden bg-orange-600 py-4 shadow-2xl shadow-orange-600/20 rotate-[-1deg] scale-110">
        <div className="flex animate-marquee whitespace-nowrap space-x-12">
          {Array(10)
            .fill('')
            .map((_, i) => (
              <span
                key={i}
                className="text-4xl font-black italic uppercase tracking-tighter text-black"
              >
                СОЧНО • МОЩНО • БЫСТРО • ХАСАВЮРТ •
              </span>
            ))}
        </div>
      </div>

      {/* --- SECTION 3: МЕНЮ (ВСЕ КАТЕГОРИИ) --- */}
      <section id="menu" className="relative z-10 mx-auto max-w-[1600px] px-4 py-32">
        <div className="mb-20 flex flex-col border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <h2 className="text-6xl font-black uppercase tracking-tighter text-white md:text-8xl">
            Меню
          </h2>
          <span className="mb-2 font-mono text-xl text-gray-500">
            ( 01 / {menuData.length} КАТЕГОРИЙ )
          </span>
        </div>

        {(menuData as MenuCategory[]).map((category, catIndex) => (
          <div key={category.id} className="mb-24">
            <div className="mb-12 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-black uppercase tracking-tighter text-white md:text-5xl">
                {category.title}
              </h3>
              <p className="mt-2 text-gray-400">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.items.map((item: MenuItem, index: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="group relative cursor-pointer"
                >
                  <div className="relative mb-6 aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#111]">
                    <div className="absolute inset-0 bg-orange-500/20 opacity-0 blur-[100px] transition-opacity duration-700 group-hover:opacity-100" />
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                    />
                    <div className="absolute bottom-4 right-4 rounded-lg border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
                      <span className="text-xl font-bold text-white">{item.price}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-3xl font-bold uppercase leading-none text-white transition-colors group-hover:text-orange-500">
                      {item.title}
                    </h4>
                    <p className="line-clamp-2 text-sm text-gray-400">{item.description}</p>
                    <button
                      type="button"
                      className="group relative mt-4 w-full rounded-full border border-orange-600 bg-transparent px-8 py-3 font-bold text-white transition-all duration-300 ease-in-out hover:bg-orange-600 hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]"
                    >
                      <span className="absolute inset-0 h-full w-full rounded-full bg-orange-600 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-10" />
                      <span className="relative flex items-center justify-center gap-2">
                        В КОРЗИНУ
                        <svg
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/10 py-20 text-center">
        <h2 className="select-none text-[12vw] font-black leading-none text-[#111]">GOLOD</h2>
      </footer>
    </main>
  );
}
