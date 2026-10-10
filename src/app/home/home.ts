import { Component, computed, signal } from '@angular/core';
import { HOTELS, Hotel } from '../data/hotels';
import { HotelCard } from '../hotel-card/hotel-card';
import { SearchBar } from '../search-bar/search-bar';

const PAGE_SIZE = 4;
const MIN_PRICE = 45;
const MAX_PRICE = 320;
const MAX_DISTANCE = 5;

@Component({
  selector: 'app-home',
  imports: [SearchBar, HotelCard],
  templateUrl: './home.html',
})
export class Home {
  readonly minPrice = MIN_PRICE;
  readonly maxPriceLimit = MAX_PRICE;
  readonly maxDistanceLimit = MAX_DISTANCE;
  readonly starOptions = [3, 4, 5];
  readonly typeOptions = ['Hotel', 'Apartamento', 'Hostal', 'Resort'];
  readonly serviceOptions = [
    { key: 'wifi', label: 'WiFi gratis' },
    { key: 'piscina', label: 'Piscina' },
    { key: 'parking', label: 'Parking' },
    { key: 'desayuno', label: 'Desayuno incluido' },
    { key: 'gimnasio', label: 'Gimnasio' },
    { key: 'spa', label: 'Spa' },
  ];
  readonly sortOptions = ['Recomendados', 'Mejor precio', 'Mejor valoración'];

  readonly maxPrice = signal(MAX_PRICE);
  readonly maxDistance = signal(MAX_DISTANCE);
  readonly stars = signal<number | null>(null);
  readonly types = signal<string[]>([]);
  readonly services = signal<string[]>([]);
  readonly sort = signal('Recomendados');
  readonly page = signal(1);

  readonly filtered = computed(() => {
    const types = this.types();
    const services = this.services();
    const stars = this.stars();
    const list = HOTELS.filter(
      (hotel) =>
        this.bestPrice(hotel) <= this.maxPrice() &&
        hotel.distance <= this.maxDistance() &&
        (stars === null || hotel.stars === stars) &&
        (types.length === 0 || types.includes(hotel.type)) &&
        services.every((service) => hotel.services.includes(service)),
    );
    if (this.sort() === 'Mejor precio') {
      return [...list].sort((a, b) => this.bestPrice(a) - this.bestPrice(b));
    }
    if (this.sort() === 'Mejor valoración') {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  });

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / PAGE_SIZE)));
  readonly pages = computed(() => Array.from({ length: this.totalPages() }, (_, index) => index + 1));
  readonly currentPage = computed(() => Math.min(this.page(), this.totalPages()));
  readonly visible = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.filtered().slice(start, start + PAGE_SIZE);
  });

  bestPrice(hotel: Hotel): number {
    return Math.min(...hotel.offers.map((offer) => offer.price));
  }

  numberValue(event: Event): number {
    return Number((event.target as HTMLInputElement).value);
  }

  setPrice(event: Event): void {
    this.maxPrice.set(this.numberValue(event));
    this.page.set(1);
  }

  setDistance(event: Event): void {
    this.maxDistance.set(this.numberValue(event));
    this.page.set(1);
  }

  setStars(value: number): void {
    this.stars.update((current) => (current === value ? null : value));
    this.page.set(1);
  }

  toggleType(value: string): void {
    this.types.update((list) => this.toggle(list, value));
    this.page.set(1);
  }

  toggleService(value: string): void {
    this.services.update((list) => this.toggle(list, value));
    this.page.set(1);
  }

  setSort(value: string): void {
    this.sort.set(value);
    this.page.set(1);
  }

  goTo(value: number): void {
    this.page.set(Math.min(Math.max(1, value), this.totalPages()));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  clear(): void {
    this.maxPrice.set(MAX_PRICE);
    this.maxDistance.set(MAX_DISTANCE);
    this.stars.set(null);
    this.types.set([]);
    this.services.set([]);
    this.page.set(1);
  }

  private toggle(list: string[], value: string): string[] {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
  }
}
