"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./login.component');
var page1_component_1 = require('./page1.component');
var page2_component_1 = require('./page2.component');
var perfil_component_1 = require('./perfil.component');
var respuestas_component_1 = require("./dynamic_forms/respuestas.component");
var logout_component_1 = require('./logout.component');
var registro_component_1 = require('./registro.component');
var crea_encuesta_component_1 = require('./dynamic_forms/crea_encuesta.component');
var user_group_component_1 = require('./dynamic_forms/user_group.component');
var auth_guard_service_1 = require("./auth_guard.service");
var appRoutes = [
    {
        path: "",
        component: page2_component_1.Page2
    },
    {
        path: "page1",
        component: page1_component_1.Page1,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: "page1/:id",
        component: page1_component_1.Page1
    },
    {
        path: "page2",
        component: page2_component_1.Page2
    },
    {
        path: "login",
        component: login_component_1.Login
    },
    {
        path: "logout",
        component: logout_component_1.LogoutComponent
    },
    {
        path: "registro",
        component: registro_component_1.Registro
    }, {
        path: "perfil",
        component: perfil_component_1.Perfil
    },
    {
        path: "creaencuesta",
        component: crea_encuesta_component_1.CreaEncuestaComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: "usergroup",
        component: user_group_component_1.UserGroupComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: "resultados",
        component: respuestas_component_1.RespuestasComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: "**",
        component: page2_component_1.Page2
    }
];
exports.appRoutingProviders = [auth_guard_service_1.AuthGuard];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });
//export const routing = RouterModule.forRoot(appRoutes,{ useHash: true });
//---  canActivate: [AuthGuard] 
//# sourceMappingURL=app.routing.js.map