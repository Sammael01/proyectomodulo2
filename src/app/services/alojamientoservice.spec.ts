import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Alojamientoservice } from './alojamientoservice';
import { Alojamiento } from '../models/alojamiento';

const ALOJAMIENTOS = [{ id: 1 }, { id: 2 }] as Alojamiento[];

describe('Alojamientoservice', () => {
  let service: Alojamientoservice;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Alojamientoservice);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all the alojamientos', () => {
    service.getAlojamientos().subscribe((lista: Alojamiento[]) => {
      expect(lista.length).toBe(2);
    });
    http.expectOne('data/alojamientos.json').flush(ALOJAMIENTOS);
  });

  it('should find an alojamiento by id', () => {
    service.getAlojamientoPorId(2).subscribe((a: Alojamiento | undefined) => {
      expect(a?.id).toBe(2);
    });
    http.expectOne('data/alojamientos.json').flush(ALOJAMIENTOS);
  });
});
