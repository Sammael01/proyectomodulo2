import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Alojamientoservice } from '../../services/alojamientoservice';
import { Alojamiento, etiquetaCalificacion, fondo } from '../../models/alojamiento';

@Component({
  selector: 'app-detallecomponent',
  standalone: false,
  styleUrl: './detallecomponent.css',
  templateUrl: './detallecomponent.html',
})
export class Detallecomponent implements OnInit {
  private servicio: Alojamientoservice = inject(Alojamientoservice);
  private ruta: ActivatedRoute = inject(ActivatedRoute);
  fondo = fondo;
  etiquetaCalificacion = etiquetaCalificacion;

  alojamiento = signal<Alojamiento | undefined>(undefined);
  estado = signal<string>('cargando');
  imagenActual: number = 0;

  ngOnInit(): void {
    this.ruta.paramMap
      .pipe(
        map((params: ParamMap) => Number(params.get('id'))),
        switchMap((id: number) => this.servicio.getAlojamientoPorId(id)),
      )
      .subscribe({
        next: (a: Alojamiento | undefined) => {
          this.imagenActual = 0;
          this.alojamiento.set(a);
          this.estado.set('listo');
        },
        error: () => this.estado.set('error'),
      });
  }
}
