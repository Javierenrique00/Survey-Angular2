import { Component } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Usuario }   from './usuario';
import { Router }   from "@angular/router";
import { RegistroService } from "./registro.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Email } from "./email.data";
import { StorageService } from "./storage.service";
declare var sha256:any; //--libreria sha256 de javascript



@Component({
    selector: 'registro',
    templateUrl: "app/registro.component.html",
    providers: [RegistroService]
})
export class Registro {
    
    usuario = new Usuario("","","","");
    rpwd = "";
    iguales = true;
    duplicados = false;
    boton = false;
    patternNombre="^[0-9A-Za-z]+$";
    patternPWD="(?=^.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])";
    codigo = "";
    codigoemail = "";
    activacode = false;
    intentos=0;
    codigook=false;
    msgerrorcode = false;
    msgblock = false;

    private searchTermStream = new Subject<string>();

items: Observable<Usuario[]> = this.searchTermStream.debounceTime(300).
      distinctUntilChanged().
      switchMap((term: string) => this.registroservice.readUserByNombre(term)); 


constructor(
       private router: Router,
       private registroservice: RegistroService,public storageservice: StorageService 
   ){}


    ngDoCheck(){
        this.strVerifica();
        if(this.usuario.state=="free"){
            this.router.navigate(["/page2"]);
        }else{
            if(this.boton)
            this.duplicados = true;
        }

         if(this.rpwd == this.usuario.pwd ){
            this.iguales = true;
         }

    }


    onSubmit(){
        if(this.rpwd == this.usuario.pwd ){
            this.iguales = true;
            this.activaVerificacionEmail();
            this.activacode = true;
            //--- Hay que esperar a recibir el numero generado
            //this.registroservice.insertUserDb(this.usuario);
            //this.boton = true;
        }else{
            this.iguales = false;
        }
    }

  //--- Solo son validos letras y numeros y debe ser menor a 18 Characteres sin espacios 
  strVerifica():boolean {
      
      this.searchTermStream.next(this.usuario.nombre);

      this.items.subscribe(
          result => {
                    if(result == null) {this.duplicados = false} else {this.duplicados = true} },
          err => console.log("error:",err)
      )

      if(this.usuario.nombre.match(this.patternNombre)){
        return true;
      }
      else{
        return false;
      }
    }

     pwdVerifica() {     
      if(this.usuario.pwd.match(this.patternPWD)){
        return true;
      }
      else{
        return false;
      }
    }

    activaVerificacionEmail(){
    //-- Genera un string aleatorio de 4 cifras y envia el email
        let code="";
        code = this.genera()+this.genera()+this.genera()+this.genera();
        let email = new Email("NEW_USER","verify@encuestasinteligentes.com",this.usuario.email,
                    "Código de verificación","Buenos días,\nPara terminar su registro, por favor ingrese el siguiente código:\n"
                    + code);
        this.storageservice.sendEmailDirect(email);
        this.codigoemail = code; 
    }

    //-- Genera un digito string de 0-9 
    genera(){
        return Math.floor((Math.random() * 10)).toString();
    }

    verificaCodigo(){
        if(this.codigoemail==this.codigo){
            //---codigo verificado
            this.codigook = true;

            this.registroservice.insertUserDb(this.usuario);
            this.boton = true;
        }
        else{
            
            this.intentos=this.intentos+1;
            console.log("intentos:",this.intentos);
            if(this.intentos>2) {
                this.boton = false;
                this.msgerrorcode = false;
                this.intentos = 0;
                this.duplicados = false;
                this.msgblock=true;
                setTimeout(()=>{this.activacode = false;this.msgblock=false;},5000);
            }
            else{
                this.msgerrorcode = true;
            }
        }
    }

}