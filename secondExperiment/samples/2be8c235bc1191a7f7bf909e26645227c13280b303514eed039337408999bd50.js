webpackJsonp([7],{

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1), __webpack_require__(0), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, $, Marionette, decorators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ViewController = (function (_super) {
        __extends(ViewController, _super);
        function ViewController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ViewController.prototype.OnAnswerClick = function (ev) {
            var answerValue = $(ev.currentTarget).val();
            var questionNumber = $(ev.currentTarget).attr("name");
            this.addScore(questionNumber.replace(/\D/g, ''), answerValue);
        };
        ViewController.prototype.addScore = function (question, answer) {
            var questionScore = 0;
            var yesQuestions = [1, 2, 3, 5, 5, 7, 8];
            if (yesQuestions.indexOf(question) && answer === "Yes") {
                questionScore = 1;
            }
            if (+question === 4 && answer === "Innovation") {
                questionScore = 1;
            }
            if (+question === 9 && answer === "In the cloud") {
                questionScore = 2;
            }
            else if (+question === 9 && answer === "Mix of both") {
                questionScore = 1;
            }
            if (+question === 10 && answer === "Yes") {
                questionScore = 2;
            }
            else if (+question === 10 && answer === "No") {
                questionScore = 0;
            }
            else if (+question === 10) {
                questionScore = 1;
            }
            this.ui.wizardWrap.attr("data-q" + question + "-score", questionScore);
        };
        ViewController.prototype.onClickStep5 = function (ev) {
            var total = (+(this.ui.wizardWrap.attr("data-q1-score"))) + (+(this.ui.wizardWrap.attr("data-q2-score"))) + (+(this.ui.wizardWrap.attr("data-q3-score"))) + (+(this.ui.wizardWrap.attr("data-q4-score"))) + (+(this.ui.wizardWrap.attr("data-q5-score"))) + (+(this.ui.wizardWrap.attr("data-q6-score"))) + (+(this.ui.wizardWrap.attr("data-q7-score"))) + (+(this.ui.wizardWrap.attr("data-q8-score"))) + (+(this.ui.wizardWrap.attr("data-q9-score"))) + (+(this.ui.wizardWrap.attr("data-q10-score")));
            if (total >= 12) {
                $("input[type='hidden'][name='securityPosture']").val("reactive");
            }
            else if (total >= 7) {
                $("input[type='hidden'][name='securityPosture']").val("resilient");
            }
            else {
                $("input[type='hidden'][name='securityPosture']").val("strategic");
            }
        };
        ViewController.prototype.onRender = function () {
        };
        __decorate([
            decorators_1.on("change @ui.inputAnswer")
        ], ViewController.prototype, "OnAnswerClick", null);
        __decorate([
            decorators_1.on("click @ui.nextBtn5")
        ], ViewController.prototype, "onClickStep5", null);
        ViewController = __decorate([
            decorators_1.Options({
                el: '.js-security-assessment',
                template: false,
                ui: {
                    wizardWrap: ".js-wizard-wrap",
                    nextBtn5: ".js-next5",
                    inputAnswer: ".js-answer"
                }
            })
        ], ViewController);
        return ViewController;
    }(Marionette.View));
    exports.default = ViewController;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(1), __webpack_require__(173)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Marionette, $, controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var app = new Marionette.Application();
    app.once("start", function () {
        new controller_1.default().render();
    });
    $(function () {
        app.start();
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(24);


/***/ })

},[40]);
//# sourceMappingURL=security-assessment.js.map