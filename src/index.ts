import { success, info, error, warning } from 'log-symbols';
import { existsSync, writeFileSync } from 'fs';
import { red, yellow, white, blue, cyan } from 'chalk';

import {
    logInFile,
    sendLog,
    firstLetterToUppercase,
} from './structures/functions';
import {
    Levels,
    loggerOptions,
    defaultOptions,
    logSkel,
} from './structures/utils';

export default class Logger {
    private _loggerOptions: loggerOptions;

    public constructor(options: loggerOptions = defaultOptions) {
        if (options.logFile && !options.logDirPath)
            throw new Error(
                'parameter logFile is true but no logDirPath was specified.'
            );

        if (!options.logLevels) options.logLevels = ['error', 'warn'];

        // Check if the log.json file exists, if it doesn't, create it.
        if (options.logFile) {
            if (!existsSync(`${options.logDirPath}/log.json`))
                writeFileSync(`${options.logDirPath}/log.json`, '{"logs": []}');
        }

        this._loggerOptions = options;
    }

    public log(message: string, loglevel?: string | Levels) {
        if (!message) message = white('No message.');
        if (!loglevel) loglevel = this._loggerOptions.defaultLog;
        if (!this._loggerOptions.defaultLog)
            this._loggerOptions.defaultLog = 'log';

        loglevel = loglevel.toLowerCase();

        if (
            this._loggerOptions.logFile &&
            this._loggerOptions.logDirPath &&
            this._loggerOptions.logLevels.includes(loglevel)
        ) {
            const toBeLogged: logSkel = {
                date: new Date().toLocaleString(),
                loglevel: this.checkLogLevel(loglevel)
                    ? firstLetterToUppercase(loglevel)
                    : this._loggerOptions.defaultLog,
                message: message,
            };

            logInFile(`${this._loggerOptions.logDirPath}/log.json`, toBeLogged);
        }

        switch (loglevel.toLowerCase()) {
            case 'error':
                return sendLog(
                    red,
                    message,
                    Levels.ERROR,
                    error,
                    new Date().toLocaleString()
                );
            case 'warn':
                return sendLog(
                    yellow,
                    message,
                    Levels.WARN,
                    warning,
                    new Date().toLocaleString()
                );
            case 'info':
                return sendLog(
                    blue,
                    message,
                    Levels.INFO,
                    info,
                    new Date().toLocaleString()
                );
            case 'log':
                return sendLog(
                    white,
                    message,
                    Levels.LOG,
                    success,
                    new Date().toLocaleString()
                );
            case 'debug':
                return sendLog(
                    cyan,
                    message,
                    Levels.DEBUG,
                    warning,
                    new Date().toLocaleString()
                );

            default:
                return sendLog(
                    white,
                    message,
                    loglevel || this._loggerOptions.defaultLog,
                    info,
                    new Date().toLocaleString()
                );
        }
    }

    private checkLogLevel(logLevel: string): boolean {
        const validValues = ['log', 'info', 'debug', 'warn', 'err'];

        return validValues.includes(logLevel);
    }
}
