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
var encuesta_1 = require("./dynamic_forms/encuesta");
var StorageService = (function () {
    function StorageService() {
        this.horizon = Horizon();
        this.sessionCollection = this.horizon("session");
        this.encuestaCollection = this.horizon("encuestas");
        this.usuariosCollection = this.horizon("usuarios");
        this.grupoCollection = this.horizon("grupos");
        this.respuestasCollection = this.horizon("respuestas");
        this.outEmailCollection = this.horizon("outemails");
        this.linksCollection = this.horizon("links");
    }
    StorageService.prototype.readUsersForEncuesta = function (id) {
        var _this = this;
        return this.encuestaCollection.find({ id: id }).fetch().mergeMap(function (togp) { return Rx.Observable.from(togp.audiencia); }).mergeMap(function (indice) { return _this.grupoCollection.findAll({ ngemail: indice }, { nombregrupo: indice }).fetch(); }).bufferTime(500).map(function (dat) { return [].concat.apply([], dat); });
    };
    StorageService.prototype.readUsersForGroups = function (grupos) {
        var _this = this;
        return Rx.Observable.from(grupos).mergeMap(function (indice) { return _this.grupoCollection.findAll({ ngemail: indice }, { nombregrupo: indice }).fetch(); }).bufferTime(200).map(function (index) { return _this.transToArray(index); });
        // .subscribe(
        //             out=>console.log("OUT-map:",out),
        //             err=>console.log("error:",err),
        //             ()=> console.log("complete:")
        //         )
    };
    StorageService.prototype.transToArray = function (entrada) {
        var vsalida = [];
        entrada.forEach(function (dat) {
            dat.forEach(function (xxx) {
                if (vsalida.indexOf(xxx.email) == -1)
                    vsalida.push(xxx.email);
                //console.log("email->",xxx.email);
            });
        });
        return vsalida;
    };
    StorageService.prototype.readEncuestasForUserEmail = function (email) {
        //let grupos : string[] = [];
        // let busqueda : string[] = [];
        var _this = this;
        return this.grupoCollection.findAll({ email: email }).fetch().map(function (dat) { return _this.transforma(dat); }).mergeMap(function (indice) { return Rx.Observable.from(indice); }).mergeMap(function (item) { return _this.encuestaCollection.findAll({ nombregrupo: item }).fetch(); }).bufferTime(100).map(function (parameter) { return _this.aplica(parameter); }).mergeMap(function (index) { return Rx.Observable.from(index); }).mergeMap(function (index) { return _this.encuestaCollection.findAll({ nombre: index }).fetch(); }).bufferTime(100).map(function (index) { return _this.ajusta_salida(index); });
        // .subscribe(
        //             out=>console.log("OUT-map:",out),
        //             err=>console.log("error:",err),
        //             ()=> console.log("complete:")
        //         )
    };
    // Funcion auxiliar para readEncuestasForUserEmail
    //--Elimina los valores duplicados de los grupos y entrega un grupos a los que pertence el usuario
    StorageService.prototype.transforma = function (entrada) {
        var grupos = [];
        var cadena = "";
        entrada.forEach(function (dat) {
            if (dat.nombregrupo != undefined)
                if (grupos.indexOf(dat.nombregrupo) == -1)
                    grupos.push(dat.nombregrupo);
            if (dat.ngemail != undefined)
                if (grupos.indexOf(dat.ngemail) == -1)
                    grupos.push(dat.ngemail);
        });
        return grupos;
    };
    // Funcion auxiliar para readEncuestasForUserEmail
    //--Elimina los valores duplicados de la busqueda de encuesta y entrega un vector con las encuestas
    StorageService.prototype.aplica = function (entrada) {
        var encuestas = [];
        try {
            entrada.forEach(function (data) {
                data.forEach(function (valor) { if (encuestas.indexOf(valor.nombreencuesta) == -1)
                    encuestas.push(valor.nombreencuesta); });
            });
        }
        catch (error) {
        }
        return encuestas;
    };
    // Funcion auxiliar para readEncuestasForUserEmail
    //--ajusta la salida del observable para que los objetos queden acomodados en un vector de encuestas, quitando un nivel.
    StorageService.prototype.ajusta_salida = function (entrada) {
        // let retorno:Encuesta[] = [];
        //     entrada.forEach(
        //         dat=>retorno.push(dat)
        //     )
        return [].concat.apply([], entrada);
    };
    //--Almacena las respuestas de la encuesta en la colleccion de respuestas
    StorageService.prototype.almacenaEncuestaContestada = function (data) {
        this.respuestasCollection.store(data);
    };
    //--Lee las respuestas que el usuario ha enviado
    StorageService.prototype.readRespuestasByEmail = function (email) {
        return this.respuestasCollection.findAll({ email: email }).fetch();
    };
    //--Lee las respuestas que el usuario ha enviado
    StorageService.prototype.readRespuestasByEncuesta = function (encuesta) {
        return this.respuestasCollection.findAll({ encuesta: encuesta }).fetch();
    };
    StorageService.prototype.deleteRespuestasById = function (id) {
        this.respuestasCollection.remove({ id: id });
    };
    //--lee la session del usuario de la DB
    StorageService.prototype.readSessionById = function (idsearch) {
        return this.sessionCollection.find({ id: idsearch }).fetch().defaultIfEmpty();
    };
    //--Elimina la session dl usuario de la DB
    StorageService.prototype.removeSessionById = function (id) {
        this.sessionCollection.remove({ id: id });
    };
    //--Crea una session de usuario en la DB
    StorageService.prototype.creaSession = function (session) {
        this.sessionCollection.store(JSON.stringify(session));
    };
    //--Crea una encuesta
    StorageService.prototype.writeEncuesta = function (encuesta) {
        this.encuestaCollection.store(JSON.stringify(encuesta));
    };
    //--Lista las encuestas del Usuario
    StorageService.prototype.readEncuestasByUser = function (nombreuser) {
        return this.encuestaCollection.findAll({ username: nombreuser }).fetch();
    };
    //--lista las encuestas que puede contestar el usuario
    StorageService.prototype.readEncuestasForUser = function (username) {
        return this.encuestaCollection.find({ iduser: username }).fetch();
    };
    //--Elimina la encuesta
    StorageService.prototype.deleteEncuesta = function (idEncuesta) {
        this.encuestaCollection.remove({ id: idEncuesta });
    };
    //--Trae la encuesta desde un id
    StorageService.prototype.readEncuestasById = function (iddata) {
        return this.encuestaCollection.find({ id: iddata }).fetch().defaultIfEmpty();
    };
    //--Actualiza los grupos de audiencia dentro de la tabla especial de lamisma collection de la audiencia
    StorageService.prototype.editAudienciaGroup = function (nombreencuesta, grupos) {
        var _this = this;
        var audiencias = [];
        this.encuestaCollection.findAll({ nombreencuesta: nombreencuesta }).fetch()
            .mergeMap(function (list) { return _this.encuestaCollection.removeAll(list); }).subscribe({
            next: function (id) { console.log("id " + id + " was removed"); },
            error: function (err) { console.error("Error: " + err); },
            complete: function () {
                console.log('All items removed successfully n1');
            }
        });
        grupos.forEach(function (dat) {
            audiencias.push(new encuesta_1.AudienciaTable("AUDIENCIA/" + nombreencuesta + "/" + dat, nombreencuesta, dat));
        });
        setTimeout(function () { _this.encuestaCollection.store(audiencias); }, 2000);
    };
    //-- Trae la lista de usuarios para agregarlos a los grupos
    StorageService.prototype.readUsers = function () {
        return this.usuariosCollection.fetch().defaultIfEmpty();
    };
    StorageService.prototype.writeGrupo = function (grupo) {
        this.grupoCollection.store(grupo);
    };
    StorageService.prototype.writeEmailGrupo = function (grupo) {
        this.grupoCollection.store(grupo);
    };
    StorageService.prototype.writeNombreGrupo = function (id, nombregrupo, idowner) {
        this.grupoCollection.store({ id: id, nombregruposingle: nombregrupo, idownersingle: idowner });
    };
    //--Trae la lista de los grupos para ser buscados por nombre de grupo
    StorageService.prototype.readGroupByName = function (grupo) {
        return this.grupoCollection.find({ nombregruposingle: grupo.toLowerCase() }).fetch();
    };
    //--Trae la lista de los grupos para ser buscados por dueno del grupo
    StorageService.prototype.readGroupByOwner = function (dueno) {
        return this.grupoCollection.findAll({ idownersingle: dueno }).fetch();
        //return this.grupoCollection.fetch();
    };
    //--Elimina el grupo single
    StorageService.prototype.deleteGroupById = function (id) {
        this.grupoCollection.remove({ id: id });
    };
    //---Elimina los usuarios que tienen el nombre mismo nombregrupo
    StorageService.prototype.deleteGroupByNombregrupo = function (nombregrupo) {
        var _this = this;
        this.grupoCollection.findAll({ nombregrupo: nombregrupo }).fetch()
            .mergeMap(function (list) { return _this.grupoCollection.removeAll(list); }).subscribe({
            next: function (id) { console.log("id " + id + " was removed"); },
            error: function (err) { console.error("Error: " + err); },
            complete: function () { console.log('All items removed successfully'); }
        });
    };
    //---Elimina los usuarios que tienen el nombre mismo nombregrupo NgEmail
    StorageService.prototype.deleteEmailGroupByNombregrupo = function (nombregrupo) {
        var _this = this;
        this.grupoCollection.findAll({ ngemail: nombregrupo }).fetch()
            .mergeMap(function (list) { return _this.grupoCollection.removeAll(list); }).subscribe({
            next: function (id) { console.log("id " + id + " was removed"); },
            error: function (err) { console.error("Error: " + err); },
            complete: function () { console.log('All items removed successfully'); }
        });
    };
    StorageService.prototype.readGroupUsers = function (nombregrupo) {
        return this.grupoCollection.findAll({ nombregrupo: nombregrupo }).fetch();
    };
    StorageService.prototype.readEmailGroupUsers = function (nombregrupo) {
        return this.grupoCollection.findAll({ ngemail: nombregrupo }).fetch();
    };
    StorageService.prototype.editGroup = function (nombregrupo, grupo) {
        var _this = this;
        this.grupoCollection.findAll({ nombregrupo: nombregrupo }).fetch()
            .mergeMap(function (list) { return _this.grupoCollection.removeAll(list); }).subscribe({
            next: function (id) { console.log("id " + id + " was removed"); },
            error: function (err) { console.error("Error: " + err); },
            complete: function () {
                console.log('All items removed successfully n1');
            }
        });
        setTimeout(function () { _this.grupoCollection.store(grupo); }, 1000);
    };
    StorageService.prototype.editMailGroup = function (nombregrupo, grupo) {
        var _this = this;
        this.grupoCollection.findAll({ ngemail: nombregrupo }).fetch()
            .mergeMap(function (list) { return _this.grupoCollection.removeAll(list); }).subscribe({
            next: function (id) { console.log("id " + id + " was removed"); },
            error: function (err) { console.error("Error: " + err); },
            complete: function () {
                console.log('All items removed successfully n11');
            }
        });
        setTimeout(function () { _this.grupoCollection.store(grupo); }, 1000);
    };
    //Elimina los grupos de Audiencia de la encuesta que se acaba de borrar
    StorageService.prototype.deleteAudienciaEncuesta = function (nombreencuesta) {
        var _this = this;
        console.log("delete_audiencia:", nombreencuesta);
        this.encuestaCollection.findAll({ nombreencuesta: nombreencuesta }).fetch()
            .mergeMap(function (list) { return _this.encuestaCollection.removeAll(list); }).subscribe({
            next: function (id) { console.log("id " + id + " was removed"); },
            error: function (err) { console.error("Error: " + err); },
            complete: function () { console.log('All items removed successfully'); }
        });
    };
    StorageService.prototype.sendEmailDirect = function (email) {
        this.outEmailCollection.store(email);
    };
    StorageService.prototype.readUserByUsername = function (username) {
        return this.usuariosCollection.find({ nombre: username }).fetch();
    };
    StorageService.prototype.writeUserByObject = function (usuario) {
        this.usuariosCollection.update(usuario);
    };
    StorageService.prototype.writeNewLink = function (link) {
        this.linksCollection.insert(link);
    };
    StorageService.prototype.readLinkById = function (id) {
        return this.linksCollection.find({ id: id }).fetch();
    };
    StorageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], StorageService);
    return StorageService;
}());
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map