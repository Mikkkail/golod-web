import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateStructuredData(type: string, data: any) {
  // Базовая структура
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': type,
    name: data.name || 'GOLOD',
    telephone: data.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address,
    },
  }

  // БЕЗОПАСНАЯ ПРОВЕРКА КООРДИНАТ
  // Мы проверяем: существует ли location? И есть ли внутри lat?
  // Только если всё есть — добавляем в схему.
  if (data.location && data.location.lat) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: data.location.lat,
      longitude: data.location.lng,
    }
  }

  // Если есть часы работы
  if (data.workHours) {
    schema.openingHoursSpecification = {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
      ],
      opens: '00:00',
      closes: '23:59',
    }
  }

  // Если есть соцсети
  if (data.social && data.social.instagram) {
    schema.sameAs = [data.social.instagram]
  }

  return schema
}