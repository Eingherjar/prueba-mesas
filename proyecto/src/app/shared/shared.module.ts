import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BuscadorComponent} from './buscador/buscador.component';
import {LoginComponent} from './login/login.component';
import {SharedRoutingModule} from './shared-routuing.module';
@NgModule({
  declarations: [
    BuscadorComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    SharedRoutingModule
  ],
  exports:[
    BuscadorComponent,
    LoginComponent
  ]
})
export class SharedModule { }
