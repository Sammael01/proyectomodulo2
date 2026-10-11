import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideRouter, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Listacomponent } from './listacomponent';
import { Alojamiento } from '../../models/alojamiento';

const ALOJAMIENTO = {
  id: 1,
  nombre: 'Hotel de prueba',
  tipo: 'Hotel',
  estrellas: 4,
  precioNoche: 100,
  calificacion: 8.5,
  servicios: ['WiFi'],
  imagenes: ['linear-gradient(#000, #fff)'],
  ofertas: [],
} as unknown as Alojamiento;

describe('Listacomponent', () => {
  let component: Listacomponent;
  let fixture: ComponentFixture<Listacomponent>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Listacomponent],
      imports: [FormsModule, RouterModule],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Listacomponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    http.expectOne('data/alojamientos.json').flush([ALOJAMIENTO]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the alojamientos', () => {
    expect(component.estado()).toBe('listo');
    expect(component.filtrar().length).toBe(1);
  });

  it('should filter by max price', () => {
    component.precioMax = 50;
    expect(component.filtrar().length).toBe(0);
  });

  it('should filter by name and type', () => {
    component.busqueda = 'prueba';
    expect(component.filtrar().length).toBe(1);
    component.tiposSel['Hostal'] = true;
    expect(component.filtrar().length).toBe(0);
  });
});
