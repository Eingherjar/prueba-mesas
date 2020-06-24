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


  Agregar_Categorias_Plato(data):Observable<Object>{
    return this.http.post(this.API_URL+"Categorias/Agregar",data,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que mestra el servicio de añadir una categoria al plato",data);
        return data;
      })
    )
  }



}
