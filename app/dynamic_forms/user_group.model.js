"use strict";
var GpUser = (function () {
    function GpUser(id, nombregrupo, idowner, iduser, email) {
        this.id = id;
        this.nombregrupo = nombregrupo;
        this.idowner = idowner;
        this.iduser = iduser;
        this.email = email;
    }
    return GpUser;
}());
exports.GpUser = GpUser;
var GpEmail = (function () {
    function GpEmail(id, ngemail, idowner, email) {
        this.id = id;
        this.ngemail = ngemail;
        this.idowner = idowner;
        this.email = email;
    }
    return GpEmail;
}());
exports.GpEmail = GpEmail;
var GpUser2 = (function () {
    function GpUser2(id, idownersingle, nombregruposingle) {
        this.id = id;
        this.idownersingle = idownersingle;
        this.nombregruposingle = nombregruposingle;
    }
    return GpUser2;
}());
exports.GpUser2 = GpUser2;
//# sourceMappingURL=user_group.model.js.map