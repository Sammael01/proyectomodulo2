import { Injectable } from '@angular/core';
import { Alojamiento } from '../models/alojamiento';
import { Cotizacion } from '../models/cotizacion';

@Injectable({ providedIn: 'root' })
export class CotizacionService {
  public validar(
    alojamiento: Alojamiento,
    llegada: string,
    salida: string,
    huespedes: number,
  ): string[] {
    const errores: string[] = [];

    if (!llegada || !salida) {
      errores.push('Selecciona la fecha de llegada y la de salida.');
    } else {
      if (llegada < this.fechaHoy()) {
        errores.push('La fecha de llegada no puede ser anterior a hoy.');
      }
      if (salida <= llegada) {
        errores.push('La fecha de salida debe ser posterior a la de llegada.');
      }
    }

    if (!huespedes || huespedes <= 0 || !Number.isInteger(huespedes)) {
      errores.push('El número de huéspedes debe ser un número entero mayor que cero.');
    } else if (huespedes > alojamiento.capacidad) {
      errores.push(`Este alojamiento admite máximo ${alojamiento.capacidad} huéspedes.`);
    }

    if (alojamiento.precioNoche <= 0) {
      errores.push('Este alojamiento no tiene un precio por noche válido.');
    }

    return errores;
  }

  public calcular(
    alojamiento: Alojamiento,
    llegada: string,
    salida: string,
    huespedes: number,
  ): Cotizacion {
    const milisegundos = new Date(salida).getTime() - new Date(llegada).getTime();
    const noches = Math.round(milisegundos / 86400000);
    const subtotal = noches * alojamiento.precioNoche;
    const tarifaServicio = Math.round(subtotal * 0.1);

    return {
      alojamientoId: alojamiento.id,
      fechaLlegada: llegada,
      fechaSalida: salida,
      huespedes: huespedes,
      noches: noches,
      precioNoche: alojamiento.precioNoche,
      subtotal: subtotal,
      tarifaLimpieza: alojamiento.tarifaLimpieza,
      tarifaServicio: tarifaServicio,
      total: subtotal + alojamiento.tarifaLimpieza + tarifaServicio,
    };
  }

  public fechaHoy(): string {
    const hoy = new Date();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    return `${hoy.getFullYear()}-${mes}-${dia}`;
  }
}
