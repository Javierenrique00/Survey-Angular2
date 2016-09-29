//--- Modelo de datos para crear preguntas ---Ojo no se almacena en la DB
import { Injectable }       from '@angular/core';

@Injectable()
export class CreaPreguntasData{

    public tipopregunta:string;
    public campo:string;
    public textboxtipo:string;
    public textboxpregunta:string;
    public textboxvalor:string;
    public textboxobligatorio:boolean;
    public ddlistpregunta:string;
    public ddlistopciones:string;
 
        constructor(_tipopregunta:string){
            this.tipopregunta = _tipopregunta;
        }


}

