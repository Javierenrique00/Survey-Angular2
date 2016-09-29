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
var SelAudienciaRender = (function () {
    function SelAudienciaRender(storageservice) {
        this.storageservice = storageservice;
        this.copiaaudiencia = new core_1.EventEmitter();
        this.grupos = [];
        this.escogidos = [];
        this.salida = [];
        this.vsalida = [];
    }
    SelAudienciaRender.prototype.ngOnInit = function () {
        var _this = this;
        this.storageservice.readGroupByOwner(this.usuario).subscribe(function (data) {
            _this.grupos = data;
        }, function (err) { }, function () { });
    };
    SelAudienciaRender.prototype.addGroup = function () {
        var _this = this;
        this.escogidos = [];
        this.audiencia = [];
        this.salida.forEach(function (item) {
            var indice;
            indice = Number(item);
            _this.escogidos.push(_this.grupos[indice]);
            _this.audiencia.push(_this.grupos[indice].nombregruposingle);
        });
        this.copiaaudiencia.emit(this.audiencia);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SelAudienciaRender.prototype, "audiencia", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SelAudienciaRender.prototype, "usuario", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SelAudienciaRender.prototype, "copiaaudiencia", void 0);
    SelAudienciaRender = __decorate([
        core_1.Component({
            selector: 'sel-audiencia-render',
            templateUrl: "app/dynamic_forms/selecciona_audiencia.html"
        }), 
        __metadata('design:paramtypes', [storage_service_1.StorageService])
    ], SelAudienciaRender);
    return SelAudienciaRender;
}());
exports.SelAudienciaRender = SelAudienciaRender;
//# sourceMappingURL=selecciona_audiencia.render.js.map