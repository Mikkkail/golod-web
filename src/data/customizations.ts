export interface Customization {
  id: string
  name: string
  price: number
}

export interface CategoryCustomizations {
  addons: Customization[]
  removals: string[]
}

export const customizations: Record<string, CategoryCustomizations> = {
  burgers: {
    addons: [
      { id: 'double-patty', name: 'Двойная котлета', price: 100 },
      { id: 'cheese', name: 'Сыр', price: 50 },
      { id: 'bacon', name: 'Бекон', price: 80 },
      { id: 'sauce', name: 'Доп. соус', price: 30 },
      { id: 'pickles', name: 'Маринованные огурцы', price: 20 },
      { id: 'jalapeno', name: 'Халапеньо', price: 40 },
    ],
    removals: ['Без лука', 'Без помидоров', 'Без соуса', 'Без салата']
  },
  rolls: {
    addons: [
      { id: 'cheese', name: 'Сыр', price: 50 },
      { id: 'sauce', name: 'Доп. соус', price: 30 },
      { id: 'vegetables', name: 'Доп. овощи', price: 40 },
      { id: 'meat', name: 'Доп. мясо', price: 100 },
    ],
    removals: ['Без лука', 'Без помидоров', 'Без соуса', 'Без капусты']
  },
  snacks: {
    addons: [
      { id: 'sauce', name: 'Соус на выбор', price: 30 },
      { id: 'cheese-sauce', name: 'Сырный соус', price: 50 },
    ],
    removals: []
  }
}

// Функция для получения кастомизаций по категории товара
export function getCustomizationsForCategory(categoryId: string): CategoryCustomizations {
  return customizations[categoryId] || { addons: [], removals: [] }
}
