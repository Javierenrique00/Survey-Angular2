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
var question_control_service_1 = require('./question-control.service');
var storage_service_1 = require("../storage.service");
var respuesta_storage_1 = require('./respuesta-storage');
var DynamicFormComponent = (function () {
    function DynamicFormComponent(qcs, storageservice) {
        this.qcs = qcs;
        this.storageservice = storageservice;
        this.questions = [];
        this.onrespuesta = new core_1.EventEmitter();
        this.payLoad = '';
    }
    DynamicFormComponent.prototype.ngOnInit = function () {
        this.form = this.qcs.toFormGroup(this.questions);
        this.payLoad = "";
    };
    DynamicFormComponent.prototype.ngOnChanges = function () {
        this.form = this.qcs.toFormGroup(this.questions);
        this.payLoad = "";
    };
    DynamicFormComponent.prototype.onSubmit = function () {
        this.cargadb = new respuesta_storage_1.RespuestaStorage("RESPUESTA/" + this.encuesta_res + "/" + this.email_res, this.usuario_res, this.email_res, this.encuesta_res, this.form.value);
        this.payLoad = JSON.stringify(this.cargadb);
        this.storageservice.almacenaEncuestaContestada(this.cargadb);
        this.onrespuesta.emit(this.encuesta_res);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DynamicFormComponent.prototype, "questions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DynamicFormComponent.prototype, "usuario_res", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DynamicFormComponent.prototype, "encuesta_res", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DynamicFormComponent.prototype, "email_res", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DynamicFormComponent.prototype, "shortdescription", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DynamicFormComponent.prototype, "onrespuesta", void 0);
    DynamicFormComponent = __decorate([
        core_1.Component({
            selector: 'dynamic-form',
            templateUrl: 'app/dynamic_forms/dynamic-form.component.html',
            providers: [question_control_service_1.QuestionControlService]
        }), 
        __metadata('design:paramtypes', [question_control_service_1.QuestionControlService, storage_service_1.StorageService])
    ], DynamicFormComponent);
    return DynamicFormComponent;
}());
exports.DynamicFormComponent = DynamicFormComponent;
//# sourceMappingURL=dynamic-form.component.js.map