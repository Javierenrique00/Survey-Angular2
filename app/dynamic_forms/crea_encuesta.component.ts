import { Component} from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ConsultaSessionService} from "../consulta_session.service";
import { StorageService} from "../storage.service";
import { Session } from "../session";
import { Encuesta } from "./encuesta";

import { Observable } from 'rxjs/Observable';
import { QuestionService }   from "./question.service";
import { AuthService } from "../auth.service";
import { SelAudienciaRender } from "./selecciona_audiencia.render";
import { Email } from "../email.data";
import { Link } from "./link.data"

//import { CreaPreguntasComponent } from "./crea_preguntas.component";


//directives: [SelAudienciaRender], parece que lo quitaron o hay que cambiar como embeber el componente de selecciona_audiencia.render

@Component({
    selector: 'creaencuesta',
    templateUrl: "app/dynamic_forms/crea_encuesta.html",
    providers: [QuestionService] 
})
export class CreaEncuestaComponent {
revisaSession = false;
session = false;
nuevaEncuesta = false;
newEncuesta = new Encuesta("","","",0,0,0,0,0,0);
encuestas: Observable<Encuesta[]>;
listaInicial = true;
usuario_actual = "";
okpreguntas=false;
disable_edit = false;


    ngDoCheck(){
        if(this.listaInicial ){
          this.encuestas = this.storageService.readEncuestasByUser(this.usuario_actual);
          this.listaInicial = false;
        }
    
    }

 
    constructor(public authservice:AuthService,
     public storageService: StorageService, public questionService: QuestionService){
       this.usuario_actual = authservice.user_logueado;     
    }

    onSubmit(){


        if(this.newEncuesta.id =="") this.newEncuesta.id = "ENCUESTA/"+this.usuario_actual+"/"+ Date.parse(Date()).toString();
        this.newEncuesta.username = this.usuario_actual;

        this.newEncuesta.questions = this.questionService.getQuestions(); //-- Trae las preguntas
        this.newEncuesta.questionsview = this.questionService.getViewQuestions();
        console.log("--- vemos si tiene las preguntas ---:",this.newEncuesta.questionsview);

        //--guarda la encuesta con su audiencia en una tabla especial
        this.storageService.writeEncuesta(this.newEncuesta);
        this.storageService.editAudienciaGroup(this.newEncuesta.nombre,this.newEncuesta.audiencia);

        this.nuevaEncuesta = false;
        this.encuestas = this.storageService.readEncuestasByUser(this.usuario_actual);
    }

    editaEncuesta(id:string){
     // console.log("Edit:",id);
      //-- trae la encuesta
      
      this.storageService.readEncuestasById(id).subscribe(
        result => { if(result != null) {
            this.newEncuesta = result;
            this.questionService.loadQuestions(result.questions);
            //---Carga los datos visuales de la encuesta !!!
             this.questionService.loadViewQuestions(result.questionsview);
             console.log("--Cargan datos al servicio:",result.questionsview);

        }},
        err => console.log("error:",err),
        () =>console.log("complete")
      );
      this.nuevaEncuesta=true; //--habilita el formulario
      this.disable_edit = true; //--deshabilita el campo de edicion de encuestas.      
      //this.encuestas = this.storageService.readEncuestasByUser(this.userSession.username);
    }


    deleteEncuesta(id:string,nombreencuesta:string){
      //console.log("Delete:",id);
      this.storageService.deleteEncuesta(id);
      //---borrar los grupos de audiencia asociados a la encuesta.
      this.storageService.deleteAudienciaEncuesta(nombreencuesta);
      this.encuestas = this.storageService.readEncuestasByUser(this.usuario_actual);
    }

    creaEncuesta(){
      this.nuevaEncuesta=true;
      this.disable_edit = false;
      this.newEncuesta.id = "";
      this.newEncuesta.nombre = "";
      //--inicializa la carga los datos visuales
      this.questionService.newViewQuestion();

    }

    copiaAudiencia(audiencia: string[]){
      this.newEncuesta.audiencia = audiencia;
    }

    checkPreguntas(estado:boolean){
      this.okpreguntas = estado;
    }

    enviarEncuesta(id:string,shortdescription:string,encuesta:string){

      this.storageService.readUsersForEncuesta(id).subscribe(
            out=>{
              out.forEach(
                user =>{
                  let fecha = Date.parse(Date());
                  let salt = this.authservice.genRandomSalt(25);
                  let codigo = fecha.toString()+salt;
                  let link = new Link(
                        codigo,
                        "http://localhost:8181/#/page1/"+codigo,
                        user.email,
                        encuesta,
                        salt,
                        this.authservice.genSha256(codigo),
                        fecha,user.iduser);
                  //console.log("usuario:",user.iduser);
                  this.storageService.writeNewLink(link);

                  this.storageService.sendEmailDirect(
                   new Email(this.usuario_actual,"encuesta@superencuestas.com",user.email,"Encuesta: "+shortdescription,
                   "Por favor Conteste la encuesta en el siguiente link ---->\n"+link.link));
                }
              )
            },
            err=>console.log("error:",err),
            ()=>{});

    }


 }