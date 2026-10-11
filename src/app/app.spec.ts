import { TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { provideRouter, RouterModule } from '@angular/router';
=======
import { RouterModule } from '@angular/router';
>>>>>>> e13e5d3ce5a208655d301fe4b7dc05eebfa9226f
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD
      declarations: [App],
      imports: [RouterModule],
      providers: [provideRouter([])],
    }).compileComponents();
=======
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [
        App
      ],
    })
      .compileComponents();
>>>>>>> e13e5d3ce5a208655d301fe4b7dc05eebfa9226f
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
<<<<<<< HEAD
=======

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, LRMarketplace');
  });
>>>>>>> e13e5d3ce5a208655d301fe4b7dc05eebfa9226f
});
