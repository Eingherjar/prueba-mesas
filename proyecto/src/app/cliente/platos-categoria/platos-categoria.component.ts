import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-platos-categoria',
  templateUrl: './platos-categoria.component.html',
  styleUrls: ['./platos-categoria.component.scss']
})
export class PlatosCategoriaComponent implements OnInit {

  constructor() { }

  active:boolean =false;

  con = 0;
  ngOnInit(): void {
  }

  contador(condicion){
    console.log("entro", condicion);
    if(condicion == true){
      this.con++;
    }else{
      this.con--;
    }
  }

}
