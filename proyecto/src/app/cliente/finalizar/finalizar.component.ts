import { Component, OnInit,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.component.html',
  styleUrls: ['./finalizar.component.scss']
})
export class FinalizarComponent implements OnInit {

  @Input() config:any;
  @Output() send_vista_finalizar = new EventEmitter();

  condicion:String="pedido_confirmado";

  id_pedido:number=0;

  valoracion:number=0;

  constructor() { }

  ngOnInit(): void {
  }

  
  ngOnChanges(changes: SimpleChanges) {

    if (changes.hasOwnProperty('config') && this.config) {

      switch(this.config.event){
        case 'inicio':
          this.id_pedido = this.id_pedido != 0 ? this.id_pedido : this.config.id_pedido;

          if(this.config.estado === 1){
            this.condicion = 'pedido_confirmado'
          }else if(this.config.estado === 2){
            this.condicion = 'pedido_curso'
          }else if(this.config.estado === 3){
            this.condicion = 'calificar_pedido'
          }

          this.confirmar_pedido();

        break;
        
        case 'confirmar_pedido':
          if(this.config.estado === 1){
            this.condicion ="pedido_confirmado";
            this.confirmar_pedido();
     
          }else if(this.config.estado === 2){
            this.condicion ="pedido_curso";
           
          }
          else if(this.config.estado === 3){
            this.condicion = 'calificar_pedido';
          }

        break;


        case 'calificar': 
        this.condicion = 'calificar_pedido';
        this.id_pedido=this.config.id.id_pedido
        break;
      }

    }
  }


  confirmar_pedido(){
    setTimeout(() => {
      this.send_vista_finalizar.emit({
        event: 'confirmar_pedido',
        pedido: {
          id_pedido:this.id_pedido
        }
      })
    }, 15000);
  }

  valorar_pedido(){
    this.send_vista_finalizar.emit({
      event: 'valorar_pedido',
      valorar:{
        id_pedido: this.id_pedido,
        valoracion: this.valoracion
      }
    })
  }

  regresar(){
    this.send_vista_finalizar.emit({
      event: 'regresar',
      id:{
        id_pedido:this.id_pedido
      }
    })
  }



}
