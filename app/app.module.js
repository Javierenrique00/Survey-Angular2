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
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var forms_1 = require('@angular/forms');
var forms_2 = require('@angular/forms');
var app_routing_1 = require("./app.routing");
var login_component_1 = require('./login.component');
var registro_component_1 = require('./registro.component');
var page1_component_1 = require('./page1.component');
var page2_component_1 = require('./page2.component');
var perfil_component_1 = require('./perfil.component');
var logout_component_1 = require('./logout.component');
var crea_encuesta_component_1 = require("./dynamic_forms/crea_encuesta.component");
var crea_preguntas_component_1 = require("./dynamic_forms/crea_preguntas.component");
var respuestas_component_1 = require("./dynamic_forms/respuestas.component");
var dynamic_form_component_1 = require('./dynamic_forms/dynamic-form.component');
var dynamic_form_question_component_1 = require('./dynamic_forms/dynamic-form-question.component');
var user_group_component_1 = require('./dynamic_forms/user_group.component');
var auth_service_1 = require("./auth.service");
var storage_service_1 = require("./storage.service");
var consulta_session_service_1 = require("./consulta_session.service");
var selecciona_audiencia_render_1 = require("./dynamic_forms/selecciona_audiencia.render");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, app_routing_1.routing, forms_1.FormsModule, forms_2.ReactiveFormsModule],
            declarations: [app_component_1.AppComponent, login_component_1.Login, registro_component_1.Registro, page1_component_1.Page1, page2_component_1.Page2, logout_component_1.LogoutComponent,
                crea_encuesta_component_1.CreaEncuestaComponent, crea_preguntas_component_1.CreaPreguntasComponent, dynamic_form_component_1.DynamicFormComponent, dynamic_form_question_component_1.DynamicFormQuestionComponent,
                respuestas_component_1.RespuestasComponent, user_group_component_1.UserGroupComponent, perfil_component_1.Perfil, selecciona_audiencia_render_1.SelAudienciaRender],
            providers: [app_routing_1.appRoutingProviders, auth_service_1.AuthService, storage_service_1.StorageService, consulta_session_service_1.ConsultaSessionService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map