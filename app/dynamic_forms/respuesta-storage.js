"use strict";
var RespuestaStorage = (function () {
    function RespuestaStorage(id, usuario, email, encuesta, value) {
        this.id = id;
        this.usuario = usuario;
        this.email = email;
        this.encuesta = encuesta;
        this.value = value;
    }
    return RespuestaStorage;
}());
exports.RespuestaStorage = RespuestaStorage;
//# sourceMappingURL=respuesta-storage.js.map