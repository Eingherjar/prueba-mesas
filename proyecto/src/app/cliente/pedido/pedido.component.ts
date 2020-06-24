import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent implements OnInit {
  constructor() {}
  con = 0;
  ngOnInit(): void {}

  contador(condicion) {
    if (condicion == true) {
      this.con++;
    } else {
      this.con--;
    }
  }
}
