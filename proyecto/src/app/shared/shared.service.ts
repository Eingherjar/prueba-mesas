import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/Operators';
import {HttpClient} from '@angular/common/http';
import {class_http} from './abstract_class.component'
@Injectable({
  providedIn: 'root'
})
export class SharedService extends class_http {

  constructor( private http:HttpClient) {
    super();
  }
  headers: string='application/json'

  login(data):Observable<Object>{
    return this.http.post(this.API_URL+'Usuario/Login',data, this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que trae la peticion del login",data);
        return data
      })
    )
  }
}

