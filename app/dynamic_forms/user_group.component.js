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
var Subject_1 = require('rxjs/Subject');
var auth_service_1 = require("../auth.service");
var UserGroupComponent = (function () {
    function UserGroupComponent(storageService, authservice) {
        var _this = this;
        this.storageService = storageService;
        this.nuevo_grupo = false;
        this.salida = [];
        this.carga_dato = [];
        this.selusers = [];
        this.nuevogrupo = "";
        this.gpusers = [];
        this.duplicados = false;
        this.usuario_actual = "";
        this.edit_group = false;
        this.emails = "";
        this.vemails = [];
        this.gpemail = [];
        this.searchTermStream = new Subject_1.Subject();
        this.items = this.searchTermStream.debounceTime(200).
            distinctUntilChanged().
            switchMap(function (term) { return _this.storageService.readGroupByName(term); });
        this.usuario_actual = authservice.user_logueado;
    }
    UserGroupComponent.prototype.ngOnInit = function () {
        this.grupos = this.storageService.readGroupByOwner(this.usuario_actual);
    };
    UserGroupComponent.prototype.limpiaGrupo = function () {
        this.selusers = [];
        this.nuevogrupo = "";
        this.leeUsuarios();
        this.nuevo_grupo = true;
        this.edit_group = false;
    };
    UserGroupComponent.prototype.leeUsuarios = function () {
        var _this = this;
        this.carga_dato = [];
        this.storageService.readUsers().subscribe(function (result) {
            if (result != null)
                result.forEach(function (rr) { return _this.carga_dato.push({ id: rr.id, nombre: rr.nombre, email: rr.email }); });
        }, function (error) { return console.log("Error:", error); }, function () { console.log("Completado:"); });
    };
    UserGroupComponent.prototype.selectUsers = function () {
        var _this = this;
        this.selusers = [];
        this.salida.forEach(function (item) {
            var indice;
            indice = Number(item);
            _this.selusers.push(_this.carga_dato[indice]);
        });
    };
    UserGroupComponent.prototype.onSubmit = function () {
        var _this = this;
        this.gpusers = [];
        this.gpemail = [];
        this.nuevogrupo = this.nuevogrupo.toLowerCase();
        //--si el grupo es de edicion debe borrar los usuarios ingresados a la DB
        // if(this.edit_group) {
        //     this.storageService.deleteGroupByNombregrupo(this.nuevogrupo);
        //     this.storageService.deleteEmailGroupByNombregrupo(this.nuevogrupo);
        // }
        //---Captura los usuarios del control y los pone para ser grabados por la DB
        this.selusers.forEach(function (user) {
            _this.gpusers.push({
                id: "GRUPO/" + _this.nuevogrupo + "/" + user.nombre + "/",
                nombregrupo: _this.nuevogrupo,
                idowner: _this.usuario_actual,
                iduser: user.nombre,
                email: user.email
            });
        });
        //---captura los usuarios de la carga de e-mails
        this.vemails.forEach(function (dat) {
            _this.gpemail.push({
                id: 'GPEMAIL/' + _this.nuevogrupo + "/" + dat,
                ngemail: _this.nuevogrupo,
                idowner: _this.usuario_actual,
                email: dat
            });
        });
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
        if (this.edit_group) {
            this.storageService.editGroup(this.nuevogrupo, this.gpusers);
            this.storageService.editMailGroup(this.nuevogrupo, this.gpemail);
        }
        else {
            this.storageService.writeNombreGrupo("GPUSER/" + this.nuevogrupo + "/", this.nuevogrupo, this.usuario_actual);
            this.storageService.writeGrupo(this.gpusers);
            this.storageService.writeEmailGrupo(this.gpemail);
        }
        this.edit_group = false;
        this.grupos = this.storageService.readGroupByOwner(this.usuario_actual);
        this.nuevo_grupo = false;
    };
    UserGroupComponent.prototype.deleteGroup = function (grupo) {
        this.edit_group = false;
        this.storageService.deleteGroupById("GPUSER/" + grupo + "/");
        this.storageService.deleteGroupByNombregrupo(grupo);
        this.storageService.deleteEmailGroupByNombregrupo(grupo);
        this.nuevogrupo = "";
        this.nuevo_grupo = false;
        this.grupos = this.storageService.readGroupByOwner(this.usuario_actual);
    };
    UserGroupComponent.prototype.editGroup = function (grupo) {
        var _this = this;
        this.leeUsuarios();
        this.nuevogrupo = grupo;
        this.nuevo_grupo = true;
        this.selusers = [];
        this.edit_group = true;
        //--debe leer todos los miembros del grupo y cargarlos a sel users
        this.storageService.readGroupUsers(grupo).subscribe(function (data) {
            data.forEach(function (item) {
                _this.selusers.push({ id: item.id, nombre: item.iduser, email: item.email });
            });
        }, function (err) { return console.log("error:", err); }, function () { });
        //--debe leer todos los miembros del de emails y cargarlo al vector de emails
        this.emails = "";
        this.storageService.readEmailGroupUsers(grupo).subscribe(function (data) {
            //console.log("Vector->",data);
            data.forEach(function (item) {
                //console.log("lee->",item.email);
                //this.selusers.push({id: item.id, nombre: item.iduser, email: item.email });
                if (_this.emails == "")
                    _this.emails = item.email;
                else
                    _this.emails = _this.emails + "," + item.email;
            });
        }, function (err) { return console.log("error:", err); }, function () { _this.cargarEmails(); });
    };
    UserGroupComponent.prototype.strVerifica = function () {
        var _this = this;
        this.searchTermStream.next(this.nuevogrupo);
        this.items.subscribe(function (result) {
            if (result == null) {
                _this.duplicados = false;
            }
            else {
                _this.duplicados = true;
            }
        }, function (err) { return console.log("error:", err); });
        return true;
    };
    //-- carga la lista de correos separados por coma.
    UserGroupComponent.prototype.cargarEmails = function () {
        var _this = this;
        this.vemails = [];
        var entrada = this.emails.replace(/\s/g, ""); //--quita espacios intermedios
        var arreglo = entrada.toUpperCase().split(",");
        arreglo.forEach(function (dat) {
            //console.log("emails->",dat + " - "+dat.match("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$"));
            _this.vemails.push(dat.match("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$").pop().toLowerCase());
        });
    };
    UserGroupComponent = __decorate([
        core_1.Component({
            selector: 'usergroup',
            templateUrl: "app/dynamic_forms/user_group.html"
        }), 
        __metadata('design:paramtypes', [storage_service_1.StorageService, auth_service_1.AuthService])
    ], UserGroupComponent);
    return UserGroupComponent;
}());
exports.UserGroupComponent = UserGroupComponent;
//# sourceMappingURL=user_group.component.js.map