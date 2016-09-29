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
var RegistroService = (function () {
    function RegistroService(authservice) {
        this.authservice = authservice;
        this.horizon = Horizon();
        this.collection = this.horizon("usuarios");
    }
    RegistroService.prototype.insertUserDb = function (usuario) {
        var _this = this;
        var existeDoc = false;
        usuario.uid = "";
        //-- Consulta si el documento esta en la DB
        this.collection.find({
            nombre: usuario.nombre.toLowerCase()
        }).fetch().subscribe(function (result) {
            console.log('Result:', result);
            if (result != null) {
                existeDoc = true;
                usuario.uid = result.id;
            }
        }, function (err) { return console.error(err); }, function () {
            if (!existeDoc) {
                usuario.id = "USER/" + usuario.nombre.toLocaleLowerCase() + "/";
                usuario.nombre = usuario.nombre.toLocaleLowerCase();
                usuario.state = "free";
                usuario.datetime = Date.parse(Date());
                usuario.salt = _this.authservice.genRandomSalt(30);
                usuario.pwd = _this.authservice.genSha256(usuario.pwd + usuario.salt);
                _this.writeUserDb(usuario);
                console.log('Resulados escritos');
            }
        });
    };
    RegistroService.prototype.writeUserDb = function (usuario) {
        this.collection.store(
        // "{"+JSON.stringify(usuario).substring(13)        
        JSON.stringify(usuario));
    };
    RegistroService.prototype.readUserByNombre = function (idsearch) {
        return this.collection.find({ nombre: idsearch.toLowerCase() }).fetch();
    };
    RegistroService.prototype.createSession = function () {
        //this.horizon
    };
    RegistroService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [auth_service_1.AuthService])
    ], RegistroService);
    return RegistroService;
}());
exports.RegistroService = RegistroService;
//# sourceMappingURL=registro.service.js.map