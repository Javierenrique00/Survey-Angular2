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
var LogoutComponent = (function () {
    function LogoutComponent(authservice) {
        authservice.logout();
    }
    LogoutComponent = __decorate([
        core_1.Component({
            selector: 'logout',
            template: "<h2>Logout</h2>\n    <p> Este es un site de encuestas din\u00E1micas.</p>\n    <p> Se ha deslogueado de la session de manera segura.</p>\n    <p> Si debe volver a entrar debe hacer <b>login de nuevo. </b></p>\n    \n    "
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService])
    ], LogoutComponent);
    return LogoutComponent;
}());
exports.LogoutComponent = LogoutComponent;
//# sourceMappingURL=logout.component.js.map