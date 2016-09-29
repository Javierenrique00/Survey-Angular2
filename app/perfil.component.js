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
var auth_service_1 = require("./auth.service");
var email_data_1 = require("./email.data");
var router_1 = require("@angular/router");
var Perfil = (function () {
    function Perfil(storageservice, authservice, router) {
        this.storageservice = storageservice;
        this.authservice = authservice;
        this.router = router;
        this.username = "";
        this.userdata = { email: "", firstname: "", lastname: "", nacimiento: "", id: "", pwd: "", salt: "" };
        this.disableemail = true;
        this.checkcode = false;
        this.disablecheckcode = false;
        this.codigoemail = "";
        this.codigoin = "";
        this.msgverificaemail = false;
        this.changepassword = false;
        this.antpwd = "";
        this.newpwd1 = "";
        this.newpwd2 = "";
        this.msgnewpwdnotequal = false;
        this.msgoldpwdnotequal = false;
        this.msgpasswordchange = false;
        this.pwdintentos = 0;
        this.username = authservice.user_logueado;
    }
    Perfil.prototype.ngOnInit = function () {
        var _this = this;
        this.storageservice.readUserByUsername(this.username).subscribe(function (data) { return _this.userdata = data; }, function (err) { return console.log("Error:", err); }, function () { });
    };
    Perfil.prototype.onSubmit = function () {
        this.storageservice.writeUserByObject({
            id: this.userdata.id,
            firstname: this.userdata.firstname,
            lastname: this.userdata.lastname,
            nacimiento: this.userdata.nacimiento
        });
    };
    Perfil.prototype.editaEmail = function () {
        this.disableemail = false;
        this.checkcode = true;
    };
    Perfil.prototype.checkCode = function () {
        this.disableemail = true;
        this.disablecheckcode = true;
        this.activaVerificacionEmail();
    };
    Perfil.prototype.verificaCode = function () {
        if (this.codigoin == this.codigoemail) {
            //--- Escribe el nuevo email a la base de datos
            this.msgverificaemail = false;
            this.disableemail = true;
            this.checkcode = false;
            this.disablecheckcode = false;
            this.storageservice.writeUserByObject({
                id: this.userdata.id,
                email: this.userdata.email
            });
        }
        else
            this.msgverificaemail = true;
    };
    Perfil.prototype.activaVerificacionEmail = function () {
        //-- Genera un string aleatorio de 4 cifras y envia el email
        var code = "";
        code = this.genera() + this.genera() + this.genera() + this.genera();
        var email = new email_data_1.Email("EXISTING_USER", "verify@encuestasinteligentes.com", this.userdata.email, "Código de verificación", "Buenos días,\nPara modificar su email es necesario ingresar el código:\n"
            + code);
        this.storageservice.sendEmailDirect(email);
        this.codigoemail = code;
    };
    Perfil.prototype.genera = function () {
        return Math.floor((Math.random() * 10)).toString();
    };
    Perfil.prototype.clickchangepassword = function () {
        this.changepassword = true;
    };
    Perfil.prototype.cambioPassword = function () {
        var _this = this;
        if (this.authservice.genSha256(this.antpwd + this.userdata.salt) == this.userdata.pwd) {
            if (this.newpwd1 == this.newpwd2) {
                //-- Contrasenas nuevas son iguales
                this.storageservice.writeUserByObject({ id: this.userdata.id, pwd: this.authservice.genSha256(this.newpwd1 + this.userdata.salt) });
                this.msgnewpwdnotequal = false;
                this.msgoldpwdnotequal = false;
                this.msgpasswordchange = true;
                setTimeout(function () { _this.msgpasswordchange = false; _this.changepassword = false; }, 5000);
                this.pwdintentos = 0;
            }
            else {
                //--- Contrasena nueva no es igual
                this.msgnewpwdnotequal = true;
                setTimeout(function () { _this.msgnewpwdnotequal = false; }, 5000);
            }
        }
        else {
            //---pwd anterior no corresponde
            this.msgoldpwdnotequal = true;
            setTimeout(function () { _this.msgoldpwdnotequal = false; }, 5000);
            this.pwdintentos += 1;
            if (this.pwdintentos > 3) {
                //--- Hay que sacarlo de la pagina
                this.authservice.logout();
                this.router.navigate(["/login"]);
            }
        }
    };
    Perfil = __decorate([
        core_1.Component({
            selector: 'perfil',
            templateUrl: "app/perfil.component.html",
        }), 
        __metadata('design:paramtypes', [storage_service_1.StorageService, auth_service_1.AuthService, router_1.Router])
    ], Perfil);
    return Perfil;
}());
exports.Perfil = Perfil;
//# sourceMappingURL=perfil.component.js.map