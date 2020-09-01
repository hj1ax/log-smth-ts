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
import { Levels } from './structures/utils';
//

export class Logger {
    options: {
        timestamps: boolean;
        defaultLog: string;
        logFile: boolean;
        logDirPath: string;
        whichLogLevelsShouldBeLogged: string[];
    };

    constructor(options: {
        timestamps: boolean;
        defaultLog: string;
        logFile: boolean;
        logDirPath: string;
        whichLogLevelsShouldBeLogged: string[];
    }) {
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

        this.options = options;
    }

    log(message: string, loglevel: string | Levels) {
        if (!message) message = white('No message.');
        if (!loglevel) loglevel = this.options.defaultLog;
        if (!this.options.defaultLog) loglevel = 'log';

        if (
            this.options.logFile &&
            this.options.logDirPath &&
            this.options.whichLogLevelsShouldBeLogged.includes(loglevel)
        ) {
            const toBeLogged = {
                date: new Date().toLocaleString(),
                loglevel: firstLetterToUppercase(loglevel),
                message: message,
            };

            logInFile(`${this.options.logDirPath}/log.json`, toBeLogged);
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
                    this.options.defaultLog,
                    info,
                    new Date().toLocaleString()
                );
        }
    }
}
