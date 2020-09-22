"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index")); // or import { default as Logger } from './index';
const logger = new index_1.default();
// or
const loggerWithOptions = new index_1.default({
    timestamps: true,
    logFile: true,
    logDirPath: __dirname,
    defaultLog: 'custom log moment',
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
console.log = logger.log;
