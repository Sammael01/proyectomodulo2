export interface Offer {
  site: string;
  price: number;
}

export interface Hotel {
  id: number;
  name: string;
  type: string;
  stars: number;
  zone: string;
  distance: number;
  note?: string;
  badge: string;
  urgent?: boolean;
  amenities: string[];
  services: string[];
  ratingLabel: string;
  rating: number;
  reviews: number;
  gradient: string;
  offers: Offer[];
}

export const HOTELS: Hotel[] = [
  {
    id: 1,
    name: 'Hotel Mediterráneo Palace',
    type: 'Hotel',
    stars: 5,
    zone: 'La Rambla, Barcelona',
    distance: 0.2,
    badge: 'Desayuno disponible',
    amenities: ['WiFi', 'Piscina', 'Gimnasio', 'Spa'],
    services: ['wifi', 'piscina', 'gimnasio', 'spa'],
    ratingLabel: 'Fantástico',
    rating: 9.2,
    reviews: 1847,
    gradient: 'linear-gradient(90deg, #3b82f6, #a855f7, #ec4899)',
    offers: [
      { site: 'Booking.com', price: 189 },
      { site: 'Hotels.com', price: 195 },
      { site: 'Expedia', price: 201 },
    ],
  },
  {
    id: 2,
    name: 'Casa Nova Boutique',
    type: 'Hotel',
    stars: 4,
    zone: 'Barrio Gótico, Barcelona',
    distance: 0.4,
    badge: 'Parking gratis',
    amenities: ['WiFi', 'Terraza', 'Servicio habitaciones'],
    services: ['wifi', 'parking'],
    ratingLabel: 'Excelente',
    rating: 8.7,
    reviews: 923,
    gradient: 'linear-gradient(90deg, #f97316, #ec4899, #8b5cf6)',
    offers: [
      { site: 'HotelVista', price: 127 },
      { site: 'Booking.com', price: 134 },
      { site: 'Agoda', price: 139 },
    ],
  },
  {
    id: 3,
    name: 'Barcelona Urban Suites',
    type: 'Apartamento',
    stars: 4,
    zone: 'Eixample, Barcelona',
    distance: 1.1,
    badge: '¡Últimas 3 habitaciones!',
    urgent: true,
    amenities: ['WiFi', 'Cocina equipada', 'Parking'],
    services: ['wifi', 'parking'],
    ratingLabel: 'Muy Bueno',
    rating: 8.4,
    reviews: 1205,
    gradient: 'linear-gradient(90deg, #06b6d4, #2563eb, #1d4ed8)',
    offers: [
      { site: 'Hotels.com', price: 98 },
      { site: 'Expedia', price: 102 },
      { site: 'Booking.com', price: 105 },
    ],
  },
  {
    id: 4,
    name: 'Hostal del Mar',
    type: 'Hostal',
    stars: 3,
    zone: 'Barceloneta, Barcelona',
    distance: 1.8,
    note: 'junto a playa',
    badge: 'Desayuno incluido',
    amenities: ['WiFi', 'Aire acondicionado', 'Admite mascotas'],
    services: ['wifi', 'desayuno'],
    ratingLabel: 'Bueno',
    rating: 7.9,
    reviews: 654,
    gradient: 'linear-gradient(90deg, #10b981, #f59e0b, #ef4444)',
    offers: [
      { site: 'Agoda', price: 67 },
      { site: 'HotelVista', price: 72 },
      { site: 'Booking.com', price: 74 },
    ],
  },
  {
    id: 5,
    name: 'Gran Vía Skyline Hotel',
    type: 'Hotel',
    stars: 5,
    zone: 'Gran Vía, Barcelona',
    distance: 0.9,
    badge: 'Cancelación gratis',
    amenities: ['WiFi', 'Piscina', 'Spa', 'Parking'],
    services: ['wifi', 'piscina', 'spa', 'parking'],
    ratingLabel: 'Fantástico',
    rating: 9.0,
    reviews: 2114,
    gradient: 'linear-gradient(90deg, #8b5cf6, #6366f1, #06b6d4)',
    offers: [
      { site: 'Expedia', price: 242 },
      { site: 'Booking.com', price: 251 },
      { site: 'HotelVista', price: 259 },
    ],
  },
  {
    id: 6,
    name: 'Montjuïc Garden Resort',
    type: 'Resort',
    stars: 4,
    zone: 'Montjuïc, Barcelona',
    distance: 2.6,
    badge: 'Desayuno incluido',
    amenities: ['WiFi', 'Piscina', 'Gimnasio', 'Jardín'],
    services: ['wifi', 'piscina', 'gimnasio', 'desayuno'],
    ratingLabel: 'Excelente',
    rating: 8.8,
    reviews: 1392,
    gradient: 'linear-gradient(90deg, #22c55e, #14b8a6, #3b82f6)',
    offers: [
      { site: 'HotelVista', price: 158 },
      { site: 'Agoda', price: 163 },
      { site: 'Hotels.com', price: 171 },
    ],
  },
  {
    id: 7,
    name: 'Gràcia Loft Apartments',
    type: 'Apartamento',
    stars: 3,
    zone: 'Gràcia, Barcelona',
    distance: 2.1,
    badge: 'Parking gratis',
    amenities: ['WiFi', 'Cocina equipada', 'Lavadora'],
    services: ['wifi', 'parking'],
    ratingLabel: 'Muy Bueno',
    rating: 8.2,
    reviews: 487,
    gradient: 'linear-gradient(90deg, #f59e0b, #f97316, #ec4899)',
    offers: [
      { site: 'Booking.com', price: 84 },
      { site: 'Agoda', price: 88 },
      { site: 'Expedia', price: 93 },
    ],
  },
  {
    id: 8,
    name: 'Port Vell Marina Hotel',
    type: 'Hotel',
    stars: 4,
    zone: 'Port Vell, Barcelona',
    distance: 1.3,
    badge: '¡Últimas 2 habitaciones!',
    urgent: true,
    amenities: ['WiFi', 'Piscina', 'Gimnasio'],
    services: ['wifi', 'piscina', 'gimnasio'],
    ratingLabel: 'Excelente',
    rating: 8.6,
    reviews: 1076,
    gradient: 'linear-gradient(90deg, #0ea5e9, #6366f1, #a855f7)',
    offers: [
      { site: 'Hotels.com', price: 143 },
      { site: 'HotelVista', price: 149 },
      { site: 'Booking.com', price: 152 },
    ],
  },
  {
    id: 9,
    name: 'Hostal Sagrada Familia',
    type: 'Hostal',
    stars: 3,
    zone: 'Sagrada Familia, Barcelona',
    distance: 2.4,
    badge: 'Cancelación gratis',
    amenities: ['WiFi', 'Aire acondicionado', 'Recepción 24h'],
    services: ['wifi'],
    ratingLabel: 'Bueno',
    rating: 7.6,
    reviews: 812,
    gradient: 'linear-gradient(90deg, #ef4444, #f97316, #f59e0b)',
    offers: [
      { site: 'Agoda', price: 54 },
      { site: 'Booking.com', price: 58 },
      { site: 'Hotels.com', price: 61 },
    ],
  },
  {
    id: 10,
    name: 'Tibidabo Wellness Resort',
    type: 'Resort',
    stars: 5,
    zone: 'Tibidabo, Barcelona',
    distance: 4.7,
    badge: 'Desayuno incluido',
    amenities: ['WiFi', 'Piscina', 'Spa', 'Gimnasio'],
    services: ['wifi', 'piscina', 'spa', 'gimnasio', 'desayuno', 'parking'],
    ratingLabel: 'Fantástico',
    rating: 9.4,
    reviews: 1630,
    gradient: 'linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6)',
    offers: [
      { site: 'HotelVista', price: 298 },
      { site: 'Expedia', price: 310 },
      { site: 'Booking.com', price: 318 },
    ],
  },
];
