import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideRouter, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Iniciocomponent } from './iniciocomponent';

describe('Iniciocomponent', () => {
  let component: Iniciocomponent;
  let fixture: ComponentFixture<Iniciocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Iniciocomponent],
      imports: [FormsModule, RouterModule],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Iniciocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
