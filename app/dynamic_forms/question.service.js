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
var QuestionService = (function () {
    function QuestionService() {
    }
    QuestionService.prototype.getQuestions = function () {
        return this._data;
    };
    QuestionService.prototype.loadQuestions = function (data) {
        this._data = data;
    };
    QuestionService.prototype.getViewQuestions = function () {
        return this._viewdata;
    };
    QuestionService.prototype.loadViewQuestions = function (data) {
        this._viewdata = data;
    };
    QuestionService.prototype.newViewQuestion = function () {
        this._viewdata = null;
    };
    QuestionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], QuestionService);
    return QuestionService;
}());
exports.QuestionService = QuestionService;
// @Injectable()
// export class QuestionService {
//   // Todo: get from a remote source of question metadata
//   // Todo: make asynchronous
//   getQuestions() {
//     let questions: QuestionBase<any>[] = [
//       new DropdownQuestion({
//         key: 'brave',
//         label: 'Bravery Rating',
//         options: [
//           {key: 'solid',  value: 'Solid'},
//           {key: 'great',  value: 'Great'},
//           {key: 'good',   value: 'Good'},
//           {key: 'unproven', value: 'Unproven'}
//         ],
//         order: 3
//       }),
//       new TextboxQuestion({
//         key: 'firstName',
//         label: 'First name',
//         value: 'Bombasto',
//         required: true,
//         order: 1
//       }),
//       new TextboxQuestion({
//         key: 'emailAddress',
//         label: 'Email',
//         type: 'email',
//         order: 2
//       })
//     ];
//     return questions.sort((a, b) => a.order - b.order);
//   }
// } 
//# sourceMappingURL=question.service.js.map