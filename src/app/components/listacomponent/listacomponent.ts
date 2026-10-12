import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alojamiento } from '../../models/alojamiento';
import { Filtros } from '../../models/filtros';
import { AlojamientoService } from '../../services/alojamiento';

@Component({
  selector: 'app-listacomponent',
  standalone: false,
  templateUrl: './listacomponent.html',
  styleUrl: './listacomponent.css',
})
export class Listacomponent implements OnInit {
  alojamientos: Alojamiento[] = [];
  ciudades: string[] = [];
  tipos: string[] = [];
  filtros: Filtros = { ciudad: '', tipo: '' };
  cargando: boolean = true;
  error: boolean = false;

  constructor(
    private alojamientoService: AlojamientoService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const ciudad = this.route.snapshot.queryParamMap.get('ciudad');
    if (ciudad) {
      this.filtros.ciudad = ciudad;
    }

    this.alojamientoService.getCiudades().subscribe({
      next: (ciudades) => {
        this.ciudades = ciudades;
        this.cdr.markForCheck();
      },
    });

    this.alojamientoService.getTipos().subscribe({
      next: (tipos) => {
        this.tipos = tipos;
        this.cdr.markForCheck();
      },
    });

    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    this.alojamientoService.filtrar(this.filtros).subscribe({
      next: (lista) => {
        this.alojamientos = lista;
        this.cargando = false;
        this.error = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = true;
        this.cargando = false;
        this.cdr.markForCheck();
      },
    });
  }

  limpiarFiltros(): void {
    this.filtros = { ciudad: '', tipo: '' };
    this.aplicarFiltros();
  }
}
