"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.MeditationPage = void 0;
var core_1 = require("@angular/core");
var ts_stopwatch_1 = require("ts-stopwatch"); //minuteur (https://www.npmjs.com/package/ts-stopwatch)
var stopwatch = new ts_stopwatch_1.Stopwatch(); //dans notre variable stopwatch nous avons un objet Stopwatch
//import native audio et dans le constructor
var MeditationPage = /** @class */ (function () {
    //voir home.page.ts
    //dans le constructeur modal + navParams
    function MeditationPage(toastController, modalController, navParams, nativeAudio) {
        this.toastController = toastController;
        this.modalController = modalController;
        this.navParams = navParams;
        this.nativeAudio = nativeAudio;
        // counter = 0;
        this.minutes = "00";
        this.seconds = "00";
        this.butttonIcon = "pause"; //bouton dynamique []
        this.sound = this.navParams.get("sound");
        this.title = this.navParams.get("title");
        this.imgUrl = this.navParams.get("imgUrl");
        this.meditationDuration = this.navParams.get("duration") * 1000;
        this.readSound();
        this.countDown();
        // this.readSound();//pour tester ma fonction dans la console
        //ionic cordova run browser
        //Le but de la plateforme Browser est de faire tourner des applications destinées à des appareils mobiles dans un navigateur web (Chrome). ... Bref utiliser les mêmes Api que sur l'appareil de destination dans un simple navigateur w
    }
    //native audio lancement de la lecture audio
    MeditationPage.prototype.readSound = function () {
        var _this = this;
        this.nativeAudio.preloadSimple("sound", this.sound).then(//this.sound adresse de notre fichier mp3
        function (onSuccess) {
            //si success on execute le code suivanton  affichera un message
            console.log(onSuccess);
            _this.nativeAudio.loop("sound");
        }, function (onError) {
            console.log(onError);
        });
        this.playToast();
    };
    //fonction chrono
    MeditationPage.prototype.countDown = function () {
        var _this = this;
        //on lance notre chrono
        stopwatch.start(); //plugin stopwatch
        setInterval(function () {
            var time = stopwatch.getTime(); //on recupere ler temps restant en seconde et en minute
            _this.timer = time; //on recupere le tempps restant evolution de mon compte a rebours
            var timeInSeconds = Math.floor(time / 1000); //Math.floor recupere la valeur entiere  et on divise la valeur par mille pour avoir les secondes
            var minutes = Math.floor(timeInSeconds / 60); //valeur en minute
            var seconds = timeInSeconds - minutes * 60; //temps restant en seconde
            if (minutes < 10) {
                _this.minutes = "0" + minutes;
            }
            else {
                _this.minutes = minutes.toString(); //converti un nombre en chaine de caractere
            }
            if (seconds < 10) {
                _this.seconds = "0" + seconds;
            }
            else {
                _this.seconds = seconds.toString();
            }
        }, 100); //miliseconde
    };
    MeditationPage.prototype.playPause = function () {
        console.log(stopwatch.getState());
        if (this.meditationDuration == (60 * 1000)) {
            if (stopwatch.getState() == "RUNNING") { //si notre chronometre est en route on recuopere son statu
                this.pauseToast();
                stopwatch.stop(); //si le lecteure est en play
                this.butttonIcon = "play";
                this.nativeAudio.stop("sound");
                this.reset();
            }
            else {
                this.playToast();
                stopwatch.start(); //on redemarre nbotre chrono avec le packahe stopwatch
                this.butttonIcon = "pause"; //on passe l'icon a pause
                this.nativeAudio.loop("sound"); //onn relance la musique
            }
        }
    };
    //pour fermer la page modal
    MeditationPage.prototype.close = function () {
        this.timer = 0;
        stopwatch.reset();
        this.nativeAudio.stop("sound");
        this.modalController.dismiss();
    };
    MeditationPage.prototype.playToast = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "Musique en cours de lecture.",
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    MeditationPage.prototype.pauseToast = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "Musique en pause.",
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    MeditationPage = __decorate([
        core_1.Component({
            selector: "app-meditation",
            templateUrl: "./meditation.page.html",
            styleUrls: ["./meditation.page.scss"]
        })
    ], MeditationPage);
    return MeditationPage;
}());
exports.MeditationPage = MeditationPage;
