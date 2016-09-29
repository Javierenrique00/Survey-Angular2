import { Component } from '@angular/core';
import { AuthService } from "./auth.service";

@Component({
    selector: 'my-app',
    templateUrl: "app/app.component.html"
})
export class AppComponent {
id_logueado   : string = "";
user_logueado : string = "";
esta_logueado : boolean = false; 

    constructor(public authservice : AuthService){
    }

    ngOnInit(){
        this.authservice.checkAutenticado();  
    }

    ngOnChanges(){
        this.authservice.checkAutenticado(); 
    }


    ngDoCheck() {
        this.esta_logueado = this.authservice.esta_logueado;
        this.user_logueado = this.authservice.user_logueado;
        this.id_logueado = this.authservice.id_logueado;
    }

 }
