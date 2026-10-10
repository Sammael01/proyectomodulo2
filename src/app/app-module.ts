import {LOCALE_ID, NgModule, provideBrowserGlobalErrorListeners} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Cotizacioncomponent } from './components/cotizacioncomponent/cotizacioncomponent';
import { Consultareservacomponent } from './components/consultareservacomponent/consultareservacomponent';
import { Simulacionreservacomponent } from './components/simulacionreservacomponent/simulacionreservacomponent';
import localeEsCo from '@angular/common/locales/es-CO';
import {registerLocaleData} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

registerLocaleData(localeEsCo);

@NgModule({
  declarations: [
    App,
    Cotizacioncomponent,
    Consultareservacomponent,
    Simulacionreservacomponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [provideBrowserGlobalErrorListeners(),
    {provide: LOCALE_ID, useValue: LOCALE_ID}],
  bootstrap: [App],
})
export class AppModule {}
