import { Component, OnInit,Input,Output,EventEmitter, SimpleChanges } from '@angular/core';
import { delay } from 'rxjs/Operators';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  @Output() send_pedidos = new EventEmitter();
  @Input() config:any;

  // variables encargadas de recoger los datos de los pedidos
  data_activos:Array<any>=[];
  data_en_curso:Array<any>=[];
  data_finalizados:Array<any>=[];

  // variable que recoge los datos del pedido seleccionado
  data_seleccion_pedido:Array<any>=[];
  seleccion:any;

  constructor() { }

  ngOnInit(): void {
    this.data_seleccion_pedido=[];
    this.seleccion={};

    this.prueba_repeticion();
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log("simple changes", changes);

    if (changes.hasOwnProperty('config') && this.config) {

      switch(this.config.event){
        case 'pedidos_activos':
          this.data_activos = this.config.activos;
          console.log("datos_activos",this.data_activos);
          this.data_seleccion_pedido=[];
          this.seleccion={};
        break;  

        case 'pedidos_en_curso':
          this.data_en_curso = this.config.encurso;
          console.log("datos_en_curso",this.data_en_curso);
          this.data_seleccion_pedido=[];
          this.seleccion={};
        break;

        case 'pedidos_finalizados':
          this.data_finalizados = this.config.finalizados;
          console.log("datos_finalizados",this.data_finalizados);
          this.data_seleccion_pedido=[];
          this.seleccion={};
        break;

        case 'pedido_seleccionado': 
          this.data_seleccion_pedido = this.config.pedido;
        break;

        case 'confirmar_pedidos_activos':
          this.data_en_curso.push(this.data_activos[this.seleccion.index]);
          
          // eliminar el pedido que esta en activos para ponerlo en pedidos en curso
          if(this.data_activos.length === 1){
            this.data_activos =[];
          }else{
            this.data_activos.splice(this.seleccion.index,1);
          }

          this.data_seleccion_pedido=[];
          this.seleccion={};
        break;

        case 'finalizar_pedidos_cursos':
          this.data_finalizados.push(this.data_en_curso[this.seleccion.index]);

          if(this.data_en_curso.length === 1){
            this.data_en_curso =[];
          }else{
            this.data_en_curso.splice(this.seleccion.index,1);
          }

          this.data_seleccion_pedido=[];
          this.seleccion={};
        break;
      
        case 'actualizacion_pedidos': 
        this.data_activos = this.config.activos;
        this.prueba_repeticion();
        break;
      }
    }
  }


  pedido_seleccionado(id,index,condicion){
    this.data_seleccion_pedido=[];
    this.send_pedidos.emit({
      event:'pedido_seleccionado',
      id:id
    })
    this.seleccion=[];
    if (condicion === 'activos'){
       this.seleccion = {
         pedido: this.data_activos[index],
         index: index,
         condicion:condicion
       }
    }else if(condicion === 'curso'){
      this.seleccion ={
        pedido:  this.data_en_curso[index],
        index:index,
        condicion:condicion
      }

    }else if (condicion === 'finalizados'){
      this.seleccion ={
        pedido: this.data_finalizados[index],
        index:index,
        condicion:condicion
      }
    }
  }

  confirmar_pedido(){
    // por ahora nada mas para los pedidos activos
    if(this.data_seleccion_pedido.length > 0){
      if(this.seleccion.condicion === 'activos'){
        let pedido={
          id_pedido: this.seleccion.pedido.id_pedido
        }
        this.send_pedidos.emit({
          event:'confirmar_pedido',
          pedido:pedido
        })
      }
      else if (this.seleccion.condicion === 'curso'){
        let pedido={
          id_pedido: this.seleccion.pedido.id_pedido
        }
        this.send_pedidos.emit({
          event:'finalizar_pedido',
          pedido:pedido
        })
      }
    }else{
      console.log("error al confirmar el pedido")
    }
  }

  prueba_repeticion(){
   setTimeout(() => {
    this.send_pedidos.emit({
      event:'actualizacion_pedidos'
    })
    console.log("entro en la repeticion");
   }, 15000);
  }
}
