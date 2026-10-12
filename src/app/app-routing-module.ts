import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Iniciocomponent } from './components/iniciocomponent/iniciocomponent';
import { Listacomponent } from './components/listacomponent/listacomponent';
import { Detallecomponent } from './components/detallecomponent/detallecomponent';
import { Consultareservacomponent } from './components/consultareservacomponent/consultareservacomponent';

const routes: Routes = [
  { path: '', component: Iniciocomponent },
  { path: 'alojamientos', component: Listacomponent },
  { path: 'alojamientos/:id', component: Detallecomponent },
  { path: 'mis-reservas', component: Consultareservacomponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
