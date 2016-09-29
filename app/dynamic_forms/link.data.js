"use strict";
var Link = (function () {
    function Link(id, link, email, encuesta, salt, hash, fecha, usuario) {
        this.id = id;
        this.link = link;
        this.email = email;
        this.encuesta = encuesta;
        this.salt = salt;
        this.hash = hash;
        this.fecha = fecha;
        this.usuario = usuario;
    }
    return Link;
}());
exports.Link = Link;
//# sourceMappingURL=link.data.js.map