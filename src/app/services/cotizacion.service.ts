import { Injectable } from '@angular/core';
import { Alojamiento } from '../models/alojamiento.model';
import { Cotizacion } from '../models/cotizacion.model';

const TASA_SERVICIO = 0.10; // 10 % del subtotal
const MS_POR_DIA = 1000 * 60 * 60 * 24;

@Injectable({ providedIn: 'root' })
class CotizacionService {

  private parsear(fecha: string): Date {
    const [y, m, d] = fecha.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  validar(alojamiento: Alojamiento, llegada: string, salida: string, huespedes: number): string[] {
    const errores: string[] = [];

    if (!llegada || !salida) {
      errores.push('Debes seleccionar la fecha de llegada y la de salida.');
      return errores;
    }

    const fLlegada = this.parsear(llegada);
    const fSalida = this.parsear(salida);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fLlegada < hoy) {
      errores.push('La fecha de llegada no puede ser anterior a hoy.');
    }
    if (fSalida <= fLlegada) {
      errores.push('La fecha de salida debe ser posterior a la fecha de llegada.');
    }
    if (!Number.isInteger(huespedes) || huespedes <= 0) {
      errores.push('El número de huéspedes debe ser mayor que cero.');
    }
    if (huespedes > alojamiento.capacidad) {
      errores.push(`Este alojamiento admite máximo ${alojamiento.capacidad} huéspedes.`);
    }
    if (alojamiento.precioNoche <= 0) {
      errores.push('El alojamiento no tiene un precio por noche válido.');
    }
    return errores;
  }

  calcular(alojamiento: Alojamiento, llegada: string, salida: string, huespedes: number): Cotizacion | null {
    if (this.validar(alojamiento, llegada, salida, huespedes).length > 0) {
      return null;
    }

    const noches = Math.round(
      (this.parsear(salida).getTime() - this.parsear(llegada).getTime()) / MS_POR_DIA
    );
    const subtotal = noches * alojamiento.precioNoche;
    const tarifaLimpieza = alojamiento.tarifaLimpieza;
    const tarifaServicio = subtotal * TASA_SERVICIO;
    const total = subtotal + tarifaLimpieza + tarifaServicio;

    // @ts-ignore
    return {
      alojamientoId: alojamiento.id,
      fechaLlegada: llegada,
      fechaSalida: salida,
      huespedes,
      noches,
      precioNoche: alojamiento.precioNoche,
      subtotal,
      tarifaLimpieza,
      tarifaServicio,
      total
    };
  }
}

export default CotizacionService
