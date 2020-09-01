"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOptions = exports.Levels = void 0;
// Enumerators
var Levels;
(function (Levels) {
    Levels["LOG"] = "log";
    Levels["INFO"] = "info";
    Levels["DEBUG"] = "debug";
    Levels["WARN"] = "warn";
    Levels["ERROR"] = "error";
})(Levels = exports.Levels || (exports.Levels = {}));
exports.defaultOptions = {
    timestamps: true,
    defaultLog: 'log',
    logFile: false,
    logDirPath: '',
    whichLogLevelsShouldBeLogged: [],
};
//
