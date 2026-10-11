import { Component, inject, OnInit, signal } from '@angular/core';
import { Alojamientoservice } from '../../services/alojamientoservice';
import { Alojamiento, etiquetaCalificacion, fondo } from '../../models/alojamiento';

@Component({
  selector: 'app-listacomponent',
  standalone: false,
  styleUrl: './listacomponent.css',
  templateUrl: './listacomponent.html',
})
export class Listacomponent implements OnInit {
  private servicio: Alojamientoservice = inject(Alojamientoservice);
  fondo = fondo;
  etiquetaCalificacion = etiquetaCalificacion;

  tipos: string[] = ['Hotel', 'Apartamento', 'Hostal', 'Resort'];
  servicios: string[] = ['WiFi', 'Piscina', 'Parking', 'Desayuno incluido', 'Gimnasio', 'Spa'];

  alojamientos = signal<Alojamiento[]>([]);
  estado = signal<string>('cargando');

  busqueda: string = '';
  precioMax: number = 320;
  minEstrellas: number = 0;
  tiposSel: Record<string, boolean> = {};
  serviciosSel: Record<string, boolean> = {};

  ngOnInit(): void {
    this.servicio.getAlojamientos().subscribe({
      next: (lista: Alojamiento[]) => {
        this.alojamientos.set(lista);
        this.estado.set('listo');
      },
      error: () => this.estado.set('error'),
    });
  }

  filtrar(): Alojamiento[] {
    const tipos: string[] = this.tipos.filter((t: string) => this.tiposSel[t]);
    const servicios: string[] = this.servicios.filter((s: string) => this.serviciosSel[s]);
    return this.alojamientos()
      .filter(
        (a: Alojamiento) =>
          a.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) &&
          a.precioNoche <= this.precioMax &&
          a.estrellas >= this.minEstrellas &&
          (tipos.length === 0 || tipos.includes(a.tipo)) &&
          servicios.every((s: string) =>
            a.servicios.some((x: string) => x.toLowerCase().includes(s.toLowerCase())),
          ),
      )
      .sort((x: Alojamiento, y: Alojamiento) => x.precioNoche - y.precioNoche);
  }

  elegirEstrellas(n: number): void {
    this.minEstrellas = this.minEstrellas === n ? 0 : n;
  }

  limpiar(): void {
    this.busqueda = '';
    this.precioMax = 320;
    this.minEstrellas = 0;
    this.tiposSel = {};
    this.serviciosSel = {};
  }
}
