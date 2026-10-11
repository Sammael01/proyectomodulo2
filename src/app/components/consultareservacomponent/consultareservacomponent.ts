import {Component, computed, inject} from '@angular/core';
import {EstadoReserva} from '../../models/reserva.model';
import {ReservaService} from '../../services/reserva.service';

/*Fila lista para mostrar: la plantilla no formatea ni decide nada.*/
interface FilaReserva {
  id: string;
  alojamiento: string;
  ciudad: string;
  llegada: string;
  salida: string;
  huespedes: number;
  total: string;
  estado: EstadoReserva;
  claseEstado: string;
}

@Component({
  selector: 'app-consultareservacomponent',
  standalone: false,
  styleUrl: './consultareservacomponent.css',
  templateUrl: './consultareservacomponent.html',
})
export class Consultareservacomponent {
  private reservaService = inject(ReservaService);

  private readonly formatoMoneda = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  });

  /*Se recalcula sola cada vez que el servicio registra una reserva nueva. */
  fila = computed<FilaReserva[]>(() =>
    this.reservaService.reservas().map(r => ({
      id: r.id,
      alojamiento: r.alojamientoNombre,
      ciudad: r.ciudad,
      llegada: this.fecha(r.fechaLlegada),
      salida: this.fecha(r.fechaSalida),
      huespedes: r.huespedes,
      total: this.formatoMoneda.format(r.total),
      estado: r.estado,
      claseEstado: this.claseEstado(r.estado),
    }))
  );

  hayReservas = computed(() => this.fila().length > 0);

  resumen = computed(() => {
    const cantidad = this.fila().length;
    return cantidad === 1 ? '1 reserva realizada' : `${cantidad} reservas realizadas`;
  });

  private claseEstado(estado: EstadoReserva): string {
    return estado === 'CONFIRMADA' ? 'estado--confirmada' : 'estado--cancelada';
  }

  /*Convierte 'YYYY-MM-DD' en 'DD/MM/YYYY'. */
  private fecha(iso: string): string {
    const [anio, mes, dia] = iso.split('-');
    return `${dia}/${mes}/${anio}`;
  }
}
