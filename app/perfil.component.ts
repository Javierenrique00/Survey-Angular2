import { Component } from '@angular/core';
import { StorageService } from "./storage.service";
import { Usuario } from "./usuario";
import { AuthService } from "./auth.service";
import { Email } from "./email.data";
import { Router }   from "@angular/router";

@Component({
    selector: 'perfil',
    templateUrl: "app/perfil.component.html",
})
export class Perfil {
username = "";
userdata = {email:"",firstname:"",lastname:"",nacimiento:"",id:"",pwd:"",salt:""};
disableemail = true;
checkcode = false;
disablecheckcode = false;
codigoemail = "";
codigoin = "";
msgverificaemail = false;
changepassword = false;
antpwd="";
newpwd1="";
newpwd2="";
msgnewpwdnotequal = false;
msgoldpwdnotequal = false;
msgpasswordchange = false;
pwdintentos = 0;



    constructor(public storageservice: StorageService,public authservice: AuthService,public router:Router){
        this.username = authservice.user_logueado;
    }

    ngOnInit(){
        
        this.storageservice.readUserByUsername(this.username).subscribe(
            data => this.userdata = data,
            err => console.log("Error:",err),
            ()=>{}
        )
    }

    onSubmit(){
        this.storageservice.writeUserByObject({
            id: this.userdata.id,
            firstname: this.userdata.firstname,
            lastname: this.userdata.lastname,
            nacimiento: this.userdata.nacimiento
        });
    }

    editaEmail(){
        this.disableemail = false;
        this.checkcode = true;
    }

    checkCode(){
        this.disableemail = true;
        this.disablecheckcode = true;
        this.activaVerificacionEmail();
    }

    verificaCode(){
        if(this.codigoin == this.codigoemail){
            //--- Escribe el nuevo email a la base de datos
            this.msgverificaemail = false;
            this.disableemail = true;
            this.checkcode = false;
            this.disablecheckcode = false;

            this.storageservice.writeUserByObject({
                id: this.userdata.id,
                email: this.userdata.email
            });


        }else this.msgverificaemail = true;
    }

    activaVerificacionEmail(){
    //-- Genera un string aleatorio de 4 cifras y envia el email
        let code="";
        code = this.genera()+this.genera()+this.genera()+this.genera();
        let email = new Email("EXISTING_USER","verify@encuestasinteligentes.com",this.userdata.email,
                    "Código de verificación","Buenos días,\nPara modificar su email es necesario ingresar el código:\n"
                    + code);
        this.storageservice.sendEmailDirect(email);
        this.codigoemail = code; 
    }

    genera(){
        return Math.floor((Math.random() * 10)).toString();
    }

    clickchangepassword(){
        this.changepassword = true;
    }

    cambioPassword(){
        if(this.authservice.genSha256(this.antpwd + this.userdata.salt) == this.userdata.pwd){
            if(this.newpwd1==this.newpwd2){
                //-- Contrasenas nuevas son iguales
                this.storageservice.writeUserByObject({id: this.userdata.id,pwd: this.authservice.genSha256(this.newpwd1+this.userdata.salt)});
                this.msgnewpwdnotequal = false;
                this.msgoldpwdnotequal = false; 
                 this.msgpasswordchange = true;
                 setTimeout(()=>{this.msgpasswordchange = false;this.changepassword = false;},5000);
                 this.pwdintentos = 0;
            }
            else{
                //--- Contrasena nueva no es igual
                this.msgnewpwdnotequal = true;
                setTimeout(()=>{this.msgnewpwdnotequal = false;},5000);
            }
        }
        else{
            //---pwd anterior no corresponde
            this.msgoldpwdnotequal = true;
            setTimeout(()=>{this.msgoldpwdnotequal = false;},5000);
            this.pwdintentos += 1;
            if(this.pwdintentos>3){
                //--- Hay que sacarlo de la pagina
                this.authservice.logout();
                this.router.navigate(["/login"]);
                
            }
        }

    }

}