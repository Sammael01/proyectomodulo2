import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Detallecomponent } from './detallecomponent';

describe('Detallecomponent', () => {
  let component: Detallecomponent;
  let fixture: ComponentFixture<Detallecomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Detallecomponent],
      imports: [RouterModule],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Detallecomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
