import { AbstractControl } from '@angular/forms';

export class  RespuestaStorage{
 
    constructor(
        public id:string,
        public usuario:string,
        public email:string,
        public encuesta:string,
        public value:AbstractControl
         ){}

}
