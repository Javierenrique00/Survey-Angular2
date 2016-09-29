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
var usuario_1 = require('./usuario');
var router_1 = require("@angular/router");
var login_service_1 = require("./login.service");
var Login = (function () {
    function Login(router, loginservice) {
        this.router = router;
        this.loginservice = loginservice;
        this.usuario = new usuario_1.Usuario("", "", "", "");
        this.nopasa = 0;
        this.checking = false;
    }
    Login.prototype.ngDoCheck = function () {
        if (this.usuario.uid.length > 3) {
            this.gotoLogin();
        }
    };
    Login.prototype.onSubmit = function () {
        var _this = this;
        this.checking = true;
        this.loginservice.getUserUid(this.usuario, this.nopasa);
        this.nopasa = this.nopasa + 1;
        setTimeout(function () { _this.checking = false; }, 500);
    };
    ;
    Login.prototype.gotoLogin = function () {
        this.router.navigate(["/page2"]);
    };
    Object.defineProperty(Login.prototype, "diagnostic", {
        get: function () { return JSON.stringify(this.usuario); } //-> para ver con {{diagnostic}}
        ,
        enumerable: true,
        configurable: true
    });
    Login = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: "app/login.component.html",
            providers: [login_service_1.LoginService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, login_service_1.LoginService])
    ], Login);
    return Login;
}());
exports.Login = Login;
//# sourceMappingURL=login.component.js.map