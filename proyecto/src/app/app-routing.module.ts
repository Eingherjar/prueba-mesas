import { Routes, RouterModule } from '@angular/router';
import {AdministradorComponent} from './administrador/administrador.component';
import {LoginComponent} from './shared/login/login.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'admin', component:AdministradorComponent},
  { path: 'login', component:LoginComponent},
];
export const APP_ROUTING = RouterModule.forRoot(routes);

