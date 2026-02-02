'use client';

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
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-12 text-5xl font-black text-white uppercase tracking-tight">
          Наше <span className="text-orange-600">Меню</span>
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {burgers.map((item) => (
            <div key={item.id} className="group overflow-hidden rounded-3xl bg-[#141414] border border-[#222] transition-all hover:border-orange-600/50">
              <div className="relative h-64 w-full overflow-hidden">
                <img 
                  src={item.image} 
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110" 
                  alt={item.title} 
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
                <p className="mb-6 text-sm text-gray-400 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-white">{item.price} ₽</span>
                  <button className="rounded-full bg-orange-600 px-6 py-2 font-bold text-white hover:bg-orange-500">
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}