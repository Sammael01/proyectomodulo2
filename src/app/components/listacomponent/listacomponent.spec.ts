import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideRouter, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Listacomponent } from './listacomponent';

describe('Listacomponent', () => {
  let component: Listacomponent;
  let fixture: ComponentFixture<Listacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Listacomponent],
      imports: [FormsModule, RouterModule],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Listacomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
