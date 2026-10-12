import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Alojamiento } from '../models/alojamiento';

@Injectable({
  providedIn: 'root'
})
export class AlojamientoService {

  private alojamientosList: Alojamiento[] = [];

  constructor() {}

  getDestacados(limite: number): Observable<Alojamiento[]> {
    return of(this.alojamientosList.slice(0, limite));
  }

  getTipos(): Observable<string[]> {
    return of(['Hotel', 'Apartamento', 'Cabaña']);
  }

  filtrar(filtros: any): Observable<Alojamiento[]> {
    return of(this.alojamientosList);
  }

  getCiudades(): Observable<string[]> {
    return of(['Bogotá', 'Medellín', 'Cartagena', 'Cali']);
  }

  getAlojamientoById(id: number): Observable<Alojamiento | undefined> {
    const alojamiento = this.alojamientosList.find(a => a.id === id);
    return of(alojamiento);
  }

  getResenas(id: number): Observable<any[]> {
    return of([]);
  }
}
