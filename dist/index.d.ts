import { Levels, loggerOptions } from './structures/utils';
export declare class Logger {
    loggerOptions: loggerOptions;
    constructor(options?: loggerOptions);
    log(message: string, loglevel: string | Levels): void;
}
