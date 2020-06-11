import { Routes, RouterModule } from '@angular/router';
import {FinalizarComponent} from './cliente/finalizar/finalizar.component'
import{SharedComponent} from './shared/shared.component'


const routes: Routes = [
  { path: '', redirectTo: '/prueba', pathMatch: 'full' },
  // { path: 'prueba', component: ClienteComponent },
  // { path: 'prueba', component:FinalizarComponent},
];
export const APP_ROUTING = RouterModule.forRoot(routes);

