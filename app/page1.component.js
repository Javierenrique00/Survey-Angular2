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
var data_class_1 = require("./dynamic_forms/data_class");
var auth_service_1 = require("./auth.service");
var router_1 = require("@angular/router");
var link_data_1 = require("./dynamic_forms/link.data");
var Page1 = (function () {
    function Page1(storageservice, dataclass, authservice, route) {
        this.storageservice = storageservice;
        this.dataclass = dataclass;
        this.authservice = authservice;
        this.route = route;
        this.hay_encuesta = false;
        this.usuario = "";
        this.encuesta_actual = "";
        this.email_actual = "";
        this.respuestas = [];
        this.resp_encuesta = [];
        this.resp_id = [];
        this.shortdescription = "";
        this.externo = false;
        this.link = new link_data_1.Link("", "", "", "", "", "", 0, "");
        this.cargaLink();
    }
    Page1.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.externo) {
                _this.email_actual = _this.link.email;
                _this.usuario = _this.link.usuario;
            }
            else {
                _this.email_actual = _this.authservice.email_logueado;
                _this.usuario = _this.authservice.user_logueado;
            }
            _this.encuestas = _this.storageservice.readEncuestasForUserEmail(_this.email_actual);
            _this.revisaRespuestas();
        }, 1000);
    };
    Page1.prototype.cargaLink = function () {
        var _this = this;
        var parametros = this.route.snapshot.params;
        try {
            if (parametros.id != undefined) {
                this.externo = true;
                ;
                //console.log("Parametro verificado con ID:",this.externo_data);
                this.storageservice.readLinkById(parametros.id).subscribe(function (data) {
                    _this.link = data;
                    console.log("LeeLink:", data);
                }, function (err) { return console.log("Error:", err); }, function () { });
            }
        }
        catch (err) {
            console.log("Error", err);
        }
    };
    Page1.prototype.trae_encuesta = function (id) {
        var _this = this;
        this.storageservice.readEncuestasById(id).subscribe(function (data) {
            if (data != null) {
                _this.preguntas = data.questions;
                _this.encuesta_actual = data.nombre;
                _this.shortdescription = data.shortdescription;
                _this.hay_encuesta = true;
            }
        }, function (err) { return console.log("error:", err); }, function () { return console.log("Loaded OK"); });
    };
    Page1.prototype.revisaRespuestas = function () {
        var _this = this;
        this.resp_encuesta = [];
        this.resp_id = [];
        //---revisa que encuestas ya se contestaron
        this.storageservice.readRespuestasByEmail(this.email_actual).subscribe(function (data) {
            _this.respuestas = data;
            data.forEach(function (a) {
                _this.resp_encuesta.push(a.encuesta);
                _this.resp_id.push(a.id);
                //console.log("respuestas:",a.id);
            });
        }, function (err) { return console.log("error:", err); }, function () { });
    };
    Page1.prototype.onRespuesta = function (encuesta) {
        this.revisaRespuestas();
    };
    Page1.prototype.eliminaRespuesta = function (id) {
        var _this = this;
        this.hay_encuesta = false;
        this.storageservice.deleteRespuestasById(this.resp_id[id]);
        setTimeout(function () { _this.revisaRespuestas(); }, 100);
    };
    Page1 = __decorate([
        core_1.Component({
            selector: 'page1',
            templateUrl: "app/page1.component.html",
            providers: [data_class_1.DataClass]
        }), 
        __metadata('design:paramtypes', [storage_service_1.StorageService, data_class_1.DataClass, auth_service_1.AuthService, router_1.ActivatedRoute])
    ], Page1);
    return Page1;
}());
exports.Page1 = Page1;
//# sourceMappingURL=page1.component.js.map