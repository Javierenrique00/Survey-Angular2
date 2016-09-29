import { Injectable } from '@angular/core';
import { Usuario } from "./usuario";
import { Observable } from 'rxjs/Observable';
import { AuthService } from "./auth.service";

declare var Horizon: any;

@Injectable()
export class RegistroService {
    horizon = Horizon();
    collection = this.horizon("usuarios");

    constructor(public authservice:AuthService){}

    insertUserDb(usuario: Usuario) {
        let existeDoc = false;
        usuario.uid = "";
        //-- Consulta si el documento esta en la DB
        this.collection.find({
            nombre: usuario.nombre.toLowerCase()
        }).fetch().subscribe(
            result => {
                console.log('Result:', result);
                if(result != null) {
                    existeDoc = true;
                    usuario.uid = result.id;
                }
                        
            },
            err => console.error(err),
            () => {
                if(!existeDoc){
                usuario.id="USER/"+usuario.nombre.toLocaleLowerCase()+"/";
                usuario.nombre = usuario.nombre.toLocaleLowerCase();
                usuario.state = "free";
                usuario.datetime = Date.parse(Date());
                usuario.salt = this.authservice.genRandomSalt(30);
                usuario.pwd = this.authservice.genSha256(usuario.pwd+usuario.salt);
                this.writeUserDb(usuario)
                console.log('Resulados escritos');
                }
            }
        );
        
 
    }

    writeUserDb(usuario: Usuario){//-- Escribe el nuevo usuario a la DB
    this.collection.store(
       // "{"+JSON.stringify(usuario).substring(13)        
        JSON.stringify(usuario)
        )
    }

        readUserByNombre(idsearch:string): Observable<Usuario[]> {
        return this.collection.find({nombre: idsearch.toLowerCase()}).fetch();
    }

    createSession(){
        //this.horizon

    }        

} 