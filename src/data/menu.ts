export const restaurantInfo = {
  name: 'GOLOD',
  phone: '+7 (928) 678-06-66',
  address: 'г. Хасавюрт, ул. Воробьёва, 35Б',
  workHours: 'Круглосуточно 24/7',
  location: {
    lat: 43.239385,
    lng: 46.584328,
  },
  /** ID конструктора карты из личного кабинета: https://yandex.ru/map-constructor/ — вставьте свой constructor ID вместо этого. */
  yandexMapConstructorId: '7e3f8b3c8e8f8b3c8e8f8b3c8e8f8b3c',
  social: {
    instagram: 'https://www.instagram.com/golod_fastfood/',
    whatsapp: 'https://wa.me/79286780666',
    telegram: 'https://t.me/golod_fastfood',
  },
}

// ...дальше идет export const menuData (его не трогаем, если ты уже исправил там картинки)

export const menuData = [
  {
    id: 'burgers',
    title: 'Бургеры',
    description: 'Сочная говядина, мягкие булочки и авторские соусы',
    items: [
      {
        id: '1',
        title: 'Голодный Бургер',
        description: 'Флагманский бургер с большой котлетой и фирменным соусом.',
        price: '380₽',
        image: '/images/golodniy%20buger.jpg',
        weight: '350г'
      },
      {
        id: '2',
        title: 'Хам Бит',
        description: 'Мощный вкус для сильного голода.',
        price: '320₽',
        image: '/images/ham-bit.jpg', // Исправлено
        weight: '300г'
      },
      {
        id: '3',
        title: 'Хам Чикен',
        description: 'Нежное куриное филе в хрустящей панировке.',
        price: '290₽',
        image: '/images/burger-ham.jpg',
        weight: '280г'
      },
      {
        id: '4',
        title: 'Лонг Чикен',
        description: 'Длинная булочка, куриная котлета и майонез.',
        price: '250₽',
        image: '/images/long%20chiken.jpg',
        weight: '260г'
      },
      {
        id: '5',
        title: 'Классический',
        description: 'Просто и со вкусом. Ничего лишнего.',
        price: '200₽',
        image: '/images/klassicheskiy.jpg',
        weight: '240г'
      },
      {
        id: '6',
        title: 'Говяжий',
        description: 'Настоящая мясная классика.',
        price: '260₽',
        image: '/images/govyazhiy.jpg',
        weight: '250г'
      },
      {
        id: '7',
        title: 'Арабский',
        description: 'С пикантным восточным соусом.',
        price: '280₽',
        image: '/images/arabskiy.jpg',
        weight: '270г'
      }
    ]
  },
  {
    id: 'rolls',
    title: 'Твистеры и Шаурма',
    description: 'Удобно есть на ходу',
    items: [
      {
        id: '10',
        title: 'Твистер Охотничий',
        description: 'С охотничьими колбасками и соусом барбекю.',
        price: '240₽',
        image: '/images/tvister-oxot.jpg',
        weight: '220г'
      },
      {
        id: '11',
        title: 'Твистер Хам Чикен',
        description: 'Курица, салат и тортилья.',
        price: '230₽',
        image: '/images/tvister-ham-chiken.jpg', // Исправлено
        weight: '210г'
      },
      {
        id: '12',
        title: 'Шаурма Классик',
        description: 'Традиционный рецепт.',
        price: '250₽',
        image: '/images/arabka.jpg', 
        weight: '350г'
      },
      {
        id: '13',
        title: 'Шаурма Сырная',
        description: 'Много расплавленного сыра.',
        price: '270₽',
        image: '/images/twister.jpg',
        weight: '360г'
      },
      {
        id: '14',
        title: 'Арабка',
        description: 'Особый рецепт в арабском хлебе.',
        price: '260₽',
        image: '/images/arabka.jpg',
        weight: '300г'
      }
    ]
  },
  {
    id: 'snacks',
    title: 'Закуски',
    description: 'Идеальное дополнение',
    items: [
      {
        id: '20',
        title: 'Картофель Фри',
        description: 'Золотистая и хрустящая.',
        price: '120₽',
        image: '/images/fri.jpg',
        weight: '100г'
      },
      {
        id: '21',
        title: 'Наггетсы',
        description: 'Нежное куриное филе (6 шт).',
        price: '150₽',
        image: '/images/nagetsy.jpg',
        weight: '120г'
      },
      {
        id: '22',
        title: 'Острые крылышки',
        description: 'Для тех, кто любит погорячее.',
        price: '280₽',
        image: '/images/ostrie-krylishki.jpg', // Исправлено
        weight: '250г'
      },
      {
        id: '23',
        title: 'Острый меч',
        description: 'Фирменная острая закуска.',
        price: '300₽',
        image: '/images/ostriy-mech.jpg',
        weight: '200г'
      },
       {
        id: '24',
        title: 'Охотничий',
        description: 'Колбаски гриль.',
        price: '220₽',
        image: '/images/oxotnichiy.jpg',
        weight: '180г'
      }
    ]
  }
]