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
var crea_preguntas_data_1 = require("./crea_preguntas_data");
var question_dropdown_1 = require('./question-dropdown');
var question_textbox_1 = require('./question-textbox');
var question_service_1 = require("./question.service");
var data_class_1 = require("./data_class");
var CreaPreguntasComponent = (function () {
    function CreaPreguntasComponent(questionService, dataclass) {
        this.questionService = questionService;
        this.dataclass = dataclass;
        this.checkpreguntas = new core_1.EventEmitter();
        this.formavalid = false;
        this.arrayencuesta = [];
        var a = [new crea_preguntas_data_1.CreaPreguntasData("textbox")];
        //let a :  CreaPreguntasData[] = [];
        this.arraypreguntas = a;
    }
    CreaPreguntasComponent.prototype.ngDoCheck = function () {
        this.arraypreguntas = this.questionService.getViewQuestions();
        console.log("rapido:", this.arraypreguntas);
        if (this.arraypreguntas == null) {
            this.arraypreguntas = [new crea_preguntas_data_1.CreaPreguntasData("textbox")];
            this.questionService.loadViewQuestions(this.arraypreguntas);
        }
    };
    CreaPreguntasComponent.prototype.onSubmit = function () {
        var _this = this;
        this.checkpreguntas.emit(true);
        this.arraypreguntas.forEach(function (preg) {
            _this.transformaEncuesta(preg);
            console.log("Conversion ->", _this.arrayencuesta);
        });
        //----ojo dataclass
        //this.arrayencuesta = this.dataclass.getQuestions();
        this.questionService.loadQuestions(this.arrayencuesta);
        this.questionService.loadViewQuestions(this.arraypreguntas);
        console.log("cargo:", this.arrayencuesta);
    };
    CreaPreguntasComponent.prototype.transformaEncuesta = function (pregunta) {
        switch (pregunta.tipopregunta) {
            case "textbox":
                this.arrayencuesta.push(new question_textbox_1.TextboxQuestion({
                    key: pregunta.campo,
                    label: pregunta.textboxpregunta,
                    type: pregunta.textboxtipo,
                    value: pregunta.textboxvalor,
                    required: pregunta.textboxobligatorio,
                    order: 1
                }));
                break;
            case "dropDownList":
                this.arrayencuesta.push(new question_dropdown_1.DropdownQuestion({
                    key: pregunta.campo,
                    label: pregunta.ddlistpregunta,
                    options: this.transformaLista(pregunta.ddlistopciones),
                    order: 1
                }));
                break;
            default:
                break;
        }
    };
    CreaPreguntasComponent.prototype.transformaLista = function (texto) {
        var vect = [{ key: "---", value: "---" }];
        if (texto.length > 0) {
            var arreglo = texto.split("\n");
            arreglo.forEach(function (dat) { return vect.push({ key: dat, value: dat }); });
        }
        return vect;
    };
    CreaPreguntasComponent.prototype.nuevaPregunta = function () {
        this.checkpreguntas.emit(false);
        console.log("tamano:", this.arraypreguntas.push(new crea_preguntas_data_1.CreaPreguntasData("textbox")));
    };
    CreaPreguntasComponent.prototype.borrarPregunta = function (indice) {
        this.checkpreguntas.emit(false);
        //console.log("Indice:",indice);
        this.arraypreguntas.splice(indice, 1);
        //console.log("tamano:",this.arraypreguntas.length);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CreaPreguntasComponent.prototype, "checkpreguntas", void 0);
    CreaPreguntasComponent = __decorate([
        core_1.Component({
            selector: 'creapreguntas',
            templateUrl: "app/dynamic_forms/crea_preguntas.html",
            providers: [data_class_1.DataClass]
        }), 
        __metadata('design:paramtypes', [question_service_1.QuestionService, data_class_1.DataClass])
    ], CreaPreguntasComponent);
    return CreaPreguntasComponent;
}());
exports.CreaPreguntasComponent = CreaPreguntasComponent;
//# sourceMappingURL=crea_preguntas.component.js.map