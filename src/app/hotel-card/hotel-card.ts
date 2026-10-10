import { Component, computed, input } from '@angular/core';
import { Hotel } from '../data/hotels';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.html',
})
export class HotelCard {
  readonly hotel = input.required<Hotel>();
  readonly starSlots = [1, 2, 3, 4, 5];
  readonly offers = computed(() => [...this.hotel().offers].sort((a, b) => a.price - b.price));
  readonly best = computed(() => this.offers()[0].price);
}
