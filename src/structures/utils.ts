enum Levels {
    LOG = 'log',
    INFO = 'info',
    DEBUG = 'debug',
    WARN = 'warn',
    ERROR = 'error',
}

interface loggerOptions {
    timestamps?: boolean;
    defaultLog?: string;
    logFile?: boolean;
    logDirPath?: string;
    logLevels?: string[];
    filetype?: string;
}

const defaultOptions: loggerOptions = {
    timestamps: true,
    defaultLog: 'log',
    logFile: false,
    logDirPath: process.cwd(),
    logLevels: null,
    filetype: 'json'
};

interface logSkel {
    date: string | Date;
    loglevel: string | number;
    message: string;
}

export { logSkel, loggerOptions, Levels, defaultOptions };
