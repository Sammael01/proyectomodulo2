import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alojamiento } from '../../models/alojamiento';
import { AlojamientoService } from '../../services/alojamiento';

@Component({
  selector: 'app-iniciocomponent',
  standalone: false,
  templateUrl: './iniciocomponent.html',
  styleUrl: './iniciocomponent.css',
})
export class Iniciocomponent implements OnInit {
  destacados: Alojamiento[] = [];
  ciudades: string[] = [];
  ciudad: string = '';
  cargando: boolean = true;
  error: boolean = false;

  constructor(
    private alojamientoService: AlojamientoService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.alojamientoService.getDestacados(3).subscribe({
      next: (lista) => {
        this.destacados = lista;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = true;
        this.cargando = false;
        this.cdr.markForCheck();
      },
    });

    this.alojamientoService.getCiudades().subscribe({
      next: (ciudades) => {
        this.ciudades = ciudades;
        this.cdr.markForCheck();
      },
    });
  }

  buscar(): void {
    if (this.ciudad) {
      this.router.navigate(['/alojamientos'], { queryParams: { ciudad: this.ciudad } });
    } else {
      this.router.navigate(['/alojamientos']);
    }
  }
}
