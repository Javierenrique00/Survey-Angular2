"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Login = (function () {
    function Login() {
        this.values = "";
        this.submitted = true;
    }
    Login.prototype.onClickMe = function (nombre) {
        if (nombre.length > 0) {
            this.values = nombre + "ENTER";
            this.submitted = true;
        }
    };
    Login = __decorate([
        core_1.Component({
            selector: 'login',
            template: "\n    <h2>Login</h2>\n    <label for=\"nombre\">Usuario</label>\n    <input type=\"text\" id=\"nombre\" #box (keyup)=\"values=box.value\" (keyup.enter)=\"onClickMe(box.value)\">\n    <button (click)=\"onClickMe(box.value)\" [disabled]=\"!box.value.length>0\">Enter</button>\n    {{values}}\n\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], Login);
    return Login;
}());
exports.Login = Login;
// <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
//       <div class="form-group">
//         <label for="nombre">Usuario</label>
//         <input type="text" class="form-control" id="nombre" required
//         [(ngModel)]="model.nombre" nombre="nombre" #nombre="ngModel">
//       </div>
//       <button type="submit" class="btn btn-default" [disabled]="!loginForm.form.valid">Enter</button>
//     </form>   
//     {{mensaje}} 
//# sourceMappingURL=login.component.1.js.map