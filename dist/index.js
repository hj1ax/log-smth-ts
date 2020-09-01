"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
// Modules
// External
const log_symbols_1 = require("log-symbols");
const fs_1 = require("fs");
const chalk_1 = require("chalk");
// Internal
const functions_1 = require("./structures/functions");
const utils_1 = require("./structures/utils");
//
class Logger {
    constructor(options = utils_1.defaultOptions) {
        if (!options.defaultLog)
            options.defaultLog = 'log';
        if (!options.timestamps)
            options.timestamps = true;
        if (!options.logFile)
            options.logFile = false;
        if (options.logFile && !options.logDirPath)
            throw new Error('logFile is true but no logDirPath was specified.');
        if (!options.whichLogLevelsShouldBeLogged)
            options.whichLogLevelsShouldBeLogged = ['error', 'warn'];
        // Check if the log.json file exists.
        if (options.logFile) {
            if (!fs_1.existsSync(`${options.logDirPath}/log.json`))
                fs_1.writeFileSync(`${options.logDirPath}/log.json`, '{"logs": []}');
        }
        this.loggerOptions = options;
    }
    log(message, loglevel) {
        if (!message)
            message = chalk_1.white('No message.');
        if (!loglevel)
            loglevel = this.loggerOptions.defaultLog;
        if (!this.loggerOptions.defaultLog)
            loglevel = 'log';
        if (this.loggerOptions.logFile &&
            this.loggerOptions.logDirPath &&
            this.loggerOptions.whichLogLevelsShouldBeLogged.includes(loglevel)) {
            const toBeLogged = {
                date: new Date().toLocaleString(),
                loglevel: functions_1.firstLetterToUppercase(loglevel),
                message: message,
            };
            functions_1.logInFile(`${this.loggerOptions.logDirPath}/log.json`, toBeLogged);
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
                return functions_1.sendLog(chalk_1.white, message, this.loggerOptions.defaultLog, log_symbols_1.info, new Date().toLocaleString());
        }
    }
}
exports.Logger = Logger;
const logger = new Logger({
    timestamps: true,
    logFile: true,
    logDirPath: __dirname,
    whichLogLevelsShouldBeLogged: ['log'],
    defaultLog: 'log',
});
logger.log('Hi', 'log');
