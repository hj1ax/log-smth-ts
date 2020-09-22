import Logger from './index'; // or import { default as Logger } from './index';

const logger: Logger = new Logger();

// or

const loggerWithOptions: Logger = new Logger({
    timestamps: true,
    logFile: true,
    logDirPath: __dirname,
    defaultLog: 'custom log moment', // can also be a custom log, if you wish so.
    logLevels: ['error', 'warn'],
});

logger.log('Hi', 'error');
logger.log('Hi', 'info');
logger.log('Hi', 'log');
logger.log('Hi', 'warn');
logger.log('Hi', 'debug');
logger.log('Hi', 'you can use custom logs like this too!');
logger.log('Hi');

console.log('\n');

loggerWithOptions.log('Hi', 'error');
loggerWithOptions.log('Hi', 'info');
loggerWithOptions.log('Hi', 'log');
loggerWithOptions.log('Hi', 'warn');
loggerWithOptions.log('Hi', 'debug');
loggerWithOptions.log('Hi', 'you can use custom logs like this too B)');
loggerWithOptions.log('Hi');
