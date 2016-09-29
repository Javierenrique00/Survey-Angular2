import { Component } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Usuario }   from './usuario';

@Component({
    selector: 'login',
    template: `
    <h2>Login</h2>
    <label for="nombre">Usuario</label>
    <input type="text" id="nombre" #box (keyup)="values=box.value" (keyup.enter)="onClickMe(box.value)">
    <button (click)="onClickMe(box.value)" [disabled]="!box.value.length>0">Enter</button>
    {{values}}

    `
})
export class Login{
    values = "";

    submitted = true;

    onClickMe(nombre : string){
            if(nombre.length>0){  //--- SE ACEPTA EL USUARIO
                this.values = nombre + "ENTER";
                this.submitted = true;
            }
     }
} 

// <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
//       <div class="form-group">
//         <label for="nombre">Usuario</label>
//         <input type="text" class="form-control" id="nombre" required
//         [(ngModel)]="model.nombre" nombre="nombre" #nombre="ngModel">
//       </div>
//       <button type="submit" class="btn btn-default" [disabled]="!loginForm.form.valid">Enter</button>
//     </form>   
//     {{mensaje}}