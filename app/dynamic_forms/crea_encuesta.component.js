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
var encuesta_1 = require("./encuesta");
var question_service_1 = require("./question.service");
var auth_service_1 = require("../auth.service");
var email_data_1 = require("../email.data");
var link_data_1 = require("./link.data");
//import { CreaPreguntasComponent } from "./crea_preguntas.component";
//directives: [SelAudienciaRender], parece que lo quitaron o hay que cambiar como embeber el componente de selecciona_audiencia.render
var CreaEncuestaComponent = (function () {
    function CreaEncuestaComponent(authservice, storageService, questionService) {
        this.authservice = authservice;
        this.storageService = storageService;
        this.questionService = questionService;
        this.revisaSession = false;
        this.session = false;
        this.nuevaEncuesta = false;
        this.newEncuesta = new encuesta_1.Encuesta("", "", "", 0, 0, 0, 0, 0, 0);
        this.listaInicial = true;
        this.usuario_actual = "";
        this.okpreguntas = false;
        this.disable_edit = false;
        this.usuario_actual = authservice.user_logueado;
    }
    CreaEncuestaComponent.prototype.ngDoCheck = function () {
        if (this.listaInicial) {
            this.encuestas = this.storageService.readEncuestasByUser(this.usuario_actual);
            this.listaInicial = false;
        }
    };
    CreaEncuestaComponent.prototype.onSubmit = function () {
        if (this.newEncuesta.id == "")
            this.newEncuesta.id = "ENCUESTA/" + this.usuario_actual + "/" + Date.parse(Date()).toString();
        this.newEncuesta.username = this.usuario_actual;
        this.newEncuesta.questions = this.questionService.getQuestions(); //-- Trae las preguntas
        this.newEncuesta.questionsview = this.questionService.getViewQuestions();
        console.log("--- vemos si tiene las preguntas ---:", this.newEncuesta.questionsview);
        //--guarda la encuesta con su audiencia en una tabla especial
        this.storageService.writeEncuesta(this.newEncuesta);
        this.storageService.editAudienciaGroup(this.newEncuesta.nombre, this.newEncuesta.audiencia);
        this.nuevaEncuesta = false;
        this.encuestas = this.storageService.readEncuestasByUser(this.usuario_actual);
    };
    CreaEncuestaComponent.prototype.editaEncuesta = function (id) {
        // console.log("Edit:",id);
        //-- trae la encuesta
        var _this = this;
        this.storageService.readEncuestasById(id).subscribe(function (result) {
            if (result != null) {
                _this.newEncuesta = result;
                _this.questionService.loadQuestions(result.questions);
                //---Carga los datos visuales de la encuesta !!!
                _this.questionService.loadViewQuestions(result.questionsview);
                console.log("--Cargan datos al servicio:", result.questionsview);
            }
        }, function (err) { return console.log("error:", err); }, function () { return console.log("complete"); });
        this.nuevaEncuesta = true; //--habilita el formulario
        this.disable_edit = true; //--deshabilita el campo de edicion de encuestas.      
        //this.encuestas = this.storageService.readEncuestasByUser(this.userSession.username);
    };
    CreaEncuestaComponent.prototype.deleteEncuesta = function (id, nombreencuesta) {
        //console.log("Delete:",id);
        this.storageService.deleteEncuesta(id);
        //---borrar los grupos de audiencia asociados a la encuesta.
        this.storageService.deleteAudienciaEncuesta(nombreencuesta);
        this.encuestas = this.storageService.readEncuestasByUser(this.usuario_actual);
    };
    CreaEncuestaComponent.prototype.creaEncuesta = function () {
        this.nuevaEncuesta = true;
        this.disable_edit = false;
        this.newEncuesta.id = "";
        this.newEncuesta.nombre = "";
        //--inicializa la carga los datos visuales
        this.questionService.newViewQuestion();
    };
    CreaEncuestaComponent.prototype.copiaAudiencia = function (audiencia) {
        this.newEncuesta.audiencia = audiencia;
    };
    CreaEncuestaComponent.prototype.checkPreguntas = function (estado) {
        this.okpreguntas = estado;
    };
    CreaEncuestaComponent.prototype.enviarEncuesta = function (id, shortdescription, encuesta) {
        var _this = this;
        this.storageService.readUsersForEncuesta(id).subscribe(function (out) {
            out.forEach(function (user) {
                var fecha = Date.parse(Date());
                var salt = _this.authservice.genRandomSalt(25);
                var codigo = fecha.toString() + salt;
                var link = new link_data_1.Link(codigo, "http://localhost:8181/#/page1/" + codigo, user.email, encuesta, salt, _this.authservice.genSha256(codigo), fecha, user.iduser);
                //console.log("usuario:",user.iduser);
                _this.storageService.writeNewLink(link);
                _this.storageService.sendEmailDirect(new email_data_1.Email(_this.usuario_actual, "encuesta@superencuestas.com", user.email, "Encuesta: " + shortdescription, "Por favor Conteste la encuesta en el siguiente link ---->\n" + link.link));
            });
        }, function (err) { return console.log("error:", err); }, function () { });
    };
    CreaEncuestaComponent = __decorate([
        core_1.Component({
            selector: 'creaencuesta',
            templateUrl: "app/dynamic_forms/crea_encuesta.html",
            providers: [question_service_1.QuestionService]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, storage_service_1.StorageService, question_service_1.QuestionService])
    ], CreaEncuestaComponent);
    return CreaEncuestaComponent;
}());
exports.CreaEncuestaComponent = CreaEncuestaComponent;
//# sourceMappingURL=crea_encuesta.component.js.map