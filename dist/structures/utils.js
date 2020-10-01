"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOptions = exports.Levels = void 0;
var Levels;
(function (Levels) {
    Levels["LOG"] = "log";
    Levels["INFO"] = "info";
    Levels["DEBUG"] = "debug";
    Levels["WARN"] = "warn";
    Levels["ERROR"] = "error";
})(Levels || (Levels = {}));
exports.Levels = Levels;
const defaultOptions = {
    timestamps: true,
    defaultLog: 'log',
    logFile: false,
    logDirPath: null,
    logLevels: null,
};
exports.defaultOptions = defaultOptions;
