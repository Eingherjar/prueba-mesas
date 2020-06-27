import { Component, OnInit,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent implements OnInit {

  @Input() config:any;

  @Output() send_vista_pedidos = new EventEmitter();

  data_recibidos:Array<any>=[];

  precio_total:number=0;
  constructor() {}
 
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {

    if (changes.hasOwnProperty('config') && this.config) {
      switch(this.config.event){
        case 'carrito':
          console.log("datos recibidos",this.config);

          this.data_recibidos = this.config.datos;

          this.data_recibidos.forEach(element=>{
            this.precio_total += element.precio * element.cantidad;
          })

        break;
      }
    }
  }

  eliminar_plato(index){
    this.precio_total = this.precio_total - (this.data_recibidos[index].precio * this.data_recibidos[index].cantidad)
    if(this.data_recibidos.length === 1 ){
      this.data_recibidos = []
      this.regresar();
    }else{
      this.data_recibidos.splice(index,1); 
    }

    this.send_vista_pedidos.emit({
      event:"cantidad_platos",
      cantidad:this.data_recibidos.length
    })
  }


  cambiar_precio_total(index,condicion){
    if (condicion === "sumar"){
      this.precio_total += this.data_recibidos[index].precio

    }else if (condicion === "restar"){
      this.precio_total = this.data_recibidos[index].cantidad > 1 ? this.precio_total - this.data_recibidos[index].precio : this.precio_total;
    }
  }

  regresar(){
    this.send_vista_pedidos.emit({
      event:"regresar"
    })
  }

}
