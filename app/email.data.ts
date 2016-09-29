export class Email {

    constructor(
        public owner: string,
        public from: string,
        public to: string,
        public subject: string,
        public content: string){}
}