import { LOCALE_ID, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbarcomponent } from './components/navbarcomponent/navbarcomponent';
import { Footercomponent } from './components/footercomponent/footercomponent';
import { Iniciocomponent } from './components/iniciocomponent/iniciocomponent';
import { Tarjetacomponent } from './components/tarjetacomponent/tarjetacomponent';
import { Listacomponent } from './components/listacomponent/listacomponent';
import { Detallecomponent } from './components/detallecomponent/detallecomponent';
import { Cotizacioncomponent } from './components/cotizacioncomponent/cotizacioncomponent';
import { Simulacionreservacomponent } from './components/simulacionreservacomponent/simulacionreservacomponent';
import { Consultareservacomponent } from './components/consultareservacomponent/consultareservacomponent';

registerLocaleData(localeEsCo);

@NgModule({
  declarations: [
    App,
    Navbarcomponent,
    Footercomponent,
    Iniciocomponent,
    Tarjetacomponent,
    Listacomponent,
    Detallecomponent,
    Cotizacioncomponent,
    Simulacionreservacomponent,
    Consultareservacomponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'es-CO' },
  ],
  bootstrap: [App],
})
export class AppModule {}
