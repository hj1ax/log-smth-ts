import { Logger } from './index';

const logger = new Logger({
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