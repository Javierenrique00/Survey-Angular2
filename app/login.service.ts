import { Injectable } from '@angular/core';
import { Usuario } from "./usuario";
import { Session } from "./session";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { AuthService } from "./auth.service";
import { Router }   from "@angular/router";

declare var Horizon: any;

@Injectable()
export class LoginService {
    horizon = Horizon();
    collection = this.horizon("usuarios");
    collection_session = this.horizon("session");

    constructor(public authservice: AuthService, public router: Router){

    }


    getUserUid(usuario: Usuario,nopasa : number) {
        let usuarioDb= new Usuario("","","","");
        usuario.uid = "";
        //-- Consulta si el documento esta en la DB
        this.collection.find({
            nombre: usuario.nombre.toLocaleLowerCase()
        }).fetch().subscribe(
            result => {
                //console.log('Result:', result)
                usuarioDb.id = result.id;
                usuarioDb.nombre = result.nombre;
                usuarioDb.uid = result.id;
                usuarioDb.state = result.state;
                usuarioDb.datetime = result.datetime;
                usuarioDb.pwd = result.pwd;
                usuarioDb.email = result.email;
                usuarioDb.salt = result.salt;

                //--Mira si se puede desbloquear
                if(usuarioDb.state == "block"){
                    usuario.state = "block";
                    let ahora = Date.parse(Date());                    
                    if(ahora - usuarioDb.datetime > 120000){ //--Se desbloquea a los 2 minutos
                        usuarioDb.state = "free";
                        this.freeUserid(usuarioDb);
                        usuario.state = "free";
                    }
                }

                if(usuarioDb.state == "free"){
                    if(usuarioDb.pwd != this.authservice.genSha256(usuario.pwd + usuarioDb.salt)){                   
                        if(nopasa>3){ //--Bloque al usuario al tercer intento
                            usuarioDb.state = "block";
                            usuario.state = "block";
                            usuarioDb.datetime = Date.parse(Date());
                            this.blockUserid(usuarioDb);                       
                        }                        
                    }
                    else{
                        //usuario.uid = usuarioDb.uid;
                        usuario.uid = "SON-IGUALES";
                        //--- Crea la session en la DataBase
                        this.organizaDatosSession(usuarioDb);
                        //this.router.navigate(["/page2"]);
                    }
                }

            },
            err => console.error(err),
            () => console.log('Results fetched')
        );
    }

    blockUserid(usuarioDb: Usuario){
        this.collection.store(
            JSON.stringify(usuarioDb)
        )
    }

    freeUserid(usuarioDb: Usuario){
    this.collection.store(
        JSON.stringify(usuarioDb)
        )
    }

    //captura los datos de la session
    organizaDatosSession(usuarioDb: Usuario){
        let session = new Session(
            "SESSION/"+usuarioDb.nombre+"/",
            usuarioDb.nombre,
            Date.parse(Date()),
            usuarioDb.email            
            );
            //console.log('Transforma_session:', JSON.stringify(usuarioDb))
            //this.creaSession(session);
            // this.storageservice.creaSession(session);
            // this.creaCookieSession(session);
            this.authservice.login(usuarioDb.nombre,usuarioDb.email);
    }


    //-- Crea la sesion del usuario en la base de datos
    // creaSession(session:Session){
    //     this.collection_session.store(
    //         JSON.stringify(session)
    //     )
    //     //console.log('Crea_session:', JSON.stringify(session))
    // }

    //-- Crea la cookie del lado del usuario para tener los datos de la session
    // creaCookieSession(session:Session){
    //     Cookie.set("appsession_id",session.id);
    //     Cookie.set("appsession_datetime",session.datetime.toString());
    // }

} 