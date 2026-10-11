import {Component, Input, inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Alojamiento} from '../../models/alojamiento.model';
import {Cotizacion} from '../../models/cotizacion.model';
import {ReservaService} from '../../services/reserva.service';

type CampoHuesped = 'nombre' | 'correo';

@Component({
  selector: 'app-simulacionreservacomponent',
  standalone: false,
  styleUrl: './simulacionreservacomponent.css',
  templateUrl: './simulacionreservacomponent.html',
})
export class Simulacionreservacomponent {
  @Input({required: true}) alojamiento!: Alojamiento;
  @Input({required: true}) cotizacion!: Cotizacion;

  private fb = inject(FormBuilder);
  private reservaService = inject(ReservaService);

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
  });

  campoInvalido(campo: CampoHuesped): boolean {
    const control = this.form.controls[campo];
    return control.touched && control.invalid;
  }

  // Devuelve un mensaje de error especifico segun el requerimiento funcional que este fallando
  mensajeError(campo: CampoHuesped): string {
    if (!this.campoInvalido(campo)) return '';

    const control = this.form.controls[campo];

    if (campo === 'nombre') {
      if (control.hasError('required')) {
        return 'El nombre completo es obligatorio';
      }
      if (control.hasError('minlength')) {
        return 'El nombre debe tener al menos 3 caracteres.';
      }
      return 'Nombre inválido.';
    }

    if (campo === 'correo') {
      if (control.hasError('required')) {
        return 'El correo electrónico es obligatorio.';
      }
      if (control.hasError('email')) {
        return 'Ingresa un formato de correo válido (ej. usuario@correo.com).';
      }
      return 'Correo inválido.';
    }

    return 'Campo inválido.';
  }

  confirmarReserva(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || !this.alojamiento || !this.cotizacion) {
      return;
    }

    const {nombre, correo} = this.form.getRawValue();
    this.reservaService.crear(this.alojamiento, this.cotizacion, nombre, correo);

  }
}
