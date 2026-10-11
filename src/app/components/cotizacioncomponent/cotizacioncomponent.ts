import {Component, EventEmitter, Input, Output, inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Alojamiento} from '../../models/alojamiento.model';
import {Cotizacion} from '../../models/cotizacion.model';
import {CotizacionService} from '../../services/cotizacion.service';

type CampoCotizacion = 'llegada' | 'salida' | 'huespedes';

interface LineaResumen {
  etiqueta: string;
  valor: string;
}

@Component({
  selector: 'app-cotizacioncomponent',
  standalone: false,
  styleUrl: './cotizacioncomponent.css',
  templateUrl: './cotizacioncomponent.html',
})
export class Cotizacioncomponent {
  @Input({required: true}) alojamiento!: Alojamiento;
  @Output() cotizacionCalculada = new EventEmitter<Cotizacion | null>();

  private fb = inject(FormBuilder);
  private cotizacionService = inject(CotizacionService);

  private readonly formatoMoneda = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  });

  private readonly mensajes: Record<CampoCotizacion, string> = {
    llegada: 'Por favor seleccione la fecha de llegada.',
    salida: 'Por favor seleccione la fecha de salida.',
    huespedes: 'Error: Debe haber al menos un huésped.',
  };

  errores: string[] = [];
  cotizacion: Cotizacion | null = null;
  readonly hoy = this.fechaLocal(new Date());

  form = this.fb.nonNullable.group({
    llegada: ['', Validators.required],
    salida: ['', Validators.required],
    huespedes: [1, [Validators.required, Validators.min(1)]],
  });

  constructor() {
    // Si el usuario cambia un dato, la cotización anterior deja de ser válida.
    this.form.valueChanges.subscribe(() => this.invalidarCotizacion());
  }


  get fechaMinimaSalida(): string {
    return this.form.controls.llegada.value || this.hoy;
  }

  get maximoHuesped(): number {
    return this.alojamiento.capacidad;
  }

  get hayError(): boolean {
    return this.errores.length > 0;
  }

  get precioNocheTexto(): string {
    return this.moneda(this.alojamiento.precioNoche);
  }

  get totalTexto(): string {
    return this.cotizacion ? this.moneda(this.cotizacion.total) : '';
  }

  get lineasResumen(): LineaResumen[] {
    const c = this.cotizacion;
    if (!c) {
      return [];
    }
    return [
      {etiqueta: 'Estancia', valor: `${this.fecha(c.fechaLlegada)} - ${this.fecha(c.fechaSalida)}`},
      {etiqueta: 'Noches', valor: String(c.noches)},
      {etiqueta: `Subtotal (${c.noches} × ${this.moneda(c.precioNoche)})`, valor: this.moneda(c.subtotal)},
      {etiqueta: 'Tarifa de limpieza', valor: this.moneda(c.tarifaLimpieza)},
      {etiqueta: 'Tarifa de servicio (10 %)', valor: this.moneda(c.tarifaServicio)},
    ];
  }

  campoInvalido(campo: CampoCotizacion): boolean {
    const control = this.form.controls[campo];
    return control.touched && control.invalid;
  }

  /** Devuelve el mensaje solo si el campo fue tocado y es inválido; si no, texto vacío. */
  mensajeError(campo: CampoCotizacion): string {
    return this.campoInvalido(campo) ? this.mensajes[campo] : '';
  }

  cotizar(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const {llegada, salida, huespedes} = this.form.getRawValue();
    this.errores = this.cotizacionService.validar(this.alojamiento, llegada, salida, huespedes);

    //Si hubo un error o el usuario cambia el dato se invalida la cotizacion
    if (this.hayError) {
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

  private moneda(valor: number): string {
    return this.formatoMoneda.format(valor);
  }

  //Funciona parecido a LocalDateTime convirtiendo las fechas a un formato especifico basado en años meses dias y viceversa
  //Convierte 'YYYY-MM-DD' en 'DD/MM/YYYY'
  private fecha(iso: string): string {
    const [anio, mes, dia] = iso.split('-');
    return `${dia}/${mes}/${anio}`;
  }

  private fechaLocal(d: Date): string {
    // El metodo padStart sirve para rellenar el inicio (la parte izquierda) de una cadena de texto (string) con otra cadena hasta que alcanze una longitud total determinada.
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mes}-${dia}`;
  }
}
