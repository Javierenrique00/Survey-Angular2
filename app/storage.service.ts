import { Injectable } from '@angular/core';
import { Session } from "./session";
import { Usuario } from "./usuario";
import { Encuesta, AudienciaTable } from "./dynamic_forms/encuesta";
import { GpUser, GpEmail, GpUser2 } from "./dynamic_forms/user_group.model";
import { Observable } from 'rxjs/Observable';
import { RespuestaStorage } from './dynamic_forms/respuesta-storage';
import { Email } from "./email.data"
import { Link } from "./dynamic_forms/link.data"



declare var Horizon: any;
declare var Rx: any;

@Injectable()
export class StorageService{   
    horizon = Horizon();
    sessionCollection = this.horizon("session");
    encuestaCollection = this.horizon("encuestas");
    usuariosCollection = this.horizon("usuarios");
    grupoCollection = this.horizon("grupos");
    respuestasCollection = this.horizon("respuestas");
    outEmailCollection = this.horizon("outemails");
    linksCollection = this.horizon("links");

    constructor(){
    }


    readUsersForEncuesta(id:string):Observable<string[]>{

        return this.encuestaCollection.find({id: id}).fetch().mergeMap(togp => Rx.Observable.from(togp.audiencia)).mergeMap(
            indice =>this.grupoCollection.findAll({ngemail: indice},{nombregrupo: indice}).fetch()
        ).bufferTime(500).map(dat => [].concat.apply([],dat));
        
    }



    readUsersForGroups(grupos: string[]):Observable<string[]>{

        return Rx.Observable.from(grupos).mergeMap(
            indice =>this.grupoCollection.findAll({ngemail: indice},{nombregrupo: indice}).fetch()
        ).bufferTime(200).map(
            index => this.transToArray(index)
        )
        
        // .subscribe(
        //             out=>console.log("OUT-map:",out),
        //             err=>console.log("error:",err),
        //             ()=> console.log("complete:")
        //         )
    }

    transToArray(entrada: any[]):string[]{
        let vsalida: string[] =[];
        entrada.forEach(
            dat =>{ 
                    dat.forEach(
                         xxx =>{

                             if(vsalida.indexOf(xxx.email)==-1) vsalida.push(xxx.email);
                            //console.log("email->",xxx.email);
                         }

                    )
                    
            }

        )
        return vsalida;
    }


    readEncuestasForUserEmail(email: string): Observable<Encuesta[]> {

        //let grupos : string[] = [];
       // let busqueda : string[] = [];

        return this.grupoCollection.findAll({email: email}).fetch().map(
            dat =>this.transforma(dat) 
        ).mergeMap(
            indice =>Rx.Observable.from(indice)
        ).mergeMap(
                item =>this.encuestaCollection.findAll({nombregrupo: item}).fetch()).bufferTime(100).map(
                    parameter=>this.aplica(parameter)
        ).mergeMap(
                    index =>Rx.Observable.from(index)
        ).mergeMap(
                    index =>this.encuestaCollection.findAll({nombre: index}).fetch()
        ).bufferTime(100).map(
            index=>this.ajusta_salida(index)
        )
        
        // .subscribe(
        //             out=>console.log("OUT-map:",out),
        //             err=>console.log("error:",err),
        //             ()=> console.log("complete:")
        //         )
}

    // Funcion auxiliar para readEncuestasForUserEmail
    //--Elimina los valores duplicados de los grupos y entrega un grupos a los que pertence el usuario
    transforma(entrada: any[]):any {
        let grupos : string[] = [];
        let cadena = "";
                 entrada.forEach(
                     dat=>{
                         if(dat.nombregrupo != undefined) if(grupos.indexOf(dat.nombregrupo)==-1) grupos.push(dat.nombregrupo);
                         if(dat.ngemail != undefined) if(grupos.indexOf(dat.ngemail)==-1) grupos.push(dat.ngemail);
                     })

        return grupos;
    }

    // Funcion auxiliar para readEncuestasForUserEmail
    //--Elimina los valores duplicados de la busqueda de encuesta y entrega un vector con las encuestas
    aplica(entrada: any[]):string[]{
        let encuestas : string[] = [];
        try{
            entrada.forEach(
                data=>{
                        data.forEach(
                            valor => {if(encuestas.indexOf(valor.nombreencuesta)==-1) encuestas.push(valor.nombreencuesta);}
                        )
                }
            
            )
        }
        catch(error){                    
                }
        return encuestas;
    }

