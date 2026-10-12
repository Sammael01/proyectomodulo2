import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Alojamiento } from '../../models/alojamiento';
import { Cotizacion } from '../../models/cotizacion';
import { ReservaService } from '../../services/reserva';

@Component({
  selector: 'app-simulacionreservacomponent',
  standalone: false,
  templateUrl: './simulacionreservacomponent.html',
  styleUrl: './simulacionreservacomponent.css',
})
export class Simulacionreservacomponent {
  @Input() alojamiento!: Alojamiento;
  @Input() cotizacion!: Cotizacion;

  nombre: string = '';
  correo: string = '';
  errorNombre: string = '';
  errorCorreo: string = '';

  constructor(
    private reservaService: ReservaService,
    private router: Router,
  ) {}

  confirmarReserva(): void {
    const datosValidos = this.validarDatos();
    if (!datosValidos || !this.cotizacion) {
      return;
    }

    // Creamos el objeto de la reserva y lo enviamos al servicio
    const nuevaReserva = {
      nombre: this.nombre,
      correo: this.correo,
      alojamiento: this.alojamiento,
      cotizacion: this.cotizacion,
      fechaReserva: new Date()
    };

    this.reservaService.crearReserva(nuevaReserva).subscribe({
      next: () => {
        this.router.navigate(['/mis-reservas']);
      }
    });
  }

  private validarDatos(): boolean {
    const nombre = this.nombre.trim();
    const correo = this.correo.trim();
    this.errorNombre = '';
    this.errorCorreo = '';

    if (nombre === '') {
      this.errorNombre = 'Ingresa el nombre del huésped.';
    }

    if (correo === '') {
      this.errorCorreo = 'Ingresa el correo electrónico.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      this.errorCorreo = 'Ingresa un correo válido, por ejemplo usuario@correo.com.';
    }

    return this.errorNombre === '' && this.errorCorreo === '';
  }
}
