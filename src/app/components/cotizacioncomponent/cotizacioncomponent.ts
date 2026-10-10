import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Alojamiento } from '../../models/alojamiento.model';
import { Cotizacion } from '../../models/cotizacion.model';
import CotizacionService from '../../services/cotizacion.service';

type CampoCotizacion = 'llegada' | 'salida' | 'huespedes';

@Component({
  selector: 'app-cotizacioncomponent',
  standalone: false,
  styleUrl: './cotizacioncomponent.css',
  templateUrl: './cotizacioncomponent.html',
})
export class Cotizacioncomponent {
  @Input({ required: true }) alojamiento!: Alojamiento;
  @Output() cotizacionCalculada = new EventEmitter<Cotizacion | null>();

  private fb = inject(FormBuilder);
  private cotizacionService = inject(CotizacionService);

  errores: string[] = [];
  cotizacion: Cotizacion | null = null;
  readonly hoy = this.fechaLocal(new Date());

  form = this.fb.nonNullable.group({
    llegada: ['', Validators.required],
    salida: ['', Validators.required],
    huespedes: [1, [Validators.required, Validators.min(1)]],
  });

  constructor() {
    this.form.valueChanges.subscribe(() => this.invalidarCotizacion());
  }

  get fechaMinimaSalida(): string {
    return this.form.controls.llegada.value || this.hoy;
  }

  get maximoHuespedes(): number {
    return this.alojamiento.capacidad;
  }

  get hayErrores(): boolean {
    return this.errores.length > 0;
  }

  campoInvalido(campo: CampoCotizacion): boolean {
    const control = this.form.controls[campo];
    return control.touched && control.invalid;
  }

  private readonly mensajes: Record<CampoCotizacion, string> = {
    llegada: 'Selecciona la fecha de llegada.',
    salida: 'Selecciona la fecha de salida.',
    huespedes: 'Debe haber al menos un huésped.',
  };

  mensajeError(campo: CampoCotizacion): string {
    return this.campoInvalido(campo) ? this.mensajes[campo] : '';
  }

  cotizar(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const { llegada, salida, huespedes } = this.form.getRawValue();
    this.errores = this.cotizacionService.validar(this.alojamiento, llegada, salida, huespedes);

    if (this.hayErrores) {
      this.invalidarCotizacion(false);
      return;
    }

    this.cotizacion = this.cotizacionService.calcular(this.alojamiento, llegada, salida, huespedes);
    this.cotizacionCalculada.emit(this.cotizacion);
  }

  private invalidarCotizacion(limpiarErrores = true): void {
    this.cotizacion = null;
    if (limpiarErrores) {
      this.errores = [];
    }
    this.cotizacionCalculada.emit(null);
  }

  private fechaLocal(d: Date): string {
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mes}-${dia}`;
  }
}
