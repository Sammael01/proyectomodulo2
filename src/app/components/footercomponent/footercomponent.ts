import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlojamientoService } from '../../services/alojamiento';

@Component({
  selector: 'app-footercomponent',
  standalone: false,
  templateUrl: './footercomponent.html',
  styleUrl: './footercomponent.css',
})
export class Footercomponent implements OnInit {
  ciudades: string[] = [];

  constructor(
    private alojamientoService: AlojamientoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.alojamientoService.getCiudades().subscribe({
      next: (ciudades) => {
        this.ciudades = ciudades;
        this.cdr.markForCheck();
      },
    });
  }
}
