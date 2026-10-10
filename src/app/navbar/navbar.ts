import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
})
export class Navbar {
  readonly links = ['Hoteles', 'Ofertas', 'Destinos', 'Mi cuenta'];
  readonly currencies = ['EUR €', 'USD $', 'COP $'];
  readonly languages = ['ES', 'EN', 'PT'];
  readonly active = signal('Hoteles');
  readonly currency = signal('EUR €');
  readonly language = signal('ES');
}
