import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { Listacomponent } from './components/listacomponent/listacomponent';
import { Detallecomponent } from './components/detallecomponent/detallecomponent';

const routes: Routes = [
  { path: '', component: Listacomponent },
  { path: 'alojamiento/:id', component: Detallecomponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
=======

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
>>>>>>> e13e5d3ce5a208655d301fe4b7dc05eebfa9226f
