"use strict";
var Session = (function () {
    function Session(id, username, datetime, email, grupos) {
        this.id = id;
        this.username = username;
        this.datetime = datetime;
        this.email = email;
        this.grupos = grupos;
    }
    return Session;
}());
exports.Session = Session;
//# sourceMappingURL=session.js.map