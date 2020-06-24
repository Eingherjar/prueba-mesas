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

  // datos de los platos;
  data_platos:any;

  // para cuando se vaya a modificar un plato
  id_plato:number=0;
  // contenedor de los datos de las categorias
  categroias:Array<any>=[];

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
              ciclo:this.id_categorias,
              id_plato:this.config.data.plato.id_plato
            })

          }else{
            this.send_plato.emit({
              event:'mensaje',
              tipo:"error",
              mensaje:"no se encuentran datos del plato"
            })
          }
        
        break;

        case 'agregado_plato':
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

    }

    else if(condicion  === 'eliminar'){

    }
  }

  onChecked(categoria, cheked){
    if(cheked){
      this.id_categorias.push(categoria);
      console.log("se añadio la categria con la id: ",this.id_categorias);
    }else{
      this.id_categorias.splice(this.id_categorias.indexOf(categoria),1);
      console.log("se elimino la categria con la id: ",this.id_categorias);
    }
  }

}
