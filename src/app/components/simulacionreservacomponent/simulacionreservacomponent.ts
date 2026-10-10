import { Component, Input, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alojamiento } from '../../models/alojamiento.model';
import { Cotizacion } from '../../models/cotizacion.model';
import { ReservaService } from '../../services/reserva.service';

type CampoHuesped = 'nombre' | 'correo';

@Component({
  selector: 'app-simulacionreservacomponent',
  standalone: false,
  styleUrl: './simulacionreservacomponent.css',
  templateUrl: './simulacionreservacomponent.html',
})
export class Simulacionreservacomponent {
  @Input({ required: true }) alojamiento!: Alojamiento;
  @Input({ required: true }) cotizacion!: Cotizacion;

  private fb = inject(FormBuilder);
  private reservaService = inject(ReservaService);
  private router = inject(Router);

  private readonly mensajes: Record<CampoHuesped, string> = {
    nombre: 'Ingresa tu nombre (mínimo 3 caracteres).',
    correo: 'Ingresa un correo electrónico válido.',
  };

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
  });

  campoInvalido(campo: CampoHuesped): boolean {
    const control = this.form.controls[campo];
    return control.touched && control.invalid;
  }

  /** Devuelve el mensaje solo si el campo fue tocado y es inválido; si no, texto vacío. */
  mensajeError(campo: CampoHuesped): string {
    return this.campoInvalido(campo) ? this.mensajes[campo] : '';
  }

  confirmarReserva(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const { nombre, correo } = this.form.getRawValue();
    this.reservaService.crear(this.alojamiento, this.cotizacion, nombre, correo);
    this.router.navigate(['/mis-reservas']);
  }
}
