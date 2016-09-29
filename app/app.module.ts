import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule }  from '@angular/forms';
import { routing, appRoutingProviders } from "./app.routing";
import { Login }  from './login.component';
import { Registro }  from './registro.component';
import { Page1 }  from './page1.component';
import { Page2 }  from './page2.component';
import { Perfil }  from './perfil.component';
import { LogoutComponent }  from './logout.component';

import { CreaEncuestaComponent } from "./dynamic_forms/crea_encuesta.component";
import { CreaPreguntasComponent } from "./dynamic_forms/crea_preguntas.component";
import { RespuestasComponent } from "./dynamic_forms/respuestas.component";

import { DynamicFormComponent }         from './dynamic_forms/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic_forms/dynamic-form-question.component';
import { UserGroupComponent } from './dynamic_forms/user_group.component';
import { AuthService } from "./auth.service";
import { StorageService } from "./storage.service";
import { ConsultaSessionService } from "./consulta_session.service";

import { SelAudienciaRender } from "./dynamic_forms/selecciona_audiencia.render";


@NgModule({
  imports: [ BrowserModule, routing, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent, Login, Registro, Page1, Page2, LogoutComponent,
  CreaEncuestaComponent, CreaPreguntasComponent, DynamicFormComponent, DynamicFormQuestionComponent,
  RespuestasComponent, UserGroupComponent, Perfil, SelAudienciaRender],
  providers: [appRoutingProviders, AuthService, StorageService, ConsultaSessionService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
