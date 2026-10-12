import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Alojamiento } from '../../models/alojamiento';
import { Cotizacion } from '../../models/cotizacion';
import { TasasCambio } from '../../models/tasas-cambio';
import { CotizacionService } from '../../services/cotizacion';
import { DivisaService } from '../../services/divisa';

@Component({
  selector: 'app-cotizacioncomponent',
  standalone: false,
  templateUrl: './cotizacioncomponent.html',
  styleUrl: './cotizacioncomponent.css',
})
export class Cotizacioncomponent implements OnInit {
  @Input() alojamiento!: Alojamiento;
  @Output() cotizacionCalculada = new EventEmitter<Cotizacion | null>();

  fechaLlegada: string = '';
  fechaSalida: string = '';
  huespedes: number = 1;
  hoy: string = '';
  errores: string[] = [];
  cotizacion: Cotizacion | null = null;
  tasas: TasasCambio | null = null;
  moneda: string = 'USD';

  constructor(
    private cotizacionService: CotizacionService,
    private divisaService: DivisaService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.hoy = this.cotizacionService.fechaHoy();

    this.divisaService.getTasas().subscribe({
      next: (tasas) => {
        if (tasas.result === 'success') {
          this.tasas = tasas;
          this.cdr.markForCheck();
        }
      },
      error: () => {
        this.tasas = null;
      },
    });
  }

  cotizar(): void {
    this.errores = this.cotizacionService.validar(
      this.alojamiento,
      this.fechaLlegada,
      this.fechaSalida,
      this.huespedes,
    );

    if (this.errores.length > 0) {
      this.cotizacion = null;
    } else {
      this.cotizacion = this.cotizacionService.calcular(
        this.alojamiento,
        this.fechaLlegada,
        this.fechaSalida,
        this.huespedes,
      );
    }

    this.cotizacionCalculada.emit(this.cotizacion);
  }

  invalidar(): void {
    this.errores = [];
    if (this.cotizacion) {
      this.cotizacion = null;
      this.cotizacionCalculada.emit(null);
    }
  }

  convertir(valor: number): number {
    if (!this.tasas) {
      return 0;
    }
    return valor * this.tasas.rates[this.moneda];
  }
}
