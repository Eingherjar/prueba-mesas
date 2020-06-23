import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.scss']
})
export class PlatoComponent implements OnInit {

  constructor() { }

  con = 0;
  ngOnInit(): void {
  }

  contador(condicion) {
    if (condicion == true) {
      this.con++;
    } else {
      this.con--;
    }
  }
}
