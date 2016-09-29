import { Component } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { GpUser, GpEmail } from './user_group.model';
import { StorageService } from "../storage.service";
import { Observable } from 'rxjs/Observable';
import { Usuario } from "../usuario";
import { Subject } from 'rxjs/Subject';
import { AuthService } from "../auth.service";


@Component({
    selector: 'usergroup',
    templateUrl: "app/dynamic_forms/user_group.html"
})

export class UserGroupComponent {
nuevo_grupo = false;
vusers: Observable<Usuario[]>
salida: string[] = [];
carga_dato: {id: string, nombre:string, email:string }[] = [];
selusers: {id: string, nombre:string, email:string }[] = [];
nuevogrupo: string = "";
gpusers: GpUser[] = [];
duplicados = false;
usuario_actual = "";
grupos: Observable<GpUser[]>;
edit_group =false;
emails = "";
vemails: string[] = [];
gpemail: GpEmail[] =[];


private searchTermStream = new Subject<string>();
items: Observable<GpUser[]> = this.searchTermStream.debounceTime(200).
      distinctUntilChanged().
      switchMap((term: string) => this.storageService.readGroupByName(term)); 


    constructor(public storageService: StorageService, authservice:AuthService){
        this.usuario_actual = authservice.user_logueado;
    }

    ngOnInit(){
        this.grupos = this.storageService.readGroupByOwner(this.usuario_actual);
       
    }

    limpiaGrupo(){
        this.selusers = [];
        this.nuevogrupo = "";
        this.leeUsuarios();
        this.nuevo_grupo = true;
        this.edit_group =false;
    }


    leeUsuarios(){
        this.carga_dato = [];
        this.storageService.readUsers().subscribe(
            result => {
                    if(result!=null) result.forEach(
                        rr => this.carga_dato.push({id: rr.id, nombre: rr.nombre, email: rr.email})
                        );                
            },
            error => console.log("Error:",error),
            () => {console.log("Completado:")}
        )
    }
    
    
    selectUsers(){
        this.selusers = [];
        this.salida.forEach(
            item => {
                let indice : number;
                indice = Number(item);
                this.selusers.push(this.carga_dato[indice]);
                
            }
        );
        
    }

    onSubmit(){
       
        this.gpusers = [];
        this.gpemail = [];
        this.nuevogrupo = this.nuevogrupo.toLowerCase();
        //--si el grupo es de edicion debe borrar los usuarios ingresados a la DB
        // if(this.edit_group) {
        //     this.storageService.deleteGroupByNombregrupo(this.nuevogrupo);
        //     this.storageService.deleteEmailGroupByNombregrupo(this.nuevogrupo);
        // }
        
        //---Captura los usuarios del control y los pone para ser grabados por la DB
        this.selusers.forEach(
            user => {
                this.gpusers.push(
                    {
                        id: "GRUPO/"+this.nuevogrupo+"/"+ user.nombre +"/",
                        nombregrupo: this.nuevogrupo,
                        idowner: this.usuario_actual,
                        iduser: user.nombre,
                        email: user.email
                    }
                )
            }
        );

        //---captura los usuarios de la carga de e-mails
        this.vemails.forEach(
            dat => { this.gpemail.push(
                {
                    id: 'GPEMAIL/'+this.nuevogrupo+"/" + dat ,
                    ngemail: this.nuevogrupo,
                    idowner: this.usuario_actual,
                    email: dat
                }
                
                )}
        );

        //this.storageService.writeNombreGrupo("GPUSER/"+ this.nuevogrupo + "/",this.nuevogrupo,this.usuario_actual);
        //--- debe esperar un rato de manera que los grupos se puedan eliminar correctamente cuando esta editando grupos
        // if(this.edit_group) setTimeout(() =>{
        //     this.storageService.writeGrupo(this.gpusers);
        //     this.storageService.writeEmailGrupo(this.gpemail);
        //     console.log("Espera terminada 3 seg. Escribiendo grupos")},3000)
        //     else {
        //         this.storageService.writeGrupo(this.gpusers);
        //         this.storageService.writeEmailGrupo(this.gpemail);
        //     }

        if(this.edit_group){
            this.storageService.editGroup(this.nuevogrupo,this.gpusers);
            this.storageService.editMailGroup(this.nuevogrupo,this.gpemail);
        } else {
            this.storageService.writeNombreGrupo("GPUSER/"+ this.nuevogrupo + "/",this.nuevogrupo,this.usuario_actual);
            this.storageService.writeGrupo(this.gpusers);
            this.storageService.writeEmailGrupo(this.gpemail);            
        }


        this.edit_group= false;
        this.grupos = this.storageService.readGroupByOwner(this.usuario_actual);
        this.nuevo_grupo = false;
    }

    deleteGroup(grupo:string){
        this.edit_group= false;
        this.storageService.deleteGroupById("GPUSER/"+grupo+"/");
        this.storageService.deleteGroupByNombregrupo(grupo);
        this.storageService.deleteEmailGroupByNombregrupo(grupo);
        this.nuevogrupo = "";
        this.nuevo_grupo = false;
        
        this.grupos = this.storageService.readGroupByOwner(this.usuario_actual);
    }
    
    editGroup(grupo:string){
        this.leeUsuarios();
        this.nuevogrupo = grupo;
        this.nuevo_grupo = true;
        this.selusers = [];
        this.edit_group = true;
        //--debe leer todos los miembros del grupo y cargarlos a sel users
        this.storageService.readGroupUsers(grupo).subscribe(
            data =>{
                data.forEach(
                    item => {
                        this.selusers.push({id: item.id, nombre: item.iduser, email: item.email });
                    }
                );
            },
            err => console.log("error:",err),
            () => {}
        );

        //--debe leer todos los miembros del de emails y cargarlo al vector de emails
        this.emails = "";
        this.storageService.readEmailGroupUsers(grupo).subscribe(
            data =>{
                //console.log("Vector->",data);
                data.forEach(
                    item => {
                        //console.log("lee->",item.email);
                        //this.selusers.push({id: item.id, nombre: item.iduser, email: item.email });
                        if(this.emails=="") this.emails = item.email ;else this.emails = this.emails + "," + item.email;                        
                    }
                );
            },
            err => console.log("error:",err),
            () => {this.cargarEmails()}
        );

    }
        
    strVerifica() {
        this.searchTermStream.next(this.nuevogrupo);
        this.items.subscribe(
            result => {
                    if(result == null) {this.duplicados = false} else {this.duplicados = true} },
          err => console.log("error:",err)            
        )
        return true;   
    }   

   //-- carga la lista de correos separados por coma.
    cargarEmails(){
        this.vemails = [];
        let entrada = this.emails.replace(/\s/g, ""); //--quita espacios intermedios
        let arreglo = entrada.toUpperCase().split(",");
        arreglo.forEach(
            dat => {
                //console.log("emails->",dat + " - "+dat.match("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$"));
                this.vemails.push(dat.match("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$").pop().toLowerCase());
            }
        );
    }


 }