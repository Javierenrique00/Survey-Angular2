"use strict";
var Usuario = (function () {
    function Usuario(id, nombre, pwd, uid, email, state, datetime, grupos, firstname, lastname, nacimiento, salt) {
        this.id = id;
        this.nombre = nombre;
        this.pwd = pwd;
        this.uid = uid;
        this.email = email;
        this.state = state;
        this.datetime = datetime;
        this.grupos = grupos;
        this.firstname = firstname;
        this.lastname = lastname;
        this.nacimiento = nacimiento;
        this.salt = salt;
    }
    return Usuario;
}());
exports.Usuario = Usuario;
//# sourceMappingURL=usuario.js.map