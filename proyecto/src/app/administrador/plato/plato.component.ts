import { Component, OnInit,Input,Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.scss']
})
export class PlatoComponent implements OnInit {

  @Input() config:any;
  @Output() send_plato= new EventEmitter();
  @Input() config_vista:string;

  vista:String;

  texto_boton:String;

  titulo:String;

  // datos de los platos disponibles;
  data_platos:Array<any>;

  // datos de los platos no disponibles;
  platos_no_disponibles:any;

  // imagen en caso de que no se haya añadido
  imagen_provisional:string="https://pbs.twimg.com/profile_images/600060188872155136/st4Sp6Aw_400x400.jpg";

  // para cuando se vaya a modificar un plato
  id_plato_seleccionado:number=0;

  id_plato_creado:number=0;
  // contenedor de los datos de las categorias
  categroias:Array<any>=[];

  // se encarga de ver la disponibilidad del plato 
  estado_plato:boolean;
  // contenedor de las ids de las categroias selccionadas
  id_categorias:Array<any>=[]

  // datos para crear o editar un plato
  nombre:String="";
  descripcion:String="";
  precio:String="";
  imagen:String="";
  constructor() { }
  
  ngOnInit(): void {
    this.categroias.push({
      id:'1',
      nombre:'Bebidas'
    });
    this.categroias.push({
      id:'2',
      nombre:'Almuezos'
    })
    this.categroias.push({
      id:'3',
      nombre:'Arroces'
    })
    this.categroias.push({
      id:'4',
      nombre:'Carnes'
    })
    this.categroias.push({
      id:'5',
      nombre:'Asado'
    })
    this.categroias.push({
      id:'6',
      nombre:'Pollos'
    })
    this.categroias.push({
      id:'7',
      nombre:'Sopas'
    })
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log("simple changes", changes);

    if (changes.hasOwnProperty('config') && this.config) {
      switch(this.config.event){
        case 'crear_plato':
          if(this.config.data){
            this.send_plato.emit({
              event: "agregar_categoria",
              case:"crear",
              ciclo:this.id_categorias,
              id_plato:this.config.data.plato.id_plato
            })
            this.id_plato_creado = this.config.data.plato;
            console.log("datos del plato creaado de id_plato_creado",this.id_plato_creado);

          }else{
            this.send_plato.emit({
              event:'mensaje',
              tipo:"error",
              mensaje:"no se encuentran datos del plato"
            })
          }
        
        break;

        case 'agregado_plato':
          this.data_platos.push({
            descripcion: this.descripcion,
            estado: 1,
            id_plato: this.id_plato_creado,
            imagen: this.imagen != "" ? this.imagen : this.imagen_provisional,
            nombre: this.nombre,
            precio: this.precio,
          })
          this.nombre="";
          this.descripcion="";
          this.precio="";
          this.imagen="";

          for(let i=0; i < this.id_categorias.length ;i++){
            console.log("id de la categoria ",'categoria-'+this.id_categorias[i]);
            let id= this.id_categorias.indexOf(this.id_categorias[i]);
            console.log("id:",id);
            if(this.id_categorias.length == 1){
              this.id_categorias=[]
            }else{
              this.id_categorias.splice(id,1);
            }
          }
          break;

        case 'listado_platos':
          this.data_platos = this.config.platos
          console.log("datos de data_platos",this.data_platos);
        break;

        case 'platos_no_disponibles':
          this.platos_no_disponibles = this.config.platos;
          console.log("datos de los platos no disponibles en plato", this.platos_no_disponibles);
        break;

        case 'traer_categorias':
          for(let i=0; i< this.config.categorias.length ;i++){
            this.id_categorias.push(""+this.config.categorias[i].id_categoria);
            console.log("datos de las categorias",this.id_categorias);
          } 
        break;

        case 'mostrar_plato':
          this.nombre = this.config.plato[0].nombre;
          this.descripcion = this.config.plato[0].descripcion;
          this.imagen = this.config.plato[0].imagen;
          this.precio = this.config.plato[0].precio;
          this.estado_plato = this.config.plato[0].estado == 0 ? false : true;
          console.log("datos que trae el nombre",{
            nombre:this.nombre,
            descripcion:this.descripcion,
            imagen:this.imagen,
            precio:this.precio,
            estado: this.estado_plato
          })
          this.send_plato.emit({
            event: 'traer_categorias',
            data:{
              id_plato: this.id_plato_seleccionado
            }
          });

        break;
      
        case 'modificar_plato':
          this.send_plato.emit({
            event: "agregar_categoria",
            case:"modificar",
            ciclo:this.id_categorias,
            id_plato:this.id_plato_seleccionado
          }) 
        break
      
        case 'modificado_plato':

          console.log("entro en la condicion de modificado plato");
           
          if(this.estado_plato === true){

            this.data_platos.forEach((data,index)=>{
              let incluido = data.id_plato === this.id_plato_seleccionado ? true : false ;

              if (incluido === true){
                this.data_platos[index]={
                  descripcion: this.descripcion,
                  estado: 1,
                  id_plato: this.id_plato_seleccionado,
                  imagen: this.imagen,
                  nombre: this.nombre,
                  precio: this.precio
                }
              }
              if (index  ===  this.data_platos.length -1  && incluido === false){
                this.platos_no_disponibles.forEach((data,index)=>{
                  let incluido = data.id_plato === this.id_plato_seleccionado ? true : false ;
    
                  if (incluido === true){
                    this.data_platos.push(this.platos_no_disponibles[index]);
                    this.platos_no_disponibles.splice(index,1);
                    console.log("datos eliminados de los platos no disponibles y añadido en los platos disponibles");
                  }
                })
              }
            })
          }
           
          else{

            this.data_platos.forEach((data,index)=>{
              let incluido = data.id_plato === this.id_plato_seleccionado ? true : false ;

              if (incluido === true){
                this.platos_no_disponibles.push(this.data_platos[index]);
                this.data_platos.splice(index,1);
                console.log("datos eliminados de los platos disponibles y añadido en los platos no disponibles");
               
              }
            })
          }
        break;
      }
    }

    if (changes.hasOwnProperty('config_vista') && this.config_vista) {
        this.vista = this.config_vista;
        this.texto_boton=this.vista == "crear_plato" ? "CREAR PLATO" : "CONFIRMAR PLATO";
        this.titulo= this.vista == "crear_plato" ? "NUEVO PLATO" : "MODIFICAR PLATO";
    } 
  }

