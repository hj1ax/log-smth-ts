"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_symbols_1 = require("log-symbols");
const fs_1 = require("fs");
const chalk_1 = require("chalk");
const functions_1 = require("./structures/functions");
const utils_1 = require("./structures/utils");
class Logger {
    constructor(options = utils_1.defaultOptions) {
        if (options.logFile && !options.logDirPath)
            throw new Error('parameter logFile is true but no logDirPath was specified.');
        if (!options.logLevels)
            options.logLevels = ['error', 'warn'];
        // Check if the log.json file exists, if it doesn't, create it.
        if (options.logFile) {
            if (!fs_1.existsSync(`${options.logDirPath}/log.json`))
                fs_1.writeFileSync(`${options.logDirPath}/log.json`, '{"logs": []}');
        }
        this._loggerOptions = options;
    }
    log(message, loglevel) {
        if (!message)
            message = chalk_1.white('No message.');
        if (!loglevel)
            loglevel = this._loggerOptions.defaultLog;
        if (!this._loggerOptions.defaultLog)
            loglevel = 'log';
        if (this._loggerOptions.logFile &&
            this._loggerOptions.logDirPath &&
            this._loggerOptions.logLevels.includes(loglevel)) {
            const toBeLogged = {
                date: new Date().toLocaleString(),
                loglevel: functions_1.firstLetterToUppercase(loglevel),
                message: message,
            };
            functions_1.logInFile(`${this._loggerOptions.logDirPath}/log.json`, toBeLogged);
        }
        switch (loglevel.toLowerCase()) {
            case 'error':
                return functions_1.sendLog(chalk_1.red, message, utils_1.Levels.ERROR, log_symbols_1.error, new Date().toLocaleString());
            case 'warn':
                return functions_1.sendLog(chalk_1.yellow, message, utils_1.Levels.WARN, log_symbols_1.warning, new Date().toLocaleString());
            case 'info':
                return functions_1.sendLog(chalk_1.blue, message, utils_1.Levels.INFO, log_symbols_1.info, new Date().toLocaleString());
            case 'log':
                return functions_1.sendLog(chalk_1.white, message, utils_1.Levels.LOG, log_symbols_1.success, new Date().toLocaleString());
            case 'debug':
                return functions_1.sendLog(chalk_1.cyan, message, utils_1.Levels.DEBUG, log_symbols_1.warning, new Date().toLocaleString());
            default:
                return functions_1.sendLog(chalk_1.white, message, loglevel || this._loggerOptions.defaultLog, log_symbols_1.info, new Date().toLocaleString());
        }
    }
}
exports.default = Logger;
