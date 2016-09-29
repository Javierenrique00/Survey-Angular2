"use strict";
var Encuesta = (function () {
    function Encuesta(id, nombre, username, fechaini, horaini, fechafin, horafin, fechamensaje, horamensaje, audiencia, questions, questionsview, shortdescription) {
        this.id = id;
        this.nombre = nombre;
        this.username = username;
        this.fechaini = fechaini;
        this.horaini = horaini;
        this.fechafin = fechafin;
        this.horafin = horafin;
        this.fechamensaje = fechamensaje;
        this.horamensaje = horamensaje;
        this.audiencia = audiencia;
        this.questions = questions;
        this.questionsview = questionsview;
        this.shortdescription = shortdescription;
    }
    return Encuesta;
}());
exports.Encuesta = Encuesta;
var AudienciaTable = (function () {
    function AudienciaTable(id, nombreencuesta, nombregrupo) {
        this.id = id;
        this.nombreencuesta = nombreencuesta;
        this.nombregrupo = nombregrupo;
    }
    return AudienciaTable;
}());
exports.AudienciaTable = AudienciaTable;
//# sourceMappingURL=encuesta.js.map