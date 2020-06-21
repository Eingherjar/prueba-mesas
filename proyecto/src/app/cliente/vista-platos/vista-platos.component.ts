import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vista-platos',
  templateUrl: './vista-platos.component.html',
  styleUrls: ['./vista-platos.component.scss'],
})
export class VistaPlatosComponent implements OnInit {
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
