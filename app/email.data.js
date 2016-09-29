"use strict";
var Email = (function () {
    function Email(owner, from, to, subject, content) {
        this.owner = owner;
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.content = content;
    }
    return Email;
}());
exports.Email = Email;
//# sourceMappingURL=email.data.js.map