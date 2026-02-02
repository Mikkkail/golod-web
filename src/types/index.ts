export interface Customization {
  id: string;
  name: string;
  price: number;
}

export interface CustomizationDetails {
  addons: Customization[];
  removals: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  nameRu: string;
  description: string;
  price: number;
  image: string;
  category: 'hotdog' | 'burger' | 'twister' | 'snacks';
  isHit?: boolean;
  nutrition: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
}

export interface MenuCategory {
  id: string;
  name: string;
  nameRu: string;
  icon: string;
  items: MenuItem[];
}

export interface RestaurantInfo {
  name: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  hours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  icon: string;
  validUntil?: string;
}