    // Funcion auxiliar para readEncuestasForUserEmail
    //--ajusta la salida del observable para que los objetos queden acomodados en un vector de encuestas, quitando un nivel.
    ajusta_salida(entrada: any[]):Encuesta[]{
        // let retorno:Encuesta[] = [];
        //     entrada.forEach(
        //         dat=>retorno.push(dat)
        //     )
        return [].concat.apply([],entrada);
    }

    //--Almacena las respuestas de la encuesta en la colleccion de respuestas
    almacenaEncuestaContestada(data:RespuestaStorage){
        this.respuestasCollection.store(data);
    }

    //--Lee las respuestas que el usuario ha enviado
    readRespuestasByEmail(email:string): Observable<RespuestaStorage[]>{

        return this.respuestasCollection.findAll({email: email}).fetch();
    }

    //--Lee las respuestas que el usuario ha enviado
    readRespuestasByEncuesta(encuesta:string): Observable<RespuestaStorage[]>{

        return this.respuestasCollection.findAll({encuesta: encuesta}).fetch();
    }

    deleteRespuestasById(id:string){
        this.respuestasCollection.remove({id: id});
    }


    //--lee la session del usuario de la DB
    readSessionById(idsearch: string): Observable<Session> {
       return this.sessionCollection.find({id: idsearch}).fetch().defaultIfEmpty();
    }

    //--Elimina la session dl usuario de la DB
    removeSessionById(id: string){
        this.sessionCollection.remove({id: id});
    }

    //--Crea una session de usuario en la DB
    creaSession(session:Session){
        this.sessionCollection.store(
            JSON.stringify(session)
        )
    }

    //--Crea una encuesta
    writeEncuesta(encuesta: Encuesta){
        this.encuestaCollection.store(JSON.stringify(encuesta))
    }

    //--Lista las encuestas del Usuario
    readEncuestasByUser(nombreuser: string): Observable<Encuesta[]>{
        return this.encuestaCollection.findAll({username: nombreuser}).fetch();
    }

    //--lista las encuestas que puede contestar el usuario
    readEncuestasForUser(username: string): Observable<Encuesta[]>{
        return this.encuestaCollection.find({iduser: username}).fetch();
    }


    //--Elimina la encuesta
    deleteEncuesta(idEncuesta:string){
        this.encuestaCollection.remove({id: idEncuesta});
    }

    //--Trae la encuesta desde un id
    readEncuestasById(iddata: string): Observable<Encuesta>{
        return this.encuestaCollection.find({id: iddata}).fetch().defaultIfEmpty();
    }


    //--Actualiza los grupos de audiencia dentro de la tabla especial de lamisma collection de la audiencia
    editAudienciaGroup(nombreencuesta:string,grupos: string[]){
        let audiencias : AudienciaTable[] = [];
        this.encuestaCollection.findAll({nombreencuesta: nombreencuesta}).fetch()
            .mergeMap(list => this.encuestaCollection.removeAll(list)).subscribe({
                next(id)   { console.log(`id ${id} was removed`) },
                error(err) { console.error(`Error: ${err}`); },
                complete() { 
                    console.log('All items removed successfully n1');
             }
            });
            
            grupos.forEach(
                dat=>{ audiencias.push(
                    new AudienciaTable("AUDIENCIA/"+nombreencuesta+"/"+dat,nombreencuesta,dat)
                    )}
            );
            setTimeout(()=>{this.encuestaCollection.store(audiencias);},2000);
    }

 
    //-- Trae la lista de usuarios para agregarlos a los grupos
    readUsers(): Observable<Usuario[]> {
        return this.usuariosCollection.fetch().defaultIfEmpty();
    }

    writeGrupo(grupo: GpUser[]){
            this.grupoCollection.store(grupo);
    }

    writeEmailGrupo(grupo: GpEmail[]){
            this.grupoCollection.store(grupo);
    }


