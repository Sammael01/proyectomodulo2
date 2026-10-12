import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { Alojamiento } from '../../models/alojamiento';
import { Cotizacion } from '../../models/cotizacion';
import { Simulacionreservacomponent } from './simulacionreservacomponent';

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

const COTIZACION: Cotizacion = {
  alojamientoId: 1,
  fechaLlegada: '2099-01-10',
  fechaSalida: '2099-01-13',
  huespedes: 2,
  noches: 3,
  precioNoche: 180000,
  subtotal: 540000,
  tarifaLimpieza: 45000,
  tarifaServicio: 54000,
  total: 639000,
};

describe('Simulacionreservacomponent', () => {
  let component: Simulacionreservacomponent;
  let fixture: ComponentFixture<Simulacionreservacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Simulacionreservacomponent],
      imports: [FormsModule],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Simulacionreservacomponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('alojamiento', ALOJAMIENTO);
    fixture.componentRef.setInput('cotizacion', COTIZACION);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
