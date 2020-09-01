export declare enum Levels {
    LOG = "log",
    INFO = "info",
    DEBUG = "debug",
    WARN = "warn",
    ERROR = "error"
}
export interface loggerOptions {
    timestamps: boolean;
    defaultLog: string;
    logFile: boolean;
    logDirPath: string;
    whichLogLevelsShouldBeLogged: string[];
}
export declare const defaultOptions: loggerOptions;
export interface logSkel {
    date: string | Date;
    loglevel: string | number;
    message: string;
}
