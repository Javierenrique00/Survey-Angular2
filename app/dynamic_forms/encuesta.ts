import { QuestionBase } from "./question-base";
import { CreaPreguntasData } from "./crea_preguntas_data";

export class Encuesta{

    constructor(
    public id: string,
    public nombre: string,
    public username: string,
    public fechaini: number,
    public horaini: number,
    public fechafin: number,
    public horafin: number,
    public fechamensaje: number,
    public horamensaje: number, 
    public audiencia?: string[],
    public questions?: QuestionBase<any>[],
    public questionsview?: CreaPreguntasData[],
    public shortdescription?: string
    ){}
    
}

export class AudienciaTable{

    constructor(
    public id: string,
    public nombreencuesta: string,
    public nombregrupo: string
    ){}
    
}