import { Chalk } from 'chalk';
import { Levels, logSkel } from './utils';
export declare const sendLog: (color: Chalk, message: string, level: Levels | string, symbol: string, timestamp: Date | string) => void;
export declare const firstLetterToUppercase: (text: string | Levels) => string;
export declare const logInFile: (path: string, data: logSkel) => void;
