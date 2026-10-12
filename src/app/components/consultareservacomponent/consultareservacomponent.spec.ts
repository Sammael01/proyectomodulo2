import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterModule } from '@angular/router';
import { Consultareservacomponent } from './consultareservacomponent';

describe('Consultareservacomponent', () => {
  let component: Consultareservacomponent;
  let fixture: ComponentFixture<Consultareservacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Consultareservacomponent],
      imports: [RouterModule],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Consultareservacomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
