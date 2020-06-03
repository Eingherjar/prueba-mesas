import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl:'./cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

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
