import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Alojamiento } from '../../models/alojamiento';
import { Cotizacioncomponent } from './cotizacioncomponent';

const ALOJAMIENTO: Alojamiento = {
  id: 1,
  nombre: 'Loft moderno en Chapinero',
  descripcion: 'Loft moderno ubicado cerca de restaurantes, cafés y zonas comerciales de Bogotá.',
  ciudad: 'Bogotá',
  ubicacion: 'Chapinero, Bogotá',
  tipo: 'Apartamento',
  capacidad: 2,
  habitaciones: 1,
  camas: 1,
  banos: 1,
  precioNoche: 180000,
  tarifaLimpieza: 45000,
  calificacion: 4.8,
  activo: true,
  imagenPrincipal: 'assets/images/loft-bogota.jpg',
  imagenes: ['assets/images/loft-bogota.jpg'],
  servicios: ['Wi-Fi'],
  reglas: ['No fumar'],
};

describe('Cotizacioncomponent', () => {
  let component: Cotizacioncomponent;
  let fixture: ComponentFixture<Cotizacioncomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cotizacioncomponent],
      imports: [FormsModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Cotizacioncomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('alojamiento', ALOJAMIENTO);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
