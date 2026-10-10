import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Simulacionreservacomponent } from './simulacionreservacomponent';

describe('Simulacionreservacomponent', () => {
  let component: Simulacionreservacomponent;
  let fixture: ComponentFixture<Simulacionreservacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Simulacionreservacomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Simulacionreservacomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
