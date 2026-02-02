'use client'

import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, User, CreditCard, Banknote } from 'lucide-react'

export default function CheckoutPage() {
  const { items, totalPrice } = useCart()
  const [paymentMethod, setPaymentMethod] = useState('card')

  // Если корзина пуста — показываем заглушку
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-3xl font-bold mb-4">Корзина пуста 😔</h1>
        <Link href="/" className="text-orange-500 hover:underline text-lg">
          Вернуться к бургерам
        </Link>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Заказ успешно отправлен! (В реальности тут будет отправка в Telegram)')
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Кнопка назад */}
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition">
          <ArrowLeft className="mr-2" size={20} />
          Назад в меню
        </Link>

        <h1 className="text-4xl font-bold mb-10">Оформление заказа</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* ЛЕВАЯ КОЛОНКА: ФОРМА */}
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Секция 1: Контакты */}
            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <User className="text-orange-500" /> Ваши данные
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Имя</label>
                  <input type="text" placeholder="Иван" className="w-full bg-[#141414] border border-white/10 rounded-xl p-4 text-white focus:border-orange-500 outline-none transition" required />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Телефон</label>
                  <input type="tel" placeholder="+7 (999) 000-00-00" className="w-full bg-[#141414] border border-white/10 rounded-xl p-4 text-white focus:border-orange-500 outline-none transition" required />
                </div>
              </div>
            </div>

            {/* Секция 2: Адрес */}
            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="text-orange-500" /> Доставка
              </h2>
              <textarea placeholder="Улица, дом, квартира, подъезд..." className="w-full bg-[#141414] border border-white/10 rounded-xl p-4 text-white focus:border-orange-500 outline-none transition h-32 resize-none" required />
            </div>

            {/* Секция 3: Оплата */}
            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
              <h2 className="text-xl font-bold mb-6">Способ оплаты</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition ${paymentMethod === 'card' ? 'border-orange-500 bg-orange-500/10 text-orange-500' : 'border-white/10 bg-[#141414] text-gray-400'}`}
                >
                  <CreditCard />
                  Картой онлайн
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition ${paymentMethod === 'cash' ? 'border-orange-500 bg-orange-500/10 text-orange-500' : 'border-white/10 bg-[#141414] text-gray-400'}`}
                >
                  <Banknote />
                  Наличными
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white py-5 rounded-xl font-bold text-xl transition shadow-lg shadow-orange-900/20 active:scale-95">
              Подтвердить заказ на {totalPrice} ₽
            </button>
          </form>

          {/* ПРАВАЯ КОЛОНКА: ВАШ ЗАКАЗ (ЧЕК) */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-6">Ваш заказ</h3>
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-white/5">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.quantity} шт.</div>
                    </div>
                    <div className="font-bold">{item.price * item.quantity} ₽</div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 text-gray-400 border-t border-white/10 pt-4">
                <div className="flex justify-between">
                  <span>Сумма заказа</span>
                  <span>{totalPrice} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка</span>
                  <span className="text-green-500">Бесплатно</span>
                </div>
              </div>
              
              <div className="flex justify-between text-2xl font-bold mt-6 pt-6 border-t border-white/10">
                <span>Итого</span>
                <span className="text-orange-500">{totalPrice} ₽</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
