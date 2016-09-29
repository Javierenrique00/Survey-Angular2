
import { Component } from '@angular/core';
import { StorageService} from "../storage.service";
import { Observable } from 'rxjs/Observable';
import { Encuesta } from "./encuesta";
import { RespuestaStorage } from "./respuesta-storage";
import { AuthService } from "../auth.service";



@Component({
    selector: 'respuestascomponent',
    templateUrl: "app/dynamic_forms/respuestas.component.html"
})
export class RespuestasComponent{
encuestas: Observable<Encuesta[]>;
usuario_actual = "";
selencuesta: Encuesta = null;
resultados: RespuestaStorage[];
tablehead: string[] = [];
tablecontent:string[][] = [];
totalglobal = 0;
audiencia = 0;
vusuarios: string[]=[];
emails:string ="";
datacsv:string = "";
exportdata = false;
togleaudiencia = false;


    constructor(public storageService: StorageService,public authservice: AuthService){
        

    }

    ngOnInit(){
        this.usuario_actual = this.authservice.user_logueado;
        this.encuestas = this.storageService.readEncuestasByUser(this.usuario_actual);
        this.exportdata = false;
    }

    trae_encuesta(id: string,nombre_encuesta: string){
        this.exportdata = false;
        let valores : string;
        let fila = 0;
        this.tablehead = [];
        this.tablecontent = [];


        //---lee la encuesta
        this.storageService.readEncuestasById(id).subscribe(
        result => { if(result != null) {
            this.selencuesta = result;
        }},
        err => console.log("error:",err),
        () =>console.log("complete")
      );

      //--- lee los usuarios que estan en la audiencia de la encuesta despues de 1 segundo
      this.emails = "";
      setTimeout(()=>{this.storageService.readUsersForGroups(this.selencuesta.audiencia).subscribe(
                    out=>{this.vusuarios = out;
                        this.vusuarios.forEach(
                            dat=>this.emails += dat + ","
                        )    
                    },
                    err=>console.log("error:",err),
                    ()=> console.log("complete:")
                )         
    },1000);

      //--leen las respuestas a la encuesta de todos los usuarios.
      this.storageService.readRespuestasByEncuesta(nombre_encuesta).subscribe(
          result =>{
              this.resultados = result;
              this.resultados.forEach(
                  dat =>{
                      //console.log("datos->",dat.value);
                      valores = JSON.stringify(dat.value);
                      //console.log("string->",valores);
                      this.conversionToArreglo(valores,fila,dat.email,dat.usuario);
                      fila = fila +1;
                  }
              )
           },
           err => console.log("error:",err),
           () =>{console.log("complete");this.audiencia = fila;}
      )
      
    }



    conversionToArreglo(entrada: string, fila:number, email:string, usuario: string){
    //--crea una fila nueva
    let nuevafila: string[]=[];
    //-- le agrega el usuario y el email
    if(fila==0){
        this.tablehead.push("Email");
        this.tablehead.push("Usuario");
    }
    nuevafila.push(email);
    nuevafila.push(usuario);
    //--quita los corchetes y la primera y ultima comilla
    let temp1 = entrada.slice(2,-2);
    //--crea el vector dividiendo con el separador ","
    let arreglo = temp1.split('","');
    arreglo.forEach(
        column =>{
            //console.log("Columna",column);
            //--- ahora cada uno lo separa entre el de la derecha(propiedad) y el de la izquierda (valor)
            let campo = column.split('":"');
            //console.log("campo:",campo[0]+"|",campo[1]);
            if(fila==0) {
                this.tablehead.push(campo[0]);
            }
            nuevafila.push(campo[1]);
        }
    )
    this.tablecontent.push(nuevafila);
    }

    export_csv(){
        this.exportdata = !this.exportdata;
        if(this.exportdata){
            this.datacsv ="";
            this.tablehead.forEach( col=>this.datacsv += col +",");
            this.datacsv +="\n";
            this.tablecontent.forEach(
                fila =>{
                        fila.forEach( col=>this.datacsv += col +",");
                        this.datacsv +="\n";
                }
            
            )
        }
    }

    toggle_audiencia(){
        this.togleaudiencia = !this.togleaudiencia;
    }

}