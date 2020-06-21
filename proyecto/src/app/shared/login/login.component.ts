import { Component, OnInit, Output, EventEmitter, Input,SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() send_login = new EventEmitter();

  @Input() configuracion: any;

  constructor() { }


  condicion: string = "login_inicio";

  id_usuario: number = -1;

  // variable que rocoge todo lo que tenga que ver con login 
  data_login: any;

  texto_usuario: String = '';

  texto_password: String = '';

  texto_correo: String = '';

  texto_new_password:String = '';


  // sexo
  masculino:boolean=false;
  femenino:boolean=false;
  otro:boolean=false;

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("simple changes", changes);
    if (changes.hasOwnProperty('configuracion') && this.configuracion) {
      console.log("cambios configuracion", this.configuracion)
      switch (this.configuracion.event) {

        case 'login':
          console.log("entro en el login", this.configuracion);
          this.data_login = this.configuracion;
          localStorage.setItem("id_usuario", this.data_login ? this.data_login.id_usuario : 0);

          this.send_login.emit({
            event: "mensaje",
            tipo: "success",
            mensaje: "el rol del usuario es: " + this.data_login.rol
          })
        break;

        case 'validar_usuario':
          console.log("entro en validar usuario de login", this.configuracion);

          localStorage.setItem("id_usuario",this.configuracion.id_usuario);
          this.texto_password = '';
          this.texto_new_password = '';
          this.condicion = 'cambiar_password';
          this.id_usuario = this.id_usuario != this.configuracion.id_usuario ? this.configuracion.id_usuario : this.id_usuario;
          
        break;

        case 'cambiar_password':
        this.texto_password = '';
        this.texto_usuario = '';
        this.condicion = 'vista_iniciar';
        break;
      
        case 'registrar':
          console.log("datos que entran en registrar de login", this.configuracion); 
        break;
      }
    }
  }


  // metodo de iniciar sesion de usuario registrado
  iniciar() {
    console.log("entro en el metodo de inciar con los siguientes datos", {
      usuario: this.texto_usuario,
      contraa: this.texto_password
    })
    let login = {
      nombre: this.texto_usuario,
      password: this.texto_password
    }
    this.send_login.emit({
      event: 'login',
      data: login
    })
  }

  validar_usuario() {
    console.log("entro en el metodo de validar usuario con lo siguiente ", {
      usuario: this.texto_usuario,
      correo: this.texto_correo
    })

    let validar = {
      nombre: this.texto_usuario,
      correo: this.texto_correo
    }

    this.send_login.emit({
      event: "validar_usuario",
      data: validar
    })

  }

  cambiar_password(){
    console.log("entro en el metodo de cambiar_password de login",{
      password:this.texto_password,
      new_password: this.texto_new_password
    })

   if(this.texto_password === this.texto_new_password) {
    let cambiar={
      id_usuario: this.id_usuario,
      password:this.texto_new_password
    }

    this.send_login.emit({
      event:"cambiar_password",
      data:cambiar
    })  

   }
   else if(this.texto_password !== this.texto_new_password){
    this.send_login.emit({
      event:"mensaje",
      tipo:"info",
      mensaje:"no se puede cambiar la contraseña porque las dos no coinciden"
    })
   }


  }

  validar_sexo(condicion){
    if(condicion === 'masculino'){
      this.femenino = this.masculino == true && this.otro == false ? false : true;
      this.otro = this.masculino == true && this.femenino == false ? false : true;
    }
    else if(condicion === 'femenino'){
      this.masculino = this.femenino == true && this.otro == false ? false : true;
      this.otro = this.femenino == true && this.masculino == false ? false : true;
    }
    else if(condicion === 'otro'){
      this.femenino = this.otro == true && this.masculino == false ? false : true;
      this.masculino = this.otro == true && this.femenino == false ? false : true;
    }
  }

  registrar(){
    console.log("entro en el metodo de registrar");

    let registrar={
      nombre:this.texto_usuario,
      correo:this.texto_correo,
      password:this.texto_password
    }
    this.send_login.emit({
      event:"registrar",
      data:registrar
    })
  }
}
