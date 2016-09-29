export class Link{

    constructor(
        public id:string,
        public link:string,
        public email:string,
        public encuesta:string,
        public salt:string,
        public hash:string,
        public fecha:number,
        public usuario:string
    ){}

}