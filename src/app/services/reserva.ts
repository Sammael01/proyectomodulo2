import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private reservas: any[] = [];

  constructor() {}

  crearReserva(reserva: any): Observable<any> {
    this.reservas.push(reserva);
    return of({ success: true, reserva });
  }

  getReservas(): Observable<any[]> {
    return of(this.reservas);
  }
}
