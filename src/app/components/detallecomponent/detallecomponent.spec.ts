import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Detallecomponent } from './detallecomponent';

describe('Detallecomponent', () => {
  let component: Detallecomponent;
  let fixture: ComponentFixture<Detallecomponent>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Detallecomponent],
      imports: [RouterModule],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Detallecomponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    http.expectOne('data/alojamientos.json').flush([]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should leave alojamiento empty when the id does not exist', () => {
    expect(component.estado()).toBe('listo');
    expect(component.alojamiento()).toBeUndefined();
  });
});
