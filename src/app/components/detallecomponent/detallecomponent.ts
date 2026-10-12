import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alojamiento } from '../../models/alojamiento';
import { Resena } from '../../models/resena';
import { Cotizacion } from '../../models/cotizacion';
import { AlojamientoService } from '../../services/alojamiento';

@Component({
  selector: 'app-detallecomponent',
  standalone: false,
  templateUrl: './detallecomponent.html',
  styleUrl: './detallecomponent.css',
})
export class Detallecomponent implements OnInit {
  alojamiento: Alojamiento | undefined;
  resenas: Resena[] = [];
  imagenActual: number = 0;
  cotizacion: Cotizacion | null = null;
  cargando: boolean = true;
  error: boolean = false;

  constructor(
    private alojamientoService: AlojamientoService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.alojamientoService.getAlojamientoById(id).subscribe({
      next: (alojamiento) => {
        this.alojamiento = alojamiento;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = true;
        this.cargando = false;
        this.cdr.markForCheck();
      },
    });

    this.alojamientoService.getResenas(id).subscribe({
      next: (resenas) => {
        this.resenas = resenas;
        this.cdr.markForCheck();
      },
    });
  }

  recibirCotizacion(cotizacion: Cotizacion | null): void {
    this.cotizacion = cotizacion;
  }
}
