import { Routes, RouterModule } from '@angular/router';

import { Login } from './login.component';
import { Page1 } from './page1.component';
import { Page2 } from './page2.component';
import { Perfil } from './perfil.component';
import { RespuestasComponent } from "./dynamic_forms/respuestas.component";
import { LogoutComponent } from './logout.component';

import { Registro } from './registro.component';
import { CreaEncuestaComponent } from './dynamic_forms/crea_encuesta.component';
import { CreaPreguntasComponent } from './dynamic_forms/crea_preguntas.component';
import { UserGroupComponent } from './dynamic_forms/user_group.component';
import { AuthGuard } from "./auth_guard.service";

const appRoutes: Routes = [
  {
    path: "",
    component: Page2
  },
  {
    path: "page1",
    component: Page1,
    canActivate: [AuthGuard]
  },
  {
    path: "page1/:id",
    component: Page1
  },
  {
      path: "page2",
      component: Page2
  },
    {
      path: "login",
      component: Login
  },
    {
      path: "logout",
      component: LogoutComponent
  },
  {
      path: "registro",
      component: Registro
  },{
      path: "perfil",
      component: Perfil
  },
  {
      path: "creaencuesta",
      component: CreaEncuestaComponent,
      canActivate: [AuthGuard]
  },
  {
      path: "usergroup",
      component: UserGroupComponent,
      canActivate: [AuthGuard]
  },
  {
      path: "resultados",
      component: RespuestasComponent,
      canActivate: [AuthGuard]
  },
  {
      path: "**",
      component: Page2
  }
];

export const appRoutingProviders: any[] = [AuthGuard];

export const routing = RouterModule.forRoot(appRoutes,{ useHash: true });
//export const routing = RouterModule.forRoot(appRoutes,{ useHash: true });

//---  canActivate: [AuthGuard]