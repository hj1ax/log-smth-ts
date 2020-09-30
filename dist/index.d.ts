import { Levels, loggerOptions } from './structures/utils';
export default class Logger {
    private _loggerOptions;
    constructor(options?: loggerOptions);
    log(message: string, loglevel?: string | Levels): void;
}
