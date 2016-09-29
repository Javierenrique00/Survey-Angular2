
export class Session{

    constructor (
        public id: string,
        public username: string,
        public datetime: number,
        public email: string,
        public grupos?: string[]        
    ){}

}