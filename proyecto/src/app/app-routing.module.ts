import { Routes, RouterModule } from '@angular/router';
import {ClienteComponent} from './cliente/cliente.component'
import{SharedComponent} from './shared/shared.component'

const routes: Routes = [
  { path: '', redirectTo: '/prueba', pathMatch: 'full' },
  // { path: 'prueba', component: ClienteComponent },
  { path: 'prueba', loadChildren:'./cliente/cliente.module#ClienteModule'},
];
export const APP_ROUTING = RouterModule.forRoot(routes);

