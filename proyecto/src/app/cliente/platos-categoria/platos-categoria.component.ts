import { Component, OnInit, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-platos-categoria',
  templateUrl: './platos-categoria.component.html',
  styleUrls: ['./platos-categoria.component.scss']
})
export class PlatosCategoriaComponent implements OnInit {

  @Input() config:any;
  @Output() send_vista_categorias = new EventEmitter();

  // datos que recoge los platos que tiene la categoria
  data_categorias:any;

  nombre_categoria:String="";
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('config') && this.config) {
      switch(this.config.event){
        case 'vista_categoria':
          this.data_categorias= this.config.categorias;
          this.nombre_categoria = this.config.nombre
        break;
      }
    }
  }
  
  select_categorias(){
    this.send_vista_categorias.emit({
      event: "select_categorias"
    })
  }

}
