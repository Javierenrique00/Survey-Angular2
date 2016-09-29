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
var auth_service_1 = require("./auth.service");
var AppComponent = (function () {
    function AppComponent(authservice) {
        this.authservice = authservice;
        this.id_logueado = "";
        this.user_logueado = "";
        this.esta_logueado = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.authservice.checkAutenticado();
    };
    AppComponent.prototype.ngOnChanges = function () {
        this.authservice.checkAutenticado();
    };
    AppComponent.prototype.ngDoCheck = function () {
        this.esta_logueado = this.authservice.esta_logueado;
        this.user_logueado = this.authservice.user_logueado;
        this.id_logueado = this.authservice.id_logueado;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: "app/app.component.html"
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map