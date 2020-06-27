import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {

  @Input() config:any;
  @Output() send_vista_informacion= new EventEmitter();

  // se aencarga de obtener todos los datos que tiene el plato
  data_plato:any={};

  // donde se guarda el lugar de donde vino la seleccion del plato
  origen:String=""

  // se va a encargar de obtener la cantidad de platos que desea el cliente
  contador:number=1;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('config') && this.config) {

      switch(this.config.event){
        case 'plato_seleccionado':
          this.data_plato = this.config.plato[0];
          console.log("datos del plato",this.data_plato);
          this.origen = this.config.lugar
        break;
      }
    }
  }

  agregar_carro(){
    console.log("esto es para agregar al carro");

    let agregar ={  
      id_plato: this.data_plato.id_plato,
      nombre: this.data_plato.nombre,
      precio: this.data_plato.precio,
      descripcion: this.data_plato.descripcion,
      imagen: this.data_plato.imagen,
      cantidad: this.contador
    }
    this.send_vista_informacion.emit({
      event:"agregar_carro",
      envio: agregar
    })  
  }

  regresar(){
    console.log("click",this.origen);
    if(this.origen === 'principal'){

      this.send_vista_informacion.emit({
        event:"regresar",
        destino: "principal"
      })
    }else if(this.origen === 'categorias'){
      this.send_vista_informacion.emit({
        event:"regresar",
        destino: "categorias"
      })
    }
  }

}
