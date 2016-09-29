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
var usuario_1 = require("./usuario");
var session_1 = require("./session");
var auth_service_1 = require("./auth.service");
var router_1 = require("@angular/router");
var LoginService = (function () {
    function LoginService(authservice, router) {
        this.authservice = authservice;
        this.router = router;
        this.horizon = Horizon();
        this.collection = this.horizon("usuarios");
        this.collection_session = this.horizon("session");
    }
    LoginService.prototype.getUserUid = function (usuario, nopasa) {
        var _this = this;
        var usuarioDb = new usuario_1.Usuario("", "", "", "");
        usuario.uid = "";
        //-- Consulta si el documento esta en la DB
        this.collection.find({
            nombre: usuario.nombre.toLocaleLowerCase()
        }).fetch().subscribe(function (result) {
            //console.log('Result:', result)
            usuarioDb.id = result.id;
            usuarioDb.nombre = result.nombre;
            usuarioDb.uid = result.id;
            usuarioDb.state = result.state;
            usuarioDb.datetime = result.datetime;
            usuarioDb.pwd = result.pwd;
            usuarioDb.email = result.email;
            usuarioDb.salt = result.salt;
            //--Mira si se puede desbloquear
            if (usuarioDb.state == "block") {
                usuario.state = "block";
                var ahora = Date.parse(Date());
                if (ahora - usuarioDb.datetime > 120000) {
                    usuarioDb.state = "free";
                    _this.freeUserid(usuarioDb);
                    usuario.state = "free";
                }
            }
            if (usuarioDb.state == "free") {
                if (usuarioDb.pwd != _this.authservice.genSha256(usuario.pwd + usuarioDb.salt)) {
                    if (nopasa > 3) {
                        usuarioDb.state = "block";
                        usuario.state = "block";
                        usuarioDb.datetime = Date.parse(Date());
                        _this.blockUserid(usuarioDb);
                    }
                }
                else {
                    //usuario.uid = usuarioDb.uid;
                    usuario.uid = "SON-IGUALES";
                    //--- Crea la session en la DataBase
                    _this.organizaDatosSession(usuarioDb);
                }
            }
        }, function (err) { return console.error(err); }, function () { return console.log('Results fetched'); });
    };
    LoginService.prototype.blockUserid = function (usuarioDb) {
        this.collection.store(JSON.stringify(usuarioDb));
    };
    LoginService.prototype.freeUserid = function (usuarioDb) {
        this.collection.store(JSON.stringify(usuarioDb));
    };
    //captura los datos de la session
    LoginService.prototype.organizaDatosSession = function (usuarioDb) {
        var session = new session_1.Session("SESSION/" + usuarioDb.nombre + "/", usuarioDb.nombre, Date.parse(Date()), usuarioDb.email);
        //console.log('Transforma_session:', JSON.stringify(usuarioDb))
        //this.creaSession(session);
        // this.storageservice.creaSession(session);
        // this.creaCookieSession(session);
        this.authservice.login(usuarioDb.nombre, usuarioDb.email);
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map