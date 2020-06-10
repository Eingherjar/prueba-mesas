import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {

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
