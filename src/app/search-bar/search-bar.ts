import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.html',
})
export class SearchBar {
  readonly destination = signal('Barcelona, España');
  readonly checkIn = signal('2026-10-15');
  readonly checkOut = signal('2026-10-18');
  readonly guests = signal('2 adultos, 1 habitación');
  readonly guestOptions = [
    '1 adulto, 1 habitación',
    '2 adultos, 1 habitación',
    '3 adultos, 1 habitación',
    '4 adultos, 2 habitaciones',
  ];

  readonly nights = computed(() => {
    const diff = new Date(this.checkOut()).getTime() - new Date(this.checkIn()).getTime();
    const value = Math.round(diff / 86400000);
    return Number.isFinite(value) && value > 0 ? value : 0;
  });

  value(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
