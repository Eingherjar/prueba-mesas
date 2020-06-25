import { Component, OnInit,Input,Output,EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  @Output() send_pedidos = new EventEmitter();
  @Input() config:any;

  // variables encargadas de recoger los datos de los pedidos
  data_activos:Array<any>;
  data_en_curso:Array<any>;
  data_finalizados:Array<any>;

  constructor() { }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log("simple changes", changes);

    if (changes.hasOwnProperty('config') && this.config) {

      switch(this.config.event){
        case 'pedidos_activos':
          this.data_activos = this.config.activos;
        break;  

        case 'pedidos_en_curso':
          this.data_en_curso = this.config.encurso;
        break;

        case 'pedidos_finalizados':
          this.data_finalizados = this.config.finalizados;
        break;
      }
    }
  }
}
