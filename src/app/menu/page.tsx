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
      <div className="max-w-none px-4 md:px-6 lg:px-8">
        <h2 className="mb-12 text-5xl font-black uppercase tracking-tighter text-white">
          Наше <span className="text-orange-500">Меню</span>
        </h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {burgers.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-3xl border border-[#222] bg-[#141414] transition-all duration-300 hover:border-orange-600/50"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
                <p className="mb-6 line-clamp-2 text-sm text-gray-400">{item.description}</p>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-2xl font-black text-white">{item.price}</span>
                  <button
                    type="button"
                    className="rounded-full border border-white/20 bg-transparent px-6 py-2.5 font-bold text-white transition-colors duration-300 group-hover:bg-[#F97316] group-hover:border-[#F97316]"
                  >
                    Купить
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