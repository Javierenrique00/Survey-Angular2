import { Component } from '@angular/core';
import { ConsultaSessionService } from "./consulta_session.service";
import { AuthService } from "./auth.service";
import { Router }   from "@angular/router";

@Component({
    selector: 'logout',
    template: `<h2>Logout</h2>
    <p> Este es un site de encuestas dinámicas.</p>
    <p> Se ha deslogueado de la session de manera segura.</p>
    <p> Si debe volver a entrar debe hacer <b>login de nuevo. </b></p>
    
    `
})
export class LogoutComponent {

    constructor(authservice: AuthService){
        authservice.logout();
    }

 }