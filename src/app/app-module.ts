import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Cotizacioncomponent } from './components/cotizacioncomponent/cotizacioncomponent';
import { Consultareservacomponent } from './components/consultareservacomponent/consultareservacomponent';
import { Simulacionreservacomponent } from './components/simulacionreservacomponent/simulacionreservacomponent';

@NgModule({
  declarations: [
    App,
    Cotizacioncomponent,
    Consultareservacomponent,
    Simulacionreservacomponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
