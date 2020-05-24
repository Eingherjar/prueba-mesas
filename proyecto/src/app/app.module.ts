import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_ROUTING } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteModule } from './cliente/cliente.module';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ClienteComponent } from './cliente/cliente.component'
import {SharedComponent} from './shared/shared.component';
@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    SharedComponent   
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    SharedModule,
    ClienteModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