  plato(condicion){
    if(condicion === 'crear'){
      let plato ={
        nombre:this.nombre,
        precio:this.precio,
        descripcion:this.descripcion,
        imagen:this.imagen
      }
      this.send_plato.emit({
        event: 'crear_plato',
        data:plato
      })
    }

    else if(condicion === 'modificar'){
      let plato ={
        id:this.id_plato_seleccionado,
        nombre:this.nombre,
        precio:this.precio,
        descripcion:this.descripcion,
        estado:this.estado_plato == true ? 1 : 0,
        imagen:this.imagen
      }
      this.send_plato.emit({
        event: 'modificar_plato',
        data:plato
      })
    }

    else if(condicion  === 'eliminar'){

    }
  }

  onChecked(categoria, cheked){
    if(cheked === true){
      this.id_categorias.push(categoria);
      console.log("se añadio la categria con la id: ",this.id_categorias);
    }else{
      this.id_categorias.splice(this.id_categorias.indexOf(categoria),1);
      console.log("se elimino la categria con la id: ",this.id_categorias);
    }
  }

  // metodo para regresar al menu principal

  seleccion_plato(plato:number){
    this.id_plato_seleccionado = plato;

    this.vista = "modificar_plato";
    
    this.send_plato.emit({
      event:'mostrar_plato',
      data:{
        id_plato: this.id_plato_seleccionado
      }
    });
  }


  volver(){
    this.vista = "menu_principal";
    this.id_categorias =[];
    this.id_plato_seleccionado=0;
  }

}
