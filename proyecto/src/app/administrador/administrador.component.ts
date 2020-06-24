import { Component, OnInit } from '@angular/core';
import {AdministradorService} from "./administrador.service";
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  config_plato={};

  config_vista_plato= 'modificar_plato';

  private notifier: NotifierService;

  constructor( private service:AdministradorService ,notifier: NotifierService) { this.notifier = notifier }



  ngOnInit(): void {
  }

  events_plato(e){
    switch(e.event){

      case 'crear_plato':

        this. service.Crear_Platos(e.data).subscribe((data:any)=>{
          if(data.estado === 'success'){
            this.notifier.notify("success","Plato creado satisfactoriamente");
            console.log("datos del plato ",data);

            this.config_plato={
              event:'crear_plato',
              data:data
            }
          }
          else if (data.estado === 'error'){
            this.notifier.notify("error","Error al crear el plato");
            console.log("datos del plato ",data);
          }
        });
      break;

      case 'agregar_categoria': 
        for(let i=0 ; i < e.ciclo.length; i++ ){
          let data ={
            id_plato: e.id_plato,
            id_categoria:e.ciclo[i]
          }
          console.log("datos que manda para la peticion de añadir categorias al plato",data);
          this. service.Agregar_Categorias_Plato(data).subscribe((data:any)=>{
            console.log("datos que se muestran ",data);

            if(i == e.ciclo.length - 1){
              this.notifier.notify("success","se ha añadido todas las categorias al plato");
            }
          });
        }
      
      break;

      case 'mensaje':
        this.notifier.notify(e.tipo,e.mensaje);
      break;
    }
  }
}
