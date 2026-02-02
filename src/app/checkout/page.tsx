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
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0f0f0f] p-4 text-white">
        <h1 className="mb-4 text-3xl font-bold">Корзина пуста 😔</h1>
        <Link href="/" className="text-lg text-orange-500 hover:underline">
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
    <main className="min-h-screen bg-[#0f0f0f] px-4 pb-12 pt-24 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Кнопка назад */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-gray-400 transition hover:text-white"
        >
          <ArrowLeft className="mr-2" size={20} />
          Назад в меню
        </Link>

        <h1 className="mb-10 text-4xl font-bold">Оформление заказа</h1>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* ЛЕВАЯ КОЛОНКА: ФОРМА */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Секция 1: Контакты */}
            <div className="rounded-2xl border border-white/5 bg-[#1a1a1a] p-6">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-bold">
                <User className="text-orange-500" /> Ваши данные
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-gray-400">Имя</label>
                  <input
                    type="text"
                    placeholder="Иван"
                    className="w-full rounded-xl border border-white/10 bg-[#141414] p-4 text-white outline-none transition focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-400">Телефон</label>
                  <input
                    type="tel"
                    placeholder="+7 (999) 000-00-00"
                    className="w-full rounded-xl border border-white/10 bg-[#141414] p-4 text-white outline-none transition focus:border-orange-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Секция 2: Адрес */}
            <div className="rounded-2xl border border-white/5 bg-[#1a1a1a] p-6">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-bold">
                <MapPin className="text-orange-500" /> Доставка
              </h2>
              <textarea
                placeholder="Улица, дом, квартира, подъезд..."
                className="h-32 w-full resize-none rounded-xl border border-white/10 bg-[#141414] p-4 text-white outline-none transition focus:border-orange-500"
                required
              />
            </div>

            {/* Секция 3: Оплата */}
            <div className="rounded-2xl border border-white/5 bg-[#1a1a1a] p-6">
              <h2 className="mb-6 text-xl font-bold">Способ оплаты</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition ${paymentMethod === 'card' ? 'border-orange-500 bg-orange-500/10 text-orange-500' : 'border-white/10 bg-[#141414] text-gray-400'}`}
                >
                  <CreditCard />
                  Картой онлайн
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition ${paymentMethod === 'cash' ? 'border-orange-500 bg-orange-500/10 text-orange-500' : 'border-white/10 bg-[#141414] text-gray-400'}`}
                >
                  <Banknote />
                  Наличными
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-orange-600 py-5 text-xl font-bold text-white shadow-lg shadow-orange-900/20 transition hover:bg-orange-500 active:scale-95"
            >
              Подтвердить заказ на {totalPrice} ₽
            </button>
          </form>

          {/* ПРАВАЯ КОЛОНКА: ВАШ ЗАКАЗ (ЧЕК) */}
          <div className="h-fit lg:sticky lg:top-24">
            <div className="rounded-2xl border border-white/5 bg-[#1a1a1a] p-6">
              <h3 className="mb-6 text-xl font-bold">Ваш заказ</h3>
              <div className="mb-6 max-h-[400px] space-y-4 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b border-white/5 py-2"
                  >
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.quantity} шт.</div>
                    </div>
                    <div className="font-bold">{item.price * item.quantity} ₽</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-white/10 pt-4 text-gray-400">
                <div className="flex justify-between">
                  <span>Сумма заказа</span>
                  <span>{totalPrice} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка</span>
                  <span className="text-green-500">Бесплатно</span>
                </div>
              </div>

              <div className="mt-6 flex justify-between border-t border-white/10 pt-6 text-2xl font-bold">
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
