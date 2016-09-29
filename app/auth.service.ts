import { Injectable }      from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageService }  from "./storage.service";
import { ConsultaSessionService }  from "./consulta_session.service";
import { Session } from "./session";
declare var sha256:any; //--libreria sha256 de javascript


@Injectable()
export class AuthService {
id_logueado   : string = "";
user_logueado : string = "";
esta_logueado : boolean = false;
email_logueado : string = "";
chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz1234567890";

  
  constructor(public storageService : StorageService,public consultasessionservice: ConsultaSessionService) {
  
  }

  genRandomSalt(size:number):string{
      let tama = this.chars.length;
      let salida = "";
      for(let x=0;x<size;x++){
          let index = Math.floor((Math.random() * tama));
          salida += this.chars.substring(index,index+1);
      }
      return salida;
    }

    genSha256(datain:string):string{
        return sha256(datain);
    }


  public login(username: string, email:string) {
      let session = new Session(
          "SESSION/"+username+"/",
          username,
          Date.parse(Date()),
          email);

      this.storageService.creaSession(session);
      //--crea las cookie en el almacenamiento local
      this.consultasessionservice.creaSession(session.id,session.datetime);
      this.id_logueado = session.id;
      this.user_logueado = session.username;
      this.email_logueado = session.email;
      this.esta_logueado = true;
  };


  public logout() {
    let id:string;
    // Remove token from localStorage
    this.consultasessionservice.deleteSession();
    this.storageService.removeSessionById(this.id_logueado);
    this.id_logueado = "";
    this.user_logueado = "";
    this.email_logueado = "";
    this.esta_logueado = false; 
  };

  public checkAutenticado(){
      let id:string;
      id=this.consultasessionservice.checkUserLogin();
      this.storageService.readSessionById(id).subscribe(
          result =>{
            if(result.id == id){
                  //---El ID de la session coincide con el ID de la Cookie
                  this.id_logueado = result.id;
                  this.user_logueado = result.username;
                  this.email_logueado = result.email;
                  this.esta_logueado = true;
            }
            else{
              //-- No esta logueado porque no coincide la cookie con la session
                  this.id_logueado = "";
                  this.user_logueado = "";
                  this.email_logueado = "";
                  this.esta_logueado = false;                  
            }
        },
          error =>{
            console.log("Error",error)
          },
          () => {}
      )


  }

}