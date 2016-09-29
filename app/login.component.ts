import { Component } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Usuario }   from './usuario';
import { Router }   from "@angular/router";
import { LoginService } from "./login.service";

@Component({
    selector: 'login',
    templateUrl: "app/login.component.html",
    providers: [LoginService]
})
export class Login{
   usuario = new Usuario("","","","");
   nopasa = 0;
   checking = false;
 
   constructor(
       private router: Router,
       private loginservice: LoginService
   ){}

    ngDoCheck(){
        if(this.usuario.uid.length >3 ) {            
            this.gotoLogin();
        }
        
    }

    onSubmit(){
        this.checking=true; 
        this.loginservice.getUserUid(this.usuario, this.nopasa);
        this.nopasa = this.nopasa + 1;
        setTimeout(()=>{this.checking=false;},500);   
    };

    gotoLogin(): void {
        this.router.navigate(["/page2"]);
    }

    get diagnostic() { return JSON.stringify(this.usuario); } //-> para ver con {{diagnostic}}


}
    