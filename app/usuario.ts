
export class Usuario{

    constructor(
    public id: string,
    public nombre: string,
    public pwd: string,
    public uid: string,
    public email?: string,
    public state?: string,
    public datetime?: number, 
    public grupos?: string[],
    public firstname?: string,
    public lastname?: string,
    public nacimiento?: string,
    public salt?:string
    ){}
    
}