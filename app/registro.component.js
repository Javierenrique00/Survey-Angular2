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
var registro_service_1 = require("./registro.service");
require('rxjs/add/operator/catch');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/switchMap');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var Subject_1 = require('rxjs/Subject');
var email_data_1 = require("./email.data");
var storage_service_1 = require("./storage.service");
var Registro = (function () {
    function Registro(router, registroservice, storageservice) {
        var _this = this;
        this.router = router;
        this.registroservice = registroservice;
        this.storageservice = storageservice;
        this.usuario = new usuario_1.Usuario("", "", "", "");
        this.rpwd = "";
        this.iguales = true;
        this.duplicados = false;
        this.boton = false;
        this.patternNombre = "^[0-9A-Za-z]+$";
        this.patternPWD = "(?=^.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])";
        this.codigo = "";
        this.codigoemail = "";
        this.activacode = false;
        this.intentos = 0;
        this.codigook = false;
        this.msgerrorcode = false;
        this.msgblock = false;
        this.searchTermStream = new Subject_1.Subject();
        this.items = this.searchTermStream.debounceTime(300).
            distinctUntilChanged().
            switchMap(function (term) { return _this.registroservice.readUserByNombre(term); });
    }
    Registro.prototype.ngDoCheck = function () {
        this.strVerifica();
        if (this.usuario.state == "free") {
            this.router.navigate(["/page2"]);
        }
        else {
            if (this.boton)
                this.duplicados = true;
        }
        if (this.rpwd == this.usuario.pwd) {
            this.iguales = true;
        }
    };
    Registro.prototype.onSubmit = function () {
        if (this.rpwd == this.usuario.pwd) {
            this.iguales = true;
            this.activaVerificacionEmail();
            this.activacode = true;
        }
        else {
            this.iguales = false;
        }
    };
    //--- Solo son validos letras y numeros y debe ser menor a 18 Characteres sin espacios 
    Registro.prototype.strVerifica = function () {
        var _this = this;
        this.searchTermStream.next(this.usuario.nombre);
        this.items.subscribe(function (result) {
            if (result == null) {
                _this.duplicados = false;
            }
            else {
                _this.duplicados = true;
            }
        }, function (err) { return console.log("error:", err); });
        if (this.usuario.nombre.match(this.patternNombre)) {
            return true;
        }
        else {
            return false;
        }
    };
    Registro.prototype.pwdVerifica = function () {
        if (this.usuario.pwd.match(this.patternPWD)) {
            return true;
        }
        else {
            return false;
        }
    };
    Registro.prototype.activaVerificacionEmail = function () {
        //-- Genera un string aleatorio de 4 cifras y envia el email
        var code = "";
        code = this.genera() + this.genera() + this.genera() + this.genera();
        var email = new email_data_1.Email("NEW_USER", "verify@encuestasinteligentes.com", this.usuario.email, "Código de verificación", "Buenos días,\nPara terminar su registro, por favor ingrese el siguiente código:\n"
            + code);
        this.storageservice.sendEmailDirect(email);
        this.codigoemail = code;
    };
    //-- Genera un digito string de 0-9 
    Registro.prototype.genera = function () {
        return Math.floor((Math.random() * 10)).toString();
    };
    Registro.prototype.verificaCodigo = function () {
        var _this = this;
        if (this.codigoemail == this.codigo) {
            //---codigo verificado
            this.codigook = true;
            this.registroservice.insertUserDb(this.usuario);
            this.boton = true;
        }
        else {
            this.intentos = this.intentos + 1;
            console.log("intentos:", this.intentos);
            if (this.intentos > 2) {
                this.boton = false;
                this.msgerrorcode = false;
                this.intentos = 0;
                this.duplicados = false;
                this.msgblock = true;
                setTimeout(function () { _this.activacode = false; _this.msgblock = false; }, 5000);
            }
            else {
                this.msgerrorcode = true;
            }
        }
    };
    Registro = __decorate([
        //--libreria sha256 de javascript
        core_1.Component({
            selector: 'registro',
            templateUrl: "app/registro.component.html",
            providers: [registro_service_1.RegistroService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, registro_service_1.RegistroService, storage_service_1.StorageService])
    ], Registro);
    return Registro;
}());
exports.Registro = Registro;
//# sourceMappingURL=registro.component.js.map