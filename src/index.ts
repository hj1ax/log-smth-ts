// Modules
// External
import { success, info, error, warning } from 'log-symbols';
import { existsSync, writeFileSync } from 'fs';
import { red, yellow, white, blue, cyan } from 'chalk';

// Internal
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
//

export class Logger {
    public loggerOptions: loggerOptions;

    constructor(options: loggerOptions = defaultOptions) {
        if (!options.defaultLog) options.defaultLog = 'log';
        if (!options.timestamps) options.timestamps = true;
        if (!options.logFile) options.logFile = false;
        if (options.logFile && !options.logDirPath)
            throw new Error('logFile is true but no logDirPath was specified.');
        if (!options.whichLogLevelsShouldBeLogged)
            options.whichLogLevelsShouldBeLogged = ['error', 'warn'];

        // Check if the log.json file exists.
        if (options.logFile) {
            if (!existsSync(`${options.logDirPath}/log.json`))
                writeFileSync(`${options.logDirPath}/log.json`, '{"logs": []}');
        }

        this.loggerOptions = options;
    }

    log(message: string, loglevel: string | Levels) {
        if (!message) message = white('No message.');
        if (!loglevel) loglevel = this.loggerOptions.defaultLog;
        if (!this.loggerOptions.defaultLog) loglevel = 'log';

        if (
            this.loggerOptions.logFile &&
            this.loggerOptions.logDirPath &&
            this.loggerOptions.whichLogLevelsShouldBeLogged.includes(loglevel)
        ) {
            const toBeLogged: logSkel = {
                date: new Date().toLocaleString(),
                loglevel: firstLetterToUppercase(loglevel),
                message: message,
            };

            logInFile(`${this.loggerOptions.logDirPath}/log.json`, toBeLogged);
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
                    this.loggerOptions.defaultLog,
                    info,
                    new Date().toLocaleString()
                );
        }
    }
}