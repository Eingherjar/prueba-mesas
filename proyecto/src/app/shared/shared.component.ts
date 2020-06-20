import { Component, OnInit } from '@angular/core';
import {SharedService} from './shared.service';
@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  config_login:any;

  constructor( private servicio:SharedService) { }

  ngOnInit(): void {
  }


  login_events(e){
    switch(e.event){
      case 'login':
        console.log("entra en el evento de shared")
      this.servicio.login(e.data).subscribe((data:any)=>{
        console.log("datos que trae el servicio de login events al componente shared",data);

        this.config_login={
          event: 'login',
          data:data
        }
      })
      break;
    }
  }
}
