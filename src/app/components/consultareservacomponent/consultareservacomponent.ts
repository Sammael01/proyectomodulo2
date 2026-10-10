import { Component, computed, inject } from '@angular/core';
import { EstadoReserva } from '../../models/reserva.model';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-consultareservacomponent',
  standalone: false,
  styleUrl: './consultareservacomponent.css',
  templateUrl: './consultareservacomponent.html',
})
export class Consultareservacomponent {
  private reservaService = inject(ReservaService);

  reservas = this.reservaService.reservas;
  hayReservas = computed(() => this.reservas().length > 0);

  claseEstado(estado: EstadoReserva): string {
    return estado === 'CONFIRMADA' ? 'estado--confirmada' : 'estado--cancelada';
  }
}
