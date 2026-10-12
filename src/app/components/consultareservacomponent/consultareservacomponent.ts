import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../models/reserva';
import { ReservaService } from '../../services/reserva';

@Component({
  selector: 'app-consultareservacomponent',
  standalone: false,
  templateUrl: './consultareservacomponent.html',
  styleUrl: './consultareservacomponent.css',
})
export class Consultareservacomponent implements OnInit {
  reservas: Reserva[] = [];

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.reservas = this.reservaService.getReservas();
  }
}
