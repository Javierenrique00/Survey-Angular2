import { Component } from '@angular/core';
import { StorageService } from "./storage.service";
import { DynamicFormComponent } from "./dynamic_forms/dynamic-form.component"
import { DataClass } from "./dynamic_forms/data_class";
import { DropdownQuestion } from './dynamic_forms/question-dropdown';
import { QuestionBase }     from './dynamic_forms/question-base';
import { TextboxQuestion }  from './dynamic_forms/question-textbox';
import { Observable } from 'rxjs/Observable';
import { Encuesta } from "./dynamic_forms/encuesta";
import { AuthService } from "./auth.service";
import { RespuestaStorage } from './dynamic_forms/respuesta-storage';
import { ActivatedRoute } from "@angular/router";
import { Link } from "./dynamic_forms/link.data";




@Component({
    selector: 'page1',
    templateUrl: "app/page1.component.html",
    providers: [DataClass]
})
export class Page1 {
    questions: any[];
    encuestas: Observable<Encuesta[]>;
    preguntas: QuestionBase<any>[];
    hay_encuesta = false;
    usuario = "";
    encuesta_actual = "";
    email_actual  = "";
    respuestas: RespuestaStorage[]= [];
    resp_encuesta: string[] = [];
    resp_id: string[] = [];
    shortdescription = "";
    externo = false;
    link: Link = new Link("","","","","","",0,"");

    lista: Observable<any>;


    constructor(public storageservice : StorageService, public dataclass : DataClass,
        public authservice: AuthService, public route:ActivatedRoute) {
            this.cargaLink();
    }

    ngOnInit(){
        
        setTimeout(()=>{
            if(this.externo){
                this.email_actual = this.link.email;
                this.usuario = this.link.usuario;
            }else{
                this.email_actual = this.authservice.email_logueado;
                this.usuario = this.authservice.user_logueado;
            }        

            this.encuestas = this.storageservice.readEncuestasForUserEmail(this.email_actual);
            this.revisaRespuestas();
        },1000);
    }

    cargaLink(){
        let parametros = this.route.snapshot.params;
        try{
            if(parametros.id!=undefined){
                this.externo = true;;
                //console.log("Parametro verificado con ID:",this.externo_data);
                this.storageservice.readLinkById(parametros.id).subscribe(
                    data=> {
                        this.link = data;
                        console.log("LeeLink:",data);
                    },
                    err=>console.log("Error:",err),
                    ()=>{});
                }
        }
        catch(err){
            console.log("Error",err);
        } 
    }


    trae_encuesta(id: string){
        this.storageservice.readEncuestasById(id).subscribe(
            data =>{
                if(data!=null) {
                    this.preguntas = data.questions;
                    this.encuesta_actual = data.nombre;
                    this.shortdescription = data.shortdescription;
                    this.hay_encuesta = true;
                    
                    //console.log("Traje encuesta",this.preguntas);
                }
            },
            err => console.log("error:",err),
            () => console.log("Loaded OK")
        )
    }
 
    revisaRespuestas(){
        this.resp_encuesta=[];
        this.resp_id=[];
        //---revisa que encuestas ya se contestaron
        this.storageservice.readRespuestasByEmail(this.email_actual).subscribe(
            data =>{
                    this.respuestas = data;
                    data.forEach( a => {this.resp_encuesta.push(a.encuesta);
                        this.resp_id.push(a.id);
                        //console.log("respuestas:",a.id);
                    });
            },
            err => console.log("error:",err),
            () =>{}
        )

    }

    onRespuesta(encuesta:string){

        this.revisaRespuestas();  
    }

    eliminaRespuesta(id: number){
        this.hay_encuesta = false;
        this.storageservice.deleteRespuestasById(this.resp_id[id]);
        setTimeout(()=>{this.revisaRespuestas()},100);
    }

}