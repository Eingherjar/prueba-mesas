import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {class_http} from '../shared/abstract_class.component'
import { Observable } from 'rxjs';
import { map } from 'rxjs/Operators';
@Injectable({
  providedIn: 'root'
})
export class AdministradorService  extends class_http{

  constructor( private http:HttpClient) {
    super();
  }

  Crear_Platos(data):Observable<Object>{
    return this.http.post(this.API_URL+"/Platos/Crear",data,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que retorna el servicio de crear platos");
        return data;
      })
    )
  }

  Modificar_platos(data):Observable<Object>{
    return this.http.post(this.API_URL+"Platos/Modificar",data,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que trae el servicio de modificar platos",data);
        return data;
      })
    )
  }

  Agregar_Categorias_Plato(data):Observable<Object>{
    return this.http.post(this.API_URL+"Categorias/Agregar",data,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que mestra el servicio de añadir una categoria al plato",data);
        return data;
      })
    )
  }

  Listado_Platos():Observable<Object>{
    return this.http.get(this.API_URL+"Platos/Disponibles",this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que regresa el servicio de listado platos ",data);
        return data;
      })
    )
  }

  Listado_no_Dispopnibles():Observable<Object>{
    return this.http.get(this.API_URL+"Platos/NoDisponibles",this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que responde el servicio de listrado de platos no disponibles",data);
        return data;
      })
    )
  }

}
