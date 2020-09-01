'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const log_smth_1 = require('log-smth');
const logger = new log_smth_1.Logger({
    timestamps: true,
    defaultLog: 'Some Custom Log',
    logFile: true,
    logDirPath: __dirname,
    whichLogLevelsShouldBeLogged: ['log'],
});
logger.log('Hi', 'error');
logger.log('Hi', 'info');
logger.log('Hi', 'log');
logger.log('Hi', 'warn');
logger.log('Hi', 'debug');
logger.log('Hi', '');
