export class GpUser{

    constructor(
    public id: string,
    public nombregrupo: string,
    public idowner?: string,
    public iduser?: string,
    public email?: string){}
    
}

export class GpEmail{

    constructor(
    public id: string,
    public ngemail: string,
    public idowner?: string,
    public email?: string){}
    
}

export class GpUser2{

    constructor(
    public id: string,
    public idownersingle?: string,
    public nombregruposingle?:string){}
    
}