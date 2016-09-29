import { Component, Input, OnInit, Output, EventEmitter}  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { QuestionBase }              from './question-base';
import { QuestionControlService }    from './question-control.service';
import { StorageService} from "../storage.service";
import { RespuestaStorage }    from './respuesta-storage';
import { Router }   from "@angular/router";

@Component({
  selector: 'dynamic-form',
  templateUrl: 'app/dynamic_forms/dynamic-form.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  @Input() usuario_res: string;
  @Input() encuesta_res: string;
  @Input() email_res: string;
  @Input() shortdescription: string;
  @Output() onrespuesta = new EventEmitter<string>();

  form: FormGroup;
  payLoad = '';
  cargadb: RespuestaStorage;

  constructor(private qcs: QuestionControlService, public storageservice:StorageService) {  }
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
    this.payLoad = "";
  }

ngOnChanges(){
  this.form = this.qcs.toFormGroup(this.questions);
  this.payLoad = "";
}

  onSubmit() {

    this.cargadb = new RespuestaStorage("RESPUESTA/"+this.encuesta_res+"/"+this.email_res,
        this.usuario_res,this.email_res,this.encuesta_res,this.form.value);

    this.payLoad = JSON.stringify(this.cargadb);

    this.storageservice.almacenaEncuestaContestada(this.cargadb);

     this.onrespuesta.emit(this.encuesta_res);
    
  }
}