import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DivisaService {
  constructor() {}

  getTasas(): Observable<any> {
    return of({
      base: 'USD',
      rates: { USD: 1, EUR: 0.92, COP: 4000 }
    });
  }
}
