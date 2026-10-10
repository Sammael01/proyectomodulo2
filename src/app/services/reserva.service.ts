import { Injectable, signal } from '@angular/core';
import { Alojamiento } from '../models/alojamiento.model';
import { Cotizacion } from '../models/cotizacion.model';
import { Reserva } from '../models/reserva.model';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  // Las reservas viven en memoria mientras la aplicación esté abierta.
  private readonly _reservas = signal<Reserva[]>([]);
  readonly reservas = this._reservas.asReadonly();

  crear(alojamiento: Alojamiento, cotizacion: Cotizacion, nombreHuesped: string, correo: string): Reserva {
    const reserva: Reserva = {
      id: 'RES-' + Date.now().toString(36).toUpperCase(),
      alojamientoId: alojamiento.id,
      alojamientoNombre: alojamiento.nombre,
      ciudad: alojamiento.ciudad,
      imagen: alojamiento.imagenPrincipal,
      fechaLlegada: cotizacion.fechaLlegada,
      fechaSalida: cotizacion.fechaSalida,
      huespedes: cotizacion.huespedes,
      noches: cotizacion.noches,
      total: cotizacion.total,
      nombreHuesped: nombreHuesped.trim(),
      correo: correo.trim(),
      estado: 'CONFIRMADA'
    };
    this._reservas.update(lista => [reserva, ...lista]);
    return reserva;
  }
}
