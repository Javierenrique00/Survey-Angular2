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
var storage_service_1 = require("./storage.service");
var consulta_session_service_1 = require("./consulta_session.service");
var session_1 = require("./session");
var AuthService = (function () {
    function AuthService(storageService, consultasessionservice) {
        this.storageService = storageService;
        this.consultasessionservice = consultasessionservice;
        this.id_logueado = "";
        this.user_logueado = "";
        this.esta_logueado = false;
        this.email_logueado = "";
        this.chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz1234567890";
    }
    AuthService.prototype.genRandomSalt = function (size) {
        var tama = this.chars.length;
        var salida = "";
        for (var x = 0; x < size; x++) {
            var index = Math.floor((Math.random() * tama));
            salida += this.chars.substring(index, index + 1);
        }
        return salida;
    };
    AuthService.prototype.genSha256 = function (datain) {
        return sha256(datain);
    };
    AuthService.prototype.login = function (username, email) {
        var session = new session_1.Session("SESSION/" + username + "/", username, Date.parse(Date()), email);
        this.storageService.creaSession(session);
        //--crea las cookie en el almacenamiento local
        this.consultasessionservice.creaSession(session.id, session.datetime);
        this.id_logueado = session.id;
        this.user_logueado = session.username;
        this.email_logueado = session.email;
        this.esta_logueado = true;
    };
    ;
    AuthService.prototype.logout = function () {
        var id;
        // Remove token from localStorage
        this.consultasessionservice.deleteSession();
        this.storageService.removeSessionById(this.id_logueado);
        this.id_logueado = "";
        this.user_logueado = "";
        this.email_logueado = "";
        this.esta_logueado = false;
    };
    ;
    AuthService.prototype.checkAutenticado = function () {
        var _this = this;
        var id;
        id = this.consultasessionservice.checkUserLogin();
        this.storageService.readSessionById(id).subscribe(function (result) {
            if (result.id == id) {
                //---El ID de la session coincide con el ID de la Cookie
                _this.id_logueado = result.id;
                _this.user_logueado = result.username;
                _this.email_logueado = result.email;
                _this.esta_logueado = true;
            }
            else {
                //-- No esta logueado porque no coincide la cookie con la session
                _this.id_logueado = "";
                _this.user_logueado = "";
                _this.email_logueado = "";
                _this.esta_logueado = false;
            }
        }, function (error) {
            console.log("Error", error);
        }, function () { });
    };
    AuthService = __decorate([
        //--libreria sha256 de javascript
        core_1.Injectable(), 
        __metadata('design:paramtypes', [storage_service_1.StorageService, consulta_session_service_1.ConsultaSessionService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map