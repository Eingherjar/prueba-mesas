import { Routes, RouterModule } from '@angular/router';
import {FinalizarComponent} from './cliente/finalizar/finalizar.component'
import {AdministradorComponent} from './administrador/administrador.component';
import {PlatoComponent} from './administrador/plato/plato.component';
const routes: Routes = [
  { path: '', redirectTo: '/prueba', pathMatch: 'full' },
  { path: 'prueba', component:PlatoComponent},
];
export const APP_ROUTING = RouterModule.forRoot(routes);

