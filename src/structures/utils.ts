// Enumerators
export enum Levels {
    LOG = 'log',
    INFO = 'info',
    DEBUG = 'debug',
    WARN = 'warn',
    ERROR = 'error',
}

// Interfaces
export interface loggerOptions {
    timestamps: boolean;
    defaultLog: string;
    logFile: boolean;
    logDirPath: string;
    whichLogLevelsShouldBeLogged: string[];
}

export const defaultOptions: loggerOptions = {
    timestamps: true,
    defaultLog: 'log',
    logFile: false,
    logDirPath: '',
    whichLogLevelsShouldBeLogged: [],
};

export interface logSkel {
    date: string | Date;
    loglevel: string | number;
    message: string;
}

//
