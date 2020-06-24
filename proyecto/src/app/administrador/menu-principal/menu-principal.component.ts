import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit {

  seleccion: String = "menu";

  @Output()send_menu = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  envio(condicion) {
    switch (condicion) {

      case 'menu':
        this.seleccion = condicion;
        this.send_menu.emit({
          event: condicion,
          display: condicion
        })
      break;

      case 'mesas':
        this.seleccion = condicion;
        this.send_menu.emit({
          event: condicion,
          display: condicion
        })
      break;

      case 'pedidos':
        this.seleccion = condicion;
        this.send_menu.emit({
          event: condicion,
          display: condicion
        })
      break;

      case 'cerrar':
        localStorage.setItem("id_usuario", "null");
        this.send_menu.emit({
          event: condicion,
          display: condicion
        })
      break;
    }
  }

}
