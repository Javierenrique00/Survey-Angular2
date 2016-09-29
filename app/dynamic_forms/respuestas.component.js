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
var storage_service_1 = require("../storage.service");
var auth_service_1 = require("../auth.service");
var RespuestasComponent = (function () {
    function RespuestasComponent(storageService, authservice) {
        this.storageService = storageService;
        this.authservice = authservice;
        this.usuario_actual = "";
        this.selencuesta = null;
        this.tablehead = [];
        this.tablecontent = [];
        this.totalglobal = 0;
        this.audiencia = 0;
        this.vusuarios = [];
        this.emails = "";
        this.datacsv = "";
        this.exportdata = false;
        this.togleaudiencia = false;
    }
    RespuestasComponent.prototype.ngOnInit = function () {
        this.usuario_actual = this.authservice.user_logueado;
        this.encuestas = this.storageService.readEncuestasByUser(this.usuario_actual);
        this.exportdata = false;
    };
    RespuestasComponent.prototype.trae_encuesta = function (id, nombre_encuesta) {
        var _this = this;
        this.exportdata = false;
        var valores;
        var fila = 0;
        this.tablehead = [];
        this.tablecontent = [];
        //---lee la encuesta
        this.storageService.readEncuestasById(id).subscribe(function (result) {
            if (result != null) {
                _this.selencuesta = result;
            }
        }, function (err) { return console.log("error:", err); }, function () { return console.log("complete"); });
        //--- lee los usuarios que estan en la audiencia de la encuesta despues de 1 segundo
        this.emails = "";
        setTimeout(function () {
            _this.storageService.readUsersForGroups(_this.selencuesta.audiencia).subscribe(function (out) {
                _this.vusuarios = out;
                _this.vusuarios.forEach(function (dat) { return _this.emails += dat + ","; });
            }, function (err) { return console.log("error:", err); }, function () { return console.log("complete:"); });
        }, 1000);
        //--leen las respuestas a la encuesta de todos los usuarios.
        this.storageService.readRespuestasByEncuesta(nombre_encuesta).subscribe(function (result) {
            _this.resultados = result;
            _this.resultados.forEach(function (dat) {
                //console.log("datos->",dat.value);
                valores = JSON.stringify(dat.value);
                //console.log("string->",valores);
                _this.conversionToArreglo(valores, fila, dat.email, dat.usuario);
                fila = fila + 1;
            });
        }, function (err) { return console.log("error:", err); }, function () { console.log("complete"); _this.audiencia = fila; });
    };
    RespuestasComponent.prototype.conversionToArreglo = function (entrada, fila, email, usuario) {
        var _this = this;
        //--crea una fila nueva
        var nuevafila = [];
        //-- le agrega el usuario y el email
        if (fila == 0) {
            this.tablehead.push("Email");
            this.tablehead.push("Usuario");
        }
        nuevafila.push(email);
        nuevafila.push(usuario);
        //--quita los corchetes y la primera y ultima comilla
        var temp1 = entrada.slice(2, -2);
        //--crea el vector dividiendo con el separador ","
        var arreglo = temp1.split('","');
        arreglo.forEach(function (column) {
            //console.log("Columna",column);
            //--- ahora cada uno lo separa entre el de la derecha(propiedad) y el de la izquierda (valor)
            var campo = column.split('":"');
            //console.log("campo:",campo[0]+"|",campo[1]);
            if (fila == 0) {
                _this.tablehead.push(campo[0]);
            }
            nuevafila.push(campo[1]);
        });
        this.tablecontent.push(nuevafila);
    };
    RespuestasComponent.prototype.export_csv = function () {
        var _this = this;
        this.exportdata = !this.exportdata;
        if (this.exportdata) {
            this.datacsv = "";
            this.tablehead.forEach(function (col) { return _this.datacsv += col + ","; });
            this.datacsv += "\n";
            this.tablecontent.forEach(function (fila) {
                fila.forEach(function (col) { return _this.datacsv += col + ","; });
                _this.datacsv += "\n";
            });
        }
    };
    RespuestasComponent.prototype.toggle_audiencia = function () {
        this.togleaudiencia = !this.togleaudiencia;
    };
    RespuestasComponent = __decorate([
        core_1.Component({
            selector: 'respuestascomponent',
            templateUrl: "app/dynamic_forms/respuestas.component.html"
        }), 
        __metadata('design:paramtypes', [storage_service_1.StorageService, auth_service_1.AuthService])
    ], RespuestasComponent);
    return RespuestasComponent;
}());
exports.RespuestasComponent = RespuestasComponent;
//# sourceMappingURL=respuestas.component.js.map