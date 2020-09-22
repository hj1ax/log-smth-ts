import { Chalk } from 'chalk';
import { Levels, logSkel } from './utils';
declare const sendLog: (color: Chalk, message: string, level: Levels | string, symbol: string, timestamp: Date | string) => void;
declare const firstLetterToUppercase: (text: string | Levels) => string;
declare const logInFile: (path: string, data: logSkel) => void;
export { logInFile, firstLetterToUppercase, sendLog };
