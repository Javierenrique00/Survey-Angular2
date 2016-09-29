import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StorageService } from "../storage.service";
import { Observable } from 'rxjs/Observable';
import { GpUser, GpUser2,GpEmail } from './user_group.model';

@Component({
  selector: 'sel-audiencia-render',
  templateUrl: "app/dynamic_forms/selecciona_audiencia.html"
})
export class SelAudienciaRender {
    @Input() audiencia: string[];
    @Input() usuario: string;
    @Output() copiaaudiencia = new EventEmitter<string[]>();


    grupos: GpUser2[] = [];
    escogidos: GpUser2[] = [];
    salida: string[] = [];
    vsalida: string[] = [];

    constructor(public storageservice:StorageService){
    }

    ngOnInit(){
        this.storageservice.readGroupByOwner(this.usuario).subscribe(
            data =>{
                this.grupos = data;
            },
            err => {},
            () =>{})
    }


    addGroup(){
        this.escogidos = [];
        this.audiencia = [];
        this.salida.forEach(
            item => {
                let indice : number;
                indice = Number(item);
                this.escogidos.push(this.grupos[indice]);
                this.audiencia.push(this.grupos[indice].nombregruposingle);                
            }
        );
        this.copiaaudiencia.emit(this.audiencia);

    }

}