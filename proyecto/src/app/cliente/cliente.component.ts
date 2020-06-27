import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from './cliente.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-cliente',
  templateUrl:'./cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  id_mesa:number;

  vista_components:string="vista platos";

  config_vista_platos:any;

  config_vista_vendidos:any;

  config_vista_categoria:any;
  
  private notifier: NotifierService;

  constructor(private router_url: ActivatedRoute, private service: ClienteService, notifier:NotifierService) {this.notifier = notifier }

  ngOnInit(): void {
    this.id_mesa = parseInt(this.router_url.snapshot.paramMap.get('mesa'));

    this.service.Listado_Platos().subscribe((data:any)=>{
      if(data.estado === 'success'){
        
        this.config_vista_platos={
          event: 'platos_activos',
          platos: data.plato
        }

      }
      else if(data.estado === 'error'){
        this.notifier.notify("error","error al traer el listado de platos");
      }
    })
  }


  events_vista_platos(e){

    switch(e.event){

      case 'platos_activos': 
        this.service.Listado_Platos().subscribe((data:any)=>{
          if(data.estado === 'success'){
            this.config_vista_platos={
              event: 'platos_activos',
              platos: data.pedidos
            }

          }
          else if(data.estado === 'error'){
            this.notifier.notify("error","error al traer el listado de platos");
          }
        })
      break;

      case 'select_categorias':
        this.vista_components ="vista vendidos";
        this.service.Imagenes_Categorias().subscribe((data:any)=>{
          console.log("datos que trae el servicio de imagenes_categorias",data);
          this.config_vista_vendidos = {
            event:"imagen_categorias",
            categorias:data
          }  
        })
        
      break;
    }
  }


  events_vista_vendidos(e){
    switch(e.event){
      case 'regresar_menu':
         this.vista_components ='vista platos';
      break;

      case 'seleccion': 
        console.log("datos que trae la seleccion de la categoria",e);
        let id ={
          id_categoria:e.seleccion
        }
        this.service.Categorias_Id(id).subscribe((data:any)=>{
          
          if(data.estado === "success"){
            this.vista_components = "vista platos categorias";
            this.config_vista_categoria={
              event:"vista_categoria",
              categorias: data.plato,
              nombre:e.nombre
            }
          } 
          else if(data.estado === "error"){
            this.notifier.notify("error",data.error ? data.error.mensaje : "no se pueden cargar los platos de la categoria");
            console.log("error en las categorias individuales",data);

          }
        })
      break;  
    }
  }

  events_vista_categorias(e){
    switch(e.event){
      case 'select_categorias':
        this.vista_components ="vista vendidos";
        this.service.Imagenes_Categorias().subscribe((data:any)=>{
          console.log("datos que trae el servicio de imagenes_categorias",data);
          this.config_vista_vendidos = {
            event:"imagen_categorias",
            categorias:data
          }  
        })
        
      break;
    }
  }
}
