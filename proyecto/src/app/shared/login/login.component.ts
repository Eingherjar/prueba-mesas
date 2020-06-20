import { Component, OnInit, Output, EventEmitter, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output()send_login = new EventEmitter();

  @Input() configuracion:any;
  
  constructor() { }


  condicion:string = "validar";

  data_login:any;
  ngOnInit(): void {

    console.log("se inicializo el componente ")
    let login={
      nombre: 'pablo',
      password: 'admin'
    }
    this.send_login.emit({
      event:'login',
      data: login
    })

  }

  ngOnchanges(changes:SimpleChange){
    if (changes.hasOwnProperty('configuracion') && this.configuracion != undefined) {
      switch(this.configuracion.event){
        case 'login':
        this.data_login = this.configuracion.data;
        localStorage.setItem("id_usuario",this.data_login ? this.data_login.id : 0);
        break;
      }
    }
  }


}
