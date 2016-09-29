import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CreaPreguntasData} from "./crea_preguntas_data";
import { DropdownQuestion } from './question-dropdown';
import { QuestionBase }     from './question-base';
import { TextboxQuestion }  from './question-textbox';
import { QuestionService }   from "./question.service";

import { DataClass } from "./data_class";


@Component({
    selector: 'creapreguntas',
    templateUrl: "app/dynamic_forms/crea_preguntas.html",
    providers: [DataClass] 
})
export class CreaPreguntasComponent {
    @Output() checkpreguntas = new EventEmitter<boolean>();
    formavalid= false;
    arraypreguntas : CreaPreguntasData[];
    arrayencuesta : QuestionBase<any>[] = [];  
      

    
    ngDoCheck(){

        this.arraypreguntas = this.questionService.getViewQuestions();
        console.log("rapido:",this.arraypreguntas);
        if(this.arraypreguntas == null) {
            this.arraypreguntas = [new CreaPreguntasData("textbox")];
            this.questionService.loadViewQuestions(this.arraypreguntas);
        }
    }


    constructor(public questionService: QuestionService, public dataclass: DataClass){ 
        let a :  CreaPreguntasData[] = [new CreaPreguntasData("textbox")];
        //let a :  CreaPreguntasData[] = [];
        this.arraypreguntas = a; 
    }

    onSubmit(){
        this.checkpreguntas.emit(true);

        this.arraypreguntas.forEach(preg => {this.transformaEncuesta(preg);
            console.log("Conversion ->",this.arrayencuesta)    
        });
        //----ojo dataclass
        //this.arrayencuesta = this.dataclass.getQuestions();

        this.questionService.loadQuestions(this.arrayencuesta);
        this.questionService.loadViewQuestions(this.arraypreguntas);
        console.log("cargo:",this.arrayencuesta);
    }

    transformaEncuesta(pregunta:CreaPreguntasData){
                           
        switch (pregunta.tipopregunta) {
            case "textbox":
                this.arrayencuesta.push(
                    new TextboxQuestion(
                        {
                        key: pregunta.campo,
                        label: pregunta.textboxpregunta,
                        type: pregunta.textboxtipo,
                        value: pregunta.textboxvalor,
                        required: pregunta.textboxobligatorio,
                        order: 1
                        }
                  
                    )
                );
                break;
            case "dropDownList":
                this.arrayencuesta.push(
                    new DropdownQuestion(
                        {
                        key: pregunta.campo,
                        label: pregunta.ddlistpregunta,
                        options: this.transformaLista(pregunta.ddlistopciones),
                        order: 1
                        }
                    )
                );
                
                break;
        
            default:
                break;
        }

    }


    transformaLista(texto:string) : {key: string, value: string}[]{
        let vect : {key: string, value: string}[] = [{key: "---", value: "---"}];
        if(texto.length > 0 ){
            let arreglo = texto.split("\n");    
            arreglo.forEach(dat => vect.push({ key:dat, value:dat }));
        }
        
        return vect;
    }



    nuevaPregunta(){
        this.checkpreguntas.emit(false);
        console.log("tamano:",this.arraypreguntas.push(new CreaPreguntasData("textbox")));
    }

    borrarPregunta(indice:number){
        this.checkpreguntas.emit(false);
        //console.log("Indice:",indice);
        this.arraypreguntas.splice(indice,1);
        //console.log("tamano:",this.arraypreguntas.length);
    }


}
