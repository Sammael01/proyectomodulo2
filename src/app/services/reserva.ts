import {Injectable} from '@angular/core';
import {Reserva} from "../models/reserva";
import {Alojamiento} from '../models/alojamiento';
import {Cotizacion} from '../models/cotizacion';

@Injectable({providedIn: 'root'})
export class ReservaService {
  private clave = 'reservas';

  public getReservas(): Reserva[] {
    const texto = localStorage.getItem(this.clave);
    return texto ? JSON.parse(texto) : [];
  }

  public crearReserva(alojamiento: Alojamiento, cotizacion: Cotizacion, nombreHuesped: string, correo: string): Reserva {
    const reservas = this.getReservas();

    let mayorId = 0;
    for (const r of reservas) {
      if (r.id > mayorId) {
        mayorId = r.id;
      }
    }

    const reserva: Reserva = {
      id: mayorId + 1,
      alojamientoId: alojamiento.id,
      alojamientoNombre: alojamiento.nombre,
      ciudad: alojamiento.ciudad,
      fechaLlegada: cotizacion.fechaLlegada,
      fechaSalida: cotizacion.fechaSalida,
      huespedes: cotizacion.huespedes,
      noches: cotizacion.noches,
      total: cotizacion.total,
      nombreHuesped: nombreHuesped,
      correo: correo,
      estado: 'CONFIRMADA',
    };

    reservas.push(reserva);
    localStorage.setItem(this.clave, JSON.stringify(reservas));
    return reserva;
  }
}
