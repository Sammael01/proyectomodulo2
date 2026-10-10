import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Simulacionreservacomponent} from './components/simulacionreservacomponent/simulacionreservacomponent';
import {Cotizacioncomponent} from './components/cotizacioncomponent/cotizacioncomponent';
import {Consultareservacomponent} from './components/consultareservacomponent/consultareservacomponent';

const routes: Routes = [

  // Ventana para simular tu reserva despues de obtener la cotizacion
  {path: 'simular-reserva', component: Simulacionreservacomponent},

  // Ventana para cotizar los precios que ofrece el alojamiento
  {path: 'cotizar-alojamiento', component: Cotizacioncomponent},

  // Ventana para consultar la reserva de tu alojamiento
  {path: 'consultar-reserva', component: Consultareservacomponent},

  // Cualquier otra ruta desconocida vuelve a la ventana principal (evita errores)
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