    writeNombreGrupo(id: string,nombregrupo: string, idowner: string){
        this.grupoCollection.store({id: id,nombregruposingle: nombregrupo,idownersingle: idowner});
    }

    //--Trae la lista de los grupos para ser buscados por nombre de grupo
    readGroupByName(grupo:string) : Observable<GpUser[]>{
        return this.grupoCollection.find({nombregruposingle: grupo.toLowerCase()}).fetch();
    }

    //--Trae la lista de los grupos para ser buscados por dueno del grupo
    readGroupByOwner(dueno:string) : Observable<GpUser2[]>{
        return this.grupoCollection.findAll({idownersingle: dueno}).fetch();
        //return this.grupoCollection.fetch();
    }

    //--Elimina el grupo single
    deleteGroupById(id:string){
        this.grupoCollection.remove({id: id});
    }

    //---Elimina los usuarios que tienen el nombre mismo nombregrupo
    deleteGroupByNombregrupo(nombregrupo:string){
        this.grupoCollection.findAll({nombregrupo: nombregrupo}).fetch()
            .mergeMap(list => this.grupoCollection.removeAll(list)).subscribe({
                next(id)   { console.log(`id ${id} was removed`) },
                error(err) { console.error(`Error: ${err}`); },
                complete() { console.log('All items removed successfully') }
            });
    }

 //---Elimina los usuarios que tienen el nombre mismo nombregrupo NgEmail
    deleteEmailGroupByNombregrupo(nombregrupo:string){
        this.grupoCollection.findAll({ngemail: nombregrupo}).fetch()
            .mergeMap(list => this.grupoCollection.removeAll(list)).subscribe({
                next(id)   { console.log(`id ${id} was removed`) },
                error(err) { console.error(`Error: ${err}`); },
                complete() { console.log('All items removed successfully') }
            });
    }


    readGroupUsers(nombregrupo:string) : Observable<GpUser[]>{
        return this.grupoCollection.findAll({nombregrupo: nombregrupo}).fetch();
    }

    readEmailGroupUsers(nombregrupo:string) : Observable<GpEmail[]>{
        return this.grupoCollection.findAll({ngemail: nombregrupo}).fetch();
    }

    editGroup(nombregrupo:string,grupo: GpUser[]){
        this.grupoCollection.findAll({nombregrupo: nombregrupo}).fetch()
            .mergeMap(list => this.grupoCollection.removeAll(list)).subscribe({
                next(id)   { console.log(`id ${id} was removed`) },
                error(err) { console.error(`Error: ${err}`); },
                complete() { 
                    console.log('All items removed successfully n1');
             }
            });
            setTimeout(()=>{this.grupoCollection.store(grupo);},1000);
    }

    editMailGroup(nombregrupo:string,grupo: GpEmail[]){
        this.grupoCollection.findAll({ngemail: nombregrupo}).fetch()
            .mergeMap(list => this.grupoCollection.removeAll(list)).subscribe({
                next(id)   { console.log(`id ${id} was removed`) },
                error(err) { console.error(`Error: ${err}`); },
                complete() {
                    console.log('All items removed successfully n11');
             }
            });
    
            setTimeout(()=>{this.grupoCollection.store(grupo);},1000);
    }


    //Elimina los grupos de Audiencia de la encuesta que se acaba de borrar
    deleteAudienciaEncuesta(nombreencuesta:string){
        console.log("delete_audiencia:",nombreencuesta);
        this.encuestaCollection.findAll({nombreencuesta: nombreencuesta}).fetch()
            .mergeMap(list => this.encuestaCollection.removeAll(list)).subscribe({
                next(id)   { console.log(`id ${id} was removed`) },
                error(err) { console.error(`Error: ${err}`); },
                complete() { console.log('All items removed successfully') }
            });
    }

    sendEmailDirect(email: Email){
        this.outEmailCollection.store(email);
    }

    readUserByUsername(username:string):Observable<any>{
        return this.usuariosCollection.find({nombre: username}).fetch();
    }

    writeUserByObject(usuario:any){
        this.usuariosCollection.update(usuario);
    }

    writeNewLink(link:Link){
        this.linksCollection.insert(link);
    }

    readLinkById(id:string):Observable<Link>{
        return this.linksCollection.find({id: id}).fetch();
    }

}