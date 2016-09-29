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
var ng2_cookies_1 = require("ng2-cookies/ng2-cookies");
var ConsultaSessionService = (function () {
    function ConsultaSessionService() {
    }
    ConsultaSessionService.prototype.checkUserLogin = function () {
        //--- Trae la cookies
        var cookieID = ng2_cookies_1.Cookie.get("appsession_id");
        var cookieDatetime = ng2_cookies_1.Cookie.get("appsession_datetime");
        //console.log('Cookie:', cookieID + " "+ cookieDatetime);          
        return cookieID;
    };
    ConsultaSessionService.prototype.deleteSession = function () {
        //--Borra las cookies
        ng2_cookies_1.Cookie.delete("appsession_id");
        ng2_cookies_1.Cookie.delete("appsession_datetime");
    };
    //-- Crea la cookie del lado del usuario para tener los datos de la session
    ConsultaSessionService.prototype.creaSession = function (id, datetime) {
        ng2_cookies_1.Cookie.set("appsession_id", id);
        ng2_cookies_1.Cookie.set("appsession_datetime", datetime.toString());
    };
    ConsultaSessionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ConsultaSessionService);
    return ConsultaSessionService;
}());
exports.ConsultaSessionService = ConsultaSessionService;
//# sourceMappingURL=consulta_session.service.js.map