import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Alojamiento } from '../models/alojamiento';

@Injectable({ providedIn: 'root' })
export class Alojamientoservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = 'data/alojamientos.json';

  getAlojamientos(): Observable<Alojamiento[]> {
    return this.cliente.get<Alojamiento[]>(this.URL_BASE);
  }

  getAlojamientoPorId(id: number): Observable<Alojamiento | undefined> {
    return this.getAlojamientos().pipe(
      map((lista: Alojamiento[]) => lista.find((a: Alojamiento) => a.id === id)),
    );
  }
}
