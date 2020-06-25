import { Routes, RouterModule } from '@angular/router';
import {AdministradorComponent} from './administrador/administrador.component';
import {LoginComponent} from './shared/login/login.component';
import {ClienteComponent} from './cliente/cliente.component'
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'admin', component:AdministradorComponent},
  { path: 'login', component:LoginComponent},
  { path: 'cliente',component:ClienteComponent}
];
export const APP_ROUTING = RouterModule.forRoot(routes);

